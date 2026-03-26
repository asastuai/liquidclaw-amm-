import { test, expect } from '@playwright/test'

test.describe('Mobile Responsive', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('home page renders on mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const body = await page.textContent('body')
    expect(body?.length).toBeGreaterThan(10)
  })

  test('swap page renders on mobile', async ({ page }) => {
    await page.goto('/swap')
    await page.waitForLoadState('domcontentloaded')

    // Page should render without crashing - check body has content
    const body = await page.textContent('body')
    expect(body!.length).toBeGreaterThan(0)
    // No JS errors = page rendered successfully
    await expect(page).toHaveURL(/swap/)
  })

  test('docs page renders on mobile', async ({ page }) => {
    await page.goto('/docs')
    await page.waitForLoadState('domcontentloaded')

    // Content should be visible even without sidebar
    const body = await page.textContent('body')
    expect(body?.length).toBeGreaterThan(50)
  })
})

test.describe('Tablet Responsive', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('pools page renders on tablet', async ({ page }) => {
    await page.goto('/pools')
    await page.waitForLoadState('domcontentloaded')

    const body = await page.textContent('body')
    expect(body?.length).toBeGreaterThan(10)
  })
})
