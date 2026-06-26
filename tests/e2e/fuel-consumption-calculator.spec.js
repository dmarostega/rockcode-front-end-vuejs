import { expect, test } from '@playwright/test'

test('calcula consumo e custo estimado com preço informado', async ({ page }) => {
  await page.goto('/ferramentas/calculadora-consumo-combustivel')

  await expect(
    page.getByRole('heading', { name: 'Calculadora de consumo de combustível' }),
  ).toBeVisible()

  await page.getByLabel('Distância percorrida (km)').fill('420')
  await page.getByLabel('Litros consumidos').fill('35')
  await page.getByLabel('Preço do combustível (opcional)').fill('5,89')
  await page.getByRole('button', { name: 'Calcular consumo' }).click()

  const result = page.locator('output.result-grid')

  await expect(result.getByText('12,00 km/l')).toBeVisible()
  await expect(result.getByText('R$ 0,49 / km')).toBeVisible()
  await expect(result.getByText('R$ 206,15')).toBeVisible()
  await expect(page.getByText('Resultado estimado.')).toBeVisible()
})

test('calcula consumo sem preço opcional', async ({ page }) => {
  await page.goto('/ferramentas/calculadora-consumo-combustivel')

  await page.getByLabel('Preço do combustível (opcional)').fill('')
  await page.getByRole('button', { name: 'Calcular consumo' }).click()

  await expect(page.locator('output.result-grid').getByText('12,00 km/l')).toBeVisible()
  await expect(page.locator('output.result-grid').getByText('Informe preço')).toHaveCount(2)
})

test('exibe erro amigável para valores inválidos', async ({ page }) => {
  await page.goto('/ferramentas/calculadora-consumo-combustivel')

  await page.getByLabel('Distância percorrida (km)').fill('')
  await page.getByRole('button', { name: 'Calcular consumo' }).click()

  await expect(page.getByRole('alert')).toContainText('Informe uma distância maior que zero.')
})

test('mantem calculadora de combustível legível no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ferramentas/calculadora-consumo-combustivel')

  await expect(page.getByRole('link', { name: /Voltar para ferramentas/ })).toBeVisible()
  await expect(page.getByLabel('Distância percorrida (km)')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Calcular consumo' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Dúvidas rápidas sobre consumo de combustível.' })).toBeVisible()
})
