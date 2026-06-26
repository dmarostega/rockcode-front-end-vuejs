import { expect, test } from '@playwright/test'

const publishedTools = [
  {
    name: 'Gerador de UUID',
    path: '/ferramentas/gerador-uuid',
  },
  {
    name: 'Conversor Base64',
    path: '/ferramentas/base64',
  },
  {
    name: 'Formatador JSON',
    path: '/ferramentas/formatador-json',
  },
  {
    name: 'Gerador de Slug',
    path: '/ferramentas/gerador-slug',
  },
  {
    name: 'Contador de Caracteres e Palavras',
    path: '/ferramentas/contador-caracteres-palavras',
  },
  {
    name: 'URL Encode/Decode',
    path: '/ferramentas/url-encode-decode',
  },
]

test('hub lista todas as ferramentas publicadas com links internos', async ({ page }) => {
  await page.goto('/ferramentas')

  for (const tool of publishedTools) {
    await expect(page.getByRole('link', { name: new RegExp(tool.name) })).toHaveAttribute(
      'href',
      tool.path,
    )
  }

  await expect(page.getByRole('link', { name: /QRCodeFlow/ })).toHaveAttribute(
    'href',
    'https://qrcodeflow.rockcodelabs.com.br',
  )
})

test('paginas de ferramentas possuem retorno explicito para o hub', async ({ page }) => {
  for (const tool of publishedTools) {
    await page.goto(tool.path)

    const backLink = page.getByRole('link', { name: /Voltar para ferramentas/ })

    await expect(backLink).toBeVisible()
    await expect(backLink).toHaveAttribute('href', '/ferramentas')
  }
})

test('retorno ao hub funciona no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  for (const tool of publishedTools) {
    await page.goto(tool.path)
    await page.getByRole('link', { name: /Voltar para ferramentas/ }).click()

    await expect(page).toHaveURL(/\/ferramentas$/)
    await expect(page.getByRole('heading', { name: /Utilitários simples/ })).toBeVisible()
  }
})
