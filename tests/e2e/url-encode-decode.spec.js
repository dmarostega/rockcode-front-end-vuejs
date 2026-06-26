import { expect, test } from '@playwright/test'

test('codifica e decodifica URL diretamente no navegador', async ({ page }) => {
  await page.goto('/ferramentas/url-encode-decode')

  await expect(page.getByRole('heading', { name: 'URL encode e decode online' })).toBeVisible()

  await page
    .getByLabel('Texto ou URL')
    .fill('https://rockcodelabs.com.br/ferramentas?busca=Vue 3 & tópico=SEO básico')

  await expect(page.locator('#url-result')).toHaveText(
    'https%3A%2F%2Frockcodelabs.com.br%2Fferramentas%3Fbusca%3DVue%203%20%26%20t%C3%B3pico%3DSEO%20b%C3%A1sico',
  )

  await page.getByRole('button', { name: 'Decode' }).click()
  await page
    .getByLabel('Texto ou URL')
    .fill('Rock%20Code%20Labs%20%26%20Vue%203%20%2B%20SEO%20b%C3%A1sico')

  await expect(page.locator('#url-result')).toHaveText('Rock Code Labs & Vue 3 + SEO básico')
})

test('mostra erro amigavel para URL codificada invalida', async ({ page }) => {
  await page.goto('/ferramentas/url-encode-decode')

  await page.getByRole('button', { name: 'Decode' }).click()
  await page.getByLabel('Texto ou URL').fill('%E0%A4%A')

  await expect(page.getByRole('alert')).toContainText('Não foi possível decodificar')
  await expect(page.getByRole('button', { name: 'Copiar resultado' })).toBeDisabled()
})

test('mantem layout essencial legivel no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ferramentas/url-encode-decode')

  await expect(page.getByRole('link', { name: /Voltar para ferramentas/ })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Encode' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Decode' })).toBeVisible()
  await expect(page.getByLabel('Texto ou URL')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Copiar resultado' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Dúvidas rápidas sobre URL encode/decode.' }),
  ).toBeVisible()
})
