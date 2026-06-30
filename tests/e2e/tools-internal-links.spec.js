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
  {
    name: 'Conversor Timestamp',
    path: '/ferramentas/conversor-timestamp',
  },
  {
    name: 'Gerador de Hash',
    path: '/ferramentas/gerador-hash',
  },
  {
    name: 'Calculadora de Desconto',
    path: '/ferramentas/calculadora-desconto',
  },
  {
    name: 'Comparador de Preço por Unidade',
    path: '/ferramentas/comparador-preco-unidade',
  },
  {
    name: 'Calculadora de Consumo de Combustível',
    path: '/ferramentas/calculadora-consumo-combustivel',
  },
]

test('hub lista todas as ferramentas publicadas com links internos', async ({ page }) => {
  await page.goto('/ferramentas')

  for (const tool of publishedTools) {
    const toolCard = page.locator('.tool-card').filter({ hasText: tool.name })

    await expect(toolCard).toHaveAttribute('href', tool.path)
  }

  await expect(page.getByRole('link', { name: /QRCodeFlow/ })).toHaveAttribute(
    'href',
    'https://qrcodeflow.rockcodelabs.com.br',
  )
})

test('home e apps apontam para o hub de ferramentas quando relacionado', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: /Usar ferramentas gratuitas/ })).toHaveAttribute(
    'href',
    '/ferramentas',
  )

  await page.goto('/apps')

  await expect(page.getByRole('link', { name: /Ver ferramentas gratuitas/ })).toHaveAttribute(
    'href',
    '/ferramentas',
  )
})

test('hub separa ferramentas comuns, ferramentas dev e projeto relacionado', async ({ page }) => {
  await page.goto('/ferramentas')

  const commonTools = page.getByRole('region', { name: /Ferramentas para usuários comuns/ })
  const developerTools = page.getByRole('region', { name: /Ferramentas para desenvolvedores/ })
  const relatedProject = page.getByRole('region', { name: /QRCodeFlow continua/ })

  await expect(commonTools.getByRole('link', { name: /Calculadora de Desconto/ })).toHaveAttribute(
    'href',
    '/ferramentas/calculadora-desconto',
  )
  await expect(developerTools.getByRole('link', { name: /Gerador de UUID/ })).toHaveAttribute(
    'href',
    '/ferramentas/gerador-uuid',
  )
  await expect(developerTools.getByRole('link', { name: /Calculadora de Desconto/ })).toHaveCount(0)
  await expect(relatedProject.getByRole('link', { name: /QRCodeFlow/ })).toHaveAttribute(
    'href',
    'https://qrcodeflow.rockcodelabs.com.br',
  )
})

test('hub mantem cards confortaveis no desktop e uma coluna no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await page.goto('/ferramentas')

  const commonCards = page.locator('.tool-group').first().locator('.tool-card')
  const discountCardBox = await commonCards.first().boundingBox()

  expect(discountCardBox).not.toBeNull()
  expect(discountCardBox.width).toBeGreaterThanOrEqual(300)
  await expect(commonCards).toHaveCount(3)

  const developerGridBox = await page.locator('.tool-card-grid').nth(1).boundingBox()

  expect(developerGridBox).not.toBeNull()

  const developerCardBoxes = await page
    .locator('.tool-group')
    .nth(1)
    .locator('.tool-card')
    .evaluateAll((cards) =>
      cards.map((card) => {
        const rect = card.getBoundingClientRect()

        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
        }
      }),
    )
  const lastRowY = Math.max(...developerCardBoxes.map((box) => box.y))
  const lastRowCards = developerCardBoxes.filter((box) => Math.abs(box.y - lastRowY) <= 2)
  const lastRowLeft = Math.min(...lastRowCards.map((box) => box.x))
  const lastRowRight = Math.max(...lastRowCards.map((box) => box.x + box.width))
  const lastRowCenter = lastRowLeft + (lastRowRight - lastRowLeft) / 2
  const developerGridCenter = developerGridBox.x + developerGridBox.width / 2

  expect(lastRowCards).toHaveLength(2)
  expect(Math.abs(lastRowCenter - developerGridCenter)).toBeLessThanOrEqual(2)

  const firstCardBox = await commonCards.first().boundingBox()
  const firstCardCtaBox = await commonCards.first().locator('strong').boundingBox()

  expect(firstCardBox).not.toBeNull()
  expect(firstCardCtaBox).not.toBeNull()
  expect(
    Math.abs(
      firstCardCtaBox.x + firstCardCtaBox.width / 2 - (firstCardBox.x + firstCardBox.width / 2),
    ),
  ).toBeLessThanOrEqual(2)

  const relatedCard = page.getByRole('link', { name: /QRCodeFlow/ })
  const relatedDescriptionBox = await relatedCard.locator('p').boundingBox()
  const relatedCtaBox = await relatedCard.locator('strong').boundingBox()

  expect(relatedDescriptionBox).not.toBeNull()
  expect(relatedCtaBox).not.toBeNull()
  expect(relatedCtaBox.y).toBeGreaterThan(relatedDescriptionBox.y + relatedDescriptionBox.height)

  await page.setViewportSize({ width: 390, height: 1000 })
  await page.goto('/ferramentas')

  const mobileCards = page.locator('.tool-card')
  const firstMobileCardBox = await mobileCards.first().boundingBox()
  const secondMobileCardBox = await mobileCards.nth(1).boundingBox()
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  )

  expect(firstMobileCardBox).not.toBeNull()
  expect(secondMobileCardBox).not.toBeNull()
  expect(Math.abs(firstMobileCardBox.x - secondMobileCardBox.x)).toBeLessThanOrEqual(1)
  expect(hasHorizontalOverflow).toBe(false)
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

test('backlink mantem alinhamento esquerdo consistente entre ferramentas antigas e novas', async ({
  page,
}) => {
  await page.goto('/ferramentas/gerador-uuid')
  const legacyBackLinkBox = await page
    .getByRole('link', { name: /Voltar para ferramentas/ })
    .boundingBox()

  await page.goto('/ferramentas/gerador-slug')
  const sharedLayoutBackLinkBox = await page
    .getByRole('link', { name: /Voltar para ferramentas/ })
    .boundingBox()

  expect(legacyBackLinkBox).not.toBeNull()
  expect(sharedLayoutBackLinkBox).not.toBeNull()
  expect(Math.abs(legacyBackLinkBox.x - sharedLayoutBackLinkBox.x)).toBeLessThanOrEqual(2)
})

test('ferramentas de compra apontam apenas para relacionadas publicadas', async ({ page }) => {
  await page.goto('/ferramentas/calculadora-desconto')

  const discountRelatedTools = page.getByRole('region', {
    name: /Ferramentas relacionadas/,
  })

  await expect(
    discountRelatedTools.getByRole('link', { name: /Comparador de preço/i }),
  ).toHaveAttribute('href', '/ferramentas/comparador-preco-unidade')

  await page.goto('/ferramentas/comparador-preco-unidade')

  const unitPriceRelatedTools = page.getByRole('region', {
    name: /Ferramentas relacionadas/,
  })

  await expect(
    unitPriceRelatedTools.getByRole('link', { name: /Calculadora de desconto/i }),
  ).toHaveAttribute('href', '/ferramentas/calculadora-desconto')

  await page.goto('/ferramentas/calculadora-consumo-combustivel')

  await expect(page.getByRole('link', { name: /custo de viagem/i })).toHaveCount(0)

  const fuelRelatedTools = page.getByRole('region', {
    name: /Ferramentas relacionadas/i,
  })

  await expect(
    fuelRelatedTools.getByRole('link', { name: /Calculadora de desconto/i }),
  ).toHaveAttribute('href', '/ferramentas/calculadora-desconto')
  await expect(
    fuelRelatedTools.getByRole('link', { name: /Comparador de preço/i }),
  ).toHaveAttribute('href', '/ferramentas/comparador-preco-unidade')
})
