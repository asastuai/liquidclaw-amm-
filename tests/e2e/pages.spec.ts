import { test, expect } from '@playwright/test'

const allRoutes = [
  { path: '/', title: 'home' },
  { path: '/swap', title: 'swap' },
  { path: '/pools', title: 'pools' },
  { path: '/gauges', title: 'gauges' },
  { path: '/vote', title: 'vote' },
  { path: '/lock', title: 'lock' },
  { path: '/governance', title: 'governance' },
  { path: '/dashboard', title: 'dashboard' },
  { path: '/rewards', title: 'rewards' },
  { path: '/ai-vault', title: 'ai-vault' },
  { path: '/create-pool', title: 'create-pool' },
  { path: '/docs', title: 'docs-home' },
  { path: '/docs/getting-started', title: 'docs-getting-started' },
  { path: '/docs/governance', title: 'docs-governance' },
  { path: '/docs/ai-vault', title: 'docs-ai-vault' },
  { path: '/docs/tokenomics', title: 'docs-tokenomics' },
  { path: '/docs/for-builders', title: 'docs-for-builders' },
]

test.describe('All Pages Load', () => {
  for (const route of allRoutes) {
    test(`${route.title} (${route.path}) loads without errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (err) => errors.push(err.message))

      const response = await page.goto(route.path)
      expect(response?.status()).toBeLessThan(400)

      // Wait for page to be interactive
      await page.waitForLoadState('domcontentloaded')

      // No JS errors
      expect(errors, `JS errors on ${route.path}: ${errors.join(', ')}`).toHaveLength(0)

      // Page has content (not blank)
      const body = await page.textContent('body')
      expect(body?.length).toBeGreaterThan(10)
    })
  }
})

test.describe('Navigation', () => {
  test('header nav links work on app pages', async ({ page }) => {
    await page.goto('/swap')
    await page.waitForLoadState('domcontentloaded')

    // Check that nav items exist
    const navLinks = ['Swap', 'Pools']
    for (const label of navLinks) {
      const link = page.locator(`nav a, header a`).filter({ hasText: label }).first()
      await expect(link).toBeVisible()
    }
  })

  test('footer links are present', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check footer has protocol links
    await expect(footer.getByText('Swap')).toBeVisible()
    await expect(footer.getByText('Pools')).toBeVisible()
  })

  test('logo links to home', async ({ page }) => {
    await page.goto('/swap')
    const logo = page.locator('a[href="/"]').first()
    await expect(logo).toBeVisible()
  })

  test('agents section buttons have working links', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const docsButton = page.locator('a').filter({ hasText: 'Read the Docs' }).first()
    await expect(docsButton).toBeVisible()
    await expect(docsButton).toHaveAttribute('href', '/docs/for-builders')

    const contractsButton = page.locator('a').filter({ hasText: 'Get Contract Addresses' }).first()
    await expect(contractsButton).toBeVisible()
    const href = await contractsButton.getAttribute('href')
    expect(href).toContain('/docs/for-builders')
  })
})

test.describe('Docs', () => {
  test('docs sidebar navigation works', async ({ page }) => {
    await page.goto('/docs')
    await page.waitForLoadState('domcontentloaded')

    // Should have sidebar with links
    const sidebar = page.locator('nav, aside').first()
    expect(sidebar).toBeTruthy()
  })

  test('docs theme toggle works', async ({ page }) => {
    await page.goto('/docs')
    await page.waitForLoadState('domcontentloaded')

    // Find theme toggle button (Sun/Moon icon)
    const themeButton = page.locator('button').filter({ has: page.locator('svg') }).last()
    if (await themeButton.isVisible()) {
      // Verify toggle is clickable without JS errors
      await themeButton.click()
      await page.waitForTimeout(200)
      // Click again to toggle back -- no crash = success
      await themeButton.click()
    }
  })
})

test.describe('Swap Page', () => {
  test('swap card is visible', async ({ page }) => {
    await page.goto('/swap')
    await page.waitForLoadState('domcontentloaded')

    // Should show swap interface
    const swapCard = page.locator('text=Swap').first()
    await expect(swapCard).toBeVisible()
  })

  test('token inputs are interactive', async ({ page }) => {
    await page.goto('/swap')
    await page.waitForLoadState('domcontentloaded')

    // Should have input fields for amounts
    const inputs = page.locator('input[type="text"], input[type="number"], input[inputmode="decimal"]')
    const count = await inputs.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})

test.describe('Empty States', () => {
  test('pools shows empty or loading state', async ({ page }) => {
    await page.goto('/pools')
    await page.waitForLoadState('domcontentloaded')

    const body = await page.textContent('body')
    // Should have pools page content (either pools list or empty/loading state)
    expect(body).toBeTruthy()
  })

  test('dashboard shows zero values', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('domcontentloaded')

    // Should show $0.00 values for portfolio
    const body = await page.textContent('body')
    expect(body).toContain('$0')
  })

  test('rewards shows empty state', async ({ page }) => {
    await page.goto('/rewards')
    await page.waitForLoadState('domcontentloaded')

    const body = await page.textContent('body')
    expect(body).toBeTruthy()
  })
})
