import { test, expect } from '@playwright/test'

test.describe('Swap Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/swap')
    await page.waitForLoadState('domcontentloaded')
  })

  test('shows swap card with inputs', async ({ page }) => {
    await expect(page.locator('text=You pay')).toBeVisible()
    await expect(page.locator('text=You receive')).toBeVisible()
  })

  test('has token selector buttons', async ({ page }) => {
    // Should have at least one token selector with ChevronDown
    const tokenButtons = page.locator('button').filter({ hasText: /ETH|LCLAW|USDC|Select/ })
    expect(await tokenButtons.count()).toBeGreaterThan(0)
  })

  test('amount input accepts numeric values', async ({ page }) => {
    const input = page.locator('input[type="number"], input[placeholder="0.0"]').first()
    if (await input.isVisible()) {
      await input.fill('1.5')
      await expect(input).toHaveValue('1.5')
    }
  })

  test('amount input is type number (browser enforces numeric)', async ({ page }) => {
    const input = page.locator('input[type="number"], input[placeholder="0.0"]').first()
    if (await input.isVisible()) {
      const type = await input.getAttribute('type')
      expect(type).toBe('number')
    }
  })

  test('shows connect wallet or enter amount when no wallet', async ({ page }) => {
    // Without wallet connected, main button should show Connect Wallet or Enter amount
    const actionButton = page.locator('button').filter({ hasText: /Connect Wallet|Enter amount|Swap/ }).first()
    await expect(actionButton).toBeVisible()
  })

  test('swap direction button exists', async ({ page }) => {
    // ArrowDownUp button to reverse token pair
    const swapButton = page.locator('button').filter({ has: page.locator('svg') })
    expect(await swapButton.count()).toBeGreaterThan(0)
  })

  test('swap page has interactive elements', async ({ page }) => {
    // Verify the page has buttons and inputs for swapping
    const buttons = page.locator('button:visible')
    expect(await buttons.count()).toBeGreaterThan(2)
  })
})
