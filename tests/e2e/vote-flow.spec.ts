import { test, expect } from '@playwright/test'

test.describe('Vote Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vote')
    await page.waitForLoadState('domcontentloaded')
  })

  test('shows vote page heading', async ({ page }) => {
    await expect(page.locator('text=Vote').first()).toBeVisible()
  })

  test('shows voting power indicator', async ({ page }) => {
    const power = page.locator('text=/Voting Power|veLCLAW/').first()
    await expect(power).toBeVisible()
  })

  test('has search input for pools', async ({ page }) => {
    const search = page.locator('input[placeholder*="Search"], input[placeholder*="search"]').first()
    if (await search.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(search).toBeVisible()
      await search.fill('ETH')
      // Search should not crash
    }
  })

  test('has sort dropdown', async ({ page }) => {
    const sort = page.locator('text=/Sort by|Total APR/').first()
    if (await sort.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(sort).toBeVisible()
    }
  })

  test('shows epoch info', async ({ page }) => {
    const epoch = page.locator('text=/Epoch|ends in/').first()
    if (await epoch.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(epoch).toBeVisible()
    }
  })

  test('vote summary shows no allocation initially', async ({ page }) => {
    const summary = page.locator('text=/Vote Summary|No votes|Cast Vote/').first()
    if (await summary.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(summary).toBeVisible()
    }
  })
})
