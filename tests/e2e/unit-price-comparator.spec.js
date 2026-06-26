import { expect, test } from '@playwright/test'

test('compara preço por unidade e indica a melhor opção', async ({ page }) => {
  await page.goto('/ferramentas/comparador-preco-unidade')

  await expect(page.getByRole('heading', { name: 'Comparador de preço por unidade' })).toBeVisible()

  await page.getByLabel('Preço').first().fill('22,90')
  await page.getByLabel('Quantidade').first().fill('5')
  await page.getByLabel('Preço').nth(1).fill('5,20')
  await page.getByLabel('Quantidade').nth(1).fill('1')
  await page.getByRole('button', { name: 'Comparar preços' }).click()

  const result = page.locator('output.result-panel')

  await expect(result.getByText('Arroz pacote 1 compensa mais')).toBeVisible()
  await expect(result.getByText('R$ 4,58 por kg')).toBeVisible()
  await expect(result.getByText('R$ 5,20 por kg')).toBeVisible()
})

test('exibe erro para unidades incompatíveis', async ({ page }) => {
  await page.goto('/ferramentas/comparador-preco-unidade')

  await page.getByLabel('Unidade').nth(1).selectOption('l')
  await page.getByRole('button', { name: 'Comparar preços' }).click()

  await expect(page.getByRole('alert')).toContainText('Compare itens com unidades compatíveis')
})

test('mantem comparador legível no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ferramentas/comparador-preco-unidade')

  await expect(page.getByRole('link', { name: /Voltar para ferramentas/ })).toBeVisible()
  await expect(page.getByLabel('Preço').first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Comparar preços' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Dúvidas rápidas sobre comparação por unidade.' })).toBeVisible()
})
