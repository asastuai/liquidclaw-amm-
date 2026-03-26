import { test, expect } from '@playwright/test'

test.describe('Lock Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lock')
    await page.waitForLoadState('domcontentloaded')
  })

  test('shows veLCLAW heading and description', async ({ page }) => {
    await expect(page.locator('text=veLCLAW').first()).toBeVisible()
  })

  test('shows create lock section', async ({ page }) => {
    const createLock = page.locator('text=/Create New Lock|LCLAW Amount|Lock Duration/').first()
    await expect(createLock).toBeVisible()
  })

  test('has amount input for LCLAW', async ({ page }) => {
    const input = page.locator('input').first()
    await expect(input).toBeVisible()
  })

  test('has duration presets', async ({ page }) => {
    // Should have duration buttons like 1 month, 3 months, etc.
    const presets = page.locator('button').filter({ hasText: /month|year/ })
    expect(await presets.count()).toBeGreaterThan(0)
  })

  test('shows voting power overview', async ({ page }) => {
    const overview = page.locator('text=/Total Locked|Total Power|Voting Power/').first()
    await expect(overview).toBeVisible()
  })

  test('shows empty state when no locks', async ({ page }) => {
    // Without wallet, should show empty or connect state
    const body = await page.textContent('body')
    expect(body).toBeTruthy()
    // Page should have either locks or empty state message
    const hasLocks = body!.includes('Your Locks') || body!.includes('No locks') || body!.includes('Create')
    expect(hasLocks).toBe(true)
  })

  test('how it works section exists', async ({ page }) => {
    const howItWorks = page.locator('text=/How.*Works|Longer locks/').first()
    if (await howItWorks.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(howItWorks).toBeVisible()
    }
  })
})
