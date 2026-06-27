import { expect, test } from '@playwright/test'

test('apps hub aponta QRCodeFlow para pagina interna', async ({ page }) => {
  await page.goto('/apps')

  await expect(page.getByRole('link', { name: /QRCodeFlow/ })).toHaveAttribute(
    'href',
    '/apps/qrcodeflow',
  )
})

test('pagina piloto do QRCodeFlow explica produto e aponta para app publico', async ({ page }) => {
  await page.goto('/apps/qrcodeflow')

  await expect(page.getByRole('heading', { level: 1, name: 'QRCodeFlow' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Links precisam circular fora da tela/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: /MVP publicado/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: /gerar QR Codes/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: /escopo atual é enxuto/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Projeto Laravel\/Vue/ })).toBeVisible()

  await expect(page.getByRole('link', { name: 'Acessar QRCodeFlow' })).toHaveAttribute(
    'href',
    'https://qrcodeflow.rockcodelabs.com.br',
  )
  await expect(page.getByRole('link', { name: /Hub de ferramentas/ })).toHaveAttribute(
    'href',
    '/ferramentas',
  )
  await expect(page.getByRole('link', { name: /URL Encode\/Decode/ })).toHaveAttribute(
    'href',
    '/ferramentas/url-encode-decode',
  )
})

test('sitemap inclui pagina interna do QRCodeFlow', async ({ page }) => {
  const response = await page.goto('/sitemap.xml')

  expect(response?.ok()).toBe(true)
  await expect(page.locator('body')).toContainText('https://rockcodelabs.com.br/apps/qrcodeflow')
})
