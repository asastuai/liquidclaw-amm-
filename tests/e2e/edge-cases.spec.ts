import { test, expect } from '@playwright/test'

test.describe('Edge Cases', () => {
  test('404 page handles unknown routes gracefully', async ({ page }) => {
    const response = await page.goto('/nonexistent-route-xyz')
    // Should either show 404 or redirect to home, not crash
    expect(response).toBeTruthy()
    const body = await page.textContent('body')
    expect(body!.length).toBeGreaterThan(0)
  })

  test('no console errors on home page', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Filter out known non-critical errors (like WalletConnect, hydration warnings)
    const criticalErrors = errors.filter(e =>
      !e.includes('WalletConnect') &&
      !e.includes('wagmi') &&
      !e.includes('hydrat') &&
      !e.includes('WebSocket') &&
      !e.includes('favicon')
    )
    expect(criticalErrors).toEqual([])
  })

  test('no console errors on swap page', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/swap')
    await page.waitForLoadState('networkidle')
    const criticalErrors = errors.filter(e =>
      !e.includes('WalletConnect') &&
      !e.includes('wagmi') &&
      !e.includes('hydrat') &&
      !e.includes('WebSocket') &&
      !e.includes('favicon')
    )
    expect(criticalErrors).toEqual([])
  })

  test('no JS exceptions on any core page', async ({ page }) => {
    const exceptions: string[] = []
    page.on('pageerror', err => exceptions.push(err.message))

    const corePages = ['/swap', '/pools', '/lock', '/vote', '/ai-vault', '/dashboard']
    for (const route of corePages) {
      await page.goto(route)
      await page.waitForLoadState('domcontentloaded')
    }
    // Filter hydration mismatches (common in SSR with dynamic content like dates/timers)
    const critical = exceptions.filter(e => !e.includes('Hydration') && !e.includes('hydrat'))
    expect(critical).toEqual([])
  })

  test('rapid navigation does not crash', async ({ page }) => {
    // Quickly navigate between pages
    const routes = ['/swap', '/pools', '/lock', '/vote', '/governance', '/dashboard']
    for (const route of routes) {
      await page.goto(route)
    }
    // Should still be functional
    const body = await page.textContent('body')
    expect(body!.length).toBeGreaterThan(0)
  })

  test('back/forward navigation works', async ({ page }) => {
    await page.goto('/swap')
    await page.waitForLoadState('domcontentloaded')
    await page.goto('/pools')
    await page.waitForLoadState('domcontentloaded')
    await page.goBack()
    await expect(page).toHaveURL(/swap/)
    await page.goForward()
    await expect(page).toHaveURL(/pools/)
  })

  test('page title is set', async ({ page }) => {
    await page.goto('/')
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
  })

  test('viewport meta tag exists for mobile', async ({ page }) => {
    await page.goto('/')
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')
    expect(viewport).toContain('width=device-width')
  })
})
