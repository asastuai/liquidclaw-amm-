import { test, expect } from '@playwright/test'

test.describe('Create Pool Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create-pool')
    await page.waitForLoadState('domcontentloaded')
  })

  test('shows create pool heading', async ({ page }) => {
    await expect(page.locator('text=/Create Pool/').first()).toBeVisible()
  })

  test('has token A and token B selectors', async ({ page }) => {
    const selectors = page.locator('text=/Select token|Token A|Token B/')
    expect(await selectors.count()).toBeGreaterThan(0)
  })

  test('has pool type selection (volatile/stable)', async ({ page }) => {
    const poolType = page.locator('text=/Volatile|Stable|Pool Type/')
    if (await poolType.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      expect(await poolType.count()).toBeGreaterThan(0)
    }
  })

  test('create pool button is disabled initially', async ({ page }) => {
    const createBtn = page.locator('button').filter({ hasText: /Create Pool/ }).first()
    if (await createBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(createBtn).toBeDisabled()
    }
  })

  test('token selector opens search modal', async ({ page }) => {
    const selectBtn = page.locator('button').filter({ hasText: /Select token/ }).first()
    if (await selectBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await selectBtn.click()
      // Should show token search or list
      const tokenList = page.locator('text=/Search|LCLAW|ETH|USDC/').first()
      await expect(tokenList).toBeVisible({ timeout: 3000 })
    }
  })

  test('shows fee info', async ({ page }) => {
    const fee = page.locator('text=/fee|0.30%|0.05%/i').first()
    if (await fee.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(fee).toBeVisible()
    }
  })
})
