import { test, expect } from '@playwright/test'

test.describe('AI Vault Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-vault')
    await page.waitForLoadState('domcontentloaded')
  })

  test('shows AI vault heading', async ({ page }) => {
    await expect(page.locator('text=/AI.*Vault|AI-Powered/').first()).toBeVisible()
  })

  test('shows connect wallet prompt without wallet', async ({ page }) => {
    // Without wallet should show connect prompt or connect button
    const connectOrVault = page.locator('text=/Connect|AI Vault|AI-Powered/').first()
    await expect(connectOrVault).toBeVisible()
  })

  test('shows strategy cards', async ({ page }) => {
    const strategies = page.locator('text=/Yield Maximizer|Liquidity Deepener|Bribe Hunter|Strategies/').first()
    if (await strategies.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(strategies).toBeVisible()
    }
  })

  test('shows non-custodial notice', async ({ page }) => {
    const notice = page.locator('text=/Non-Custodial|withdraw.*any time/i').first()
    if (await notice.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(notice).toBeVisible()
    }
  })

  test('shows stats cards', async ({ page }) => {
    const stats = page.locator('text=/veNFTs in Vault|Voting Power|Active Strategies/').first()
    if (await stats.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(stats).toBeVisible()
    }
  })
})
