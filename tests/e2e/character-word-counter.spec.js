import { expect, test } from '@playwright/test'

test('conta caracteres, palavras e linhas diretamente no navegador', async ({ page }) => {
  await page.goto('/ferramentas/contador-caracteres-palavras')

  await expect(
    page.getByRole('heading', { name: 'Contador de caracteres e palavras online' }),
  ).toBeVisible()

  await page.getByLabel('Texto para contagem').fill('Rock Code Labs\nFerramenta gratuita')

  await expect(page.getByText('Caracteres').locator('..').getByText('34')).toBeVisible()
  await expect(page.getByText('Palavras').locator('..').getByText('5')).toBeVisible()
  await expect(page.getByText('Linhas').locator('..').getByText('2')).toBeVisible()
})

test('mantem layout essencial legivel no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ferramentas/contador-caracteres-palavras')

  await expect(page.getByRole('link', { name: /Voltar para ferramentas/ })).toBeVisible()
  await expect(page.getByLabel('Texto para contagem')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Usar exemplo' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Dúvidas rápidas sobre o contador.' }),
  ).toBeVisible()
})
