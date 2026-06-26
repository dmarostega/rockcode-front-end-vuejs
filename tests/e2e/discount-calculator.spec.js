import { expect, test } from '@playwright/test'

test('calcula desconto percentual com preço em vírgula', async ({ page }) => {
  await page.goto('/ferramentas/calculadora-desconto')

  await expect(page.getByRole('heading', { name: 'Calculadora de desconto percentual' })).toBeVisible()

  await page.getByLabel('Preço original').fill('199,90')
  await page.getByLabel('Percentual de desconto').fill('15')
  await page.getByRole('button', { name: 'Calcular desconto' }).click()

  const result = page.locator('output.result-grid')

  await expect(result.getByText('R$ 29,99')).toBeVisible()
  await expect(result.getByText('R$ 169,91')).toBeVisible()
})

test('calcula limites de 0% e 100%', async ({ page }) => {
  await page.goto('/ferramentas/calculadora-desconto')

  await page.getByLabel('Preço original').fill('149.99')
  await page.getByLabel('Percentual de desconto').fill('0')
  await page.getByRole('button', { name: 'Calcular desconto' }).click()

  const result = page.locator('output.result-grid')

  await expect(result.getByText('R$ 0,00')).toBeVisible()
  await expect(result.getByText('R$ 149,99')).toBeVisible()

  await page.getByLabel('Percentual de desconto').fill('100')
  await page.getByRole('button', { name: 'Calcular desconto' }).click()

  await expect(result.getByText('R$ 149,99')).toBeVisible()
  await expect(result.getByText('R$ 0,00')).toBeVisible()
})

test('exibe erro amigável para entrada inválida', async ({ page }) => {
  await page.goto('/ferramentas/calculadora-desconto')

  await page.getByLabel('Preço original').fill('')
  await page.getByLabel('Percentual de desconto').fill('10')
  await page.getByRole('button', { name: 'Calcular desconto' }).click()

  await expect(page.getByRole('alert')).toContainText('Informe um preço original válido.')
})

test('mantem campos, botão e resultado legíveis no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ferramentas/calculadora-desconto')

  await expect(page.getByRole('link', { name: /Voltar para ferramentas/ })).toBeVisible()
  await expect(page.getByLabel('Preço original')).toBeVisible()
  await expect(page.getByLabel('Percentual de desconto')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Calcular desconto' })).toBeVisible()
  await expect(page.locator('output.result-grid').getByText('Preço final', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Dúvidas rápidas sobre cálculo de desconto.' })).toBeVisible()
})
