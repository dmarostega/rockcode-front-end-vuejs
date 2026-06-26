import { expect, test } from '@playwright/test'

const screenshotPath = (name) => `test-results/base64-json-smoke/${name}.png`

const expectNoHorizontalOverflow = async (page) => {
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )

  expect(hasHorizontalOverflow).toBe(false)
}

const expectNotCoveredByFixedNav = async (page, locator) => {
  await locator.scrollIntoViewIfNeeded()

  const [targetBox, navBox] = await Promise.all([
    locator.boundingBox(),
    page.locator('.nav-footer').boundingBox(),
  ])

  expect(targetBox).not.toBeNull()
  expect(navBox).not.toBeNull()
  expect(targetBox.y + targetBox.height).toBeLessThanOrEqual(navBox.y)
}

const longText = Array.from(
  { length: 18 },
  (_, index) =>
    `Linha ${index + 1}: texto longo para validar campos grandes, quebra visual e resultado sem persistência.`,
).join('\n')

const longJson = JSON.stringify({
  project: 'Rock Code Labs',
  status: 'visual-smoke',
  items: Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    label: `Item de validacao ${index + 1}`,
    active: index % 2 === 0,
  })),
})

test('valida Base64 em desktop e mobile com entradas simples, invalidas e longas', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 900 })
  await page.goto('/ferramentas/base64')

  await expect(page.getByRole('heading', { name: 'Conversor Base64 online' })).toBeVisible()
  await page.getByLabel('Entrada').fill('Rock Code Labs')
  await expect(page.getByLabel('Resultado')).toHaveValue('Um9jayBDb2RlIExhYnM=')

  await page.getByLabel('Base64 para texto').check()
  await page.getByLabel('Entrada').fill('%%%')
  await expect(page.getByRole('alert')).toContainText('Não foi possível decodificar')

  await page.getByLabel('Texto para Base64').check()
  await page.getByLabel('Entrada').fill(longText)
  await expect(page.getByRole('button', { name: 'Copiar resultado' })).toBeEnabled()
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ fullPage: true, path: screenshotPath('base64-desktop') })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await page.getByLabel('Entrada').fill(longText)

  const base64CopyButton = page.getByRole('button', { name: 'Copiar resultado' })
  const base64Result = page.getByLabel('Resultado')

  await expect(base64CopyButton).toBeVisible()
  await expect(base64Result).toBeVisible()
  await expectNotCoveredByFixedNav(page, base64Result)
  await expectNotCoveredByFixedNav(page, base64CopyButton)
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ fullPage: true, path: screenshotPath('base64-mobile') })
})

test('valida JSON em desktop e mobile com entradas validas, invalidas, minificadas e longas', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 900 })
  await page.goto('/ferramentas/formatador-json')

  await expect(
    page.getByRole('heading', { name: 'Formatador e validador JSON online' }),
  ).toBeVisible()
  await page.getByLabel('Entrada JSON').fill('{"project":"Rock Code Labs","active":true}')
  await page.getByRole('button', { name: 'Formatar JSON' }).click()
  await expect(page.getByLabel('Resultado')).toHaveValue(/"project": "Rock Code Labs"/)

  await page.getByLabel('Entrada JSON').fill('{"project": "Rock Code Labs",}')
  await page.getByRole('button', { name: 'Formatar JSON' }).click()
  await expect(page.getByRole('alert')).toContainText('JSON inválido')

  await page.getByLabel('Entrada JSON').fill(longJson)
  await page.getByRole('button', { name: 'Minificar JSON' }).click()
  await expect(page.getByLabel('Resultado')).toHaveValue(/"visual-smoke"/)
  await expect(page.getByRole('button', { name: 'Copiar resultado' })).toBeEnabled()
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ fullPage: true, path: screenshotPath('json-desktop') })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await page.getByLabel('Entrada JSON').fill(longJson)
  await page.getByRole('button', { name: 'Formatar JSON' }).click()

  const jsonCopyButton = page.getByRole('button', { name: 'Copiar resultado' })
  const jsonResult = page.getByLabel('Resultado')

  await expect(jsonCopyButton).toBeVisible()
  await expect(jsonResult).toBeVisible()
  await expectNotCoveredByFixedNav(page, jsonResult)
  await expectNotCoveredByFixedNav(page, jsonCopyButton)
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ fullPage: true, path: screenshotPath('json-mobile') })
})
