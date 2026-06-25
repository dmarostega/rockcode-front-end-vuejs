import { expect, test } from '@playwright/test'

test('gera slug diretamente no navegador', async ({ page }) => {
  await page.goto('/ferramentas/gerador-slug')

  await expect(page.getByRole('heading', { name: 'Gerador de slug online' })).toBeVisible()

  await page.getByLabel('Texto original').fill('Rock Code: Ferramentas para Vue!')

  await expect(page.locator('#slug-result')).toHaveText('rock-code-ferramentas-para-vue')
})
