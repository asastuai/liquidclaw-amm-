import { describe, it, expect } from 'vitest'
import { getTokenIcon, TOKEN_ICONS, DEFAULT_TOKEN_ICON } from '@/lib/token-icons'

describe('token-icons', () => {
  it('returns correct icon for known tokens', () => {
    expect(getTokenIcon('LCLAW')).toBe('/images/lobster-mascot.jpg')
    expect(getTokenIcon('ETH')).toBe('/images/tokens/eth.png')
    expect(getTokenIcon('WETH')).toBe('/images/tokens/eth.png')
    expect(getTokenIcon('USDC')).toBe('/images/tokens/usdc.png')
    expect(getTokenIcon('VIRTUAL')).toBe('/images/tokens/virtual.png')
  })

  it('returns default icon for unknown tokens', () => {
    expect(getTokenIcon('UNKNOWN')).toBe(DEFAULT_TOKEN_ICON)
    expect(getTokenIcon('')).toBe(DEFAULT_TOKEN_ICON)
    expect(getTokenIcon('SHIB')).toBe(DEFAULT_TOKEN_ICON)
  })

  it('has all expected tokens mapped', () => {
    const expectedTokens = ['LCLAW', 'WETH', 'ETH', 'USDC', 'USDT', 'VIRTUAL', 'DAI', 'cbETH']
    for (const token of expectedTokens) {
      expect(TOKEN_ICONS[token]).toBeDefined()
    }
  })
})
