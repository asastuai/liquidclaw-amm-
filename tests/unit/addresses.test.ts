import { describe, it, expect } from 'vitest'
import { getAddresses, BASE_SEPOLIA_ADDRESSES, BASE_ADDRESSES, BASE_TOKENS } from '@/lib/contracts/addresses'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('contract addresses', () => {
  describe('BASE_SEPOLIA_ADDRESSES', () => {
    const coreContracts = [
      'lclaw', 'router', 'poolFactory', 'votingEscrow',
      'voter', 'minter', 'rewardsDistributor', 'factoryRegistry',
      'aiVault', 'aiStrategyRegistry', 'weth'
    ] as const

    it('has all core contract addresses deployed (non-zero)', () => {
      for (const key of coreContracts) {
        const address = BASE_SEPOLIA_ADDRESSES[key]
        expect(address, `${key} should be defined`).toBeDefined()
        expect(address, `${key} should be valid hex`).toMatch(/^0x[a-fA-F0-9]{40}$/)
        expect(address, `${key} should not be zero address`).not.toBe(ZERO_ADDRESS)
      }
    })

    it('usdc and virtual are not yet deployed on sepolia', () => {
      // These are placeholders - test will catch when they get real addresses
      expect(BASE_SEPOLIA_ADDRESSES.usdc).toBe(ZERO_ADDRESS)
      expect(BASE_SEPOLIA_ADDRESSES.virtual).toBe(ZERO_ADDRESS)
    })
  })

  describe('BASE_ADDRESSES (mainnet)', () => {
    it('has WETH and USDC with real mainnet addresses', () => {
      expect(BASE_ADDRESSES.weth).not.toBe(ZERO_ADDRESS)
      expect(BASE_ADDRESSES.usdc).not.toBe(ZERO_ADDRESS)
    })

    it('protocol contracts are placeholder zeros (not deployed yet)', () => {
      expect(BASE_ADDRESSES.lclaw).toBe(ZERO_ADDRESS)
      expect(BASE_ADDRESSES.router).toBe(ZERO_ADDRESS)
      expect(BASE_ADDRESSES.voter).toBe(ZERO_ADDRESS)
    })
  })

  describe('getAddresses', () => {
    it('returns sepolia addresses for chain 84532', () => {
      const addrs = getAddresses(84532)
      expect(addrs).toBe(BASE_SEPOLIA_ADDRESSES)
    })

    it('returns mainnet addresses for chain 8453', () => {
      const addrs = getAddresses(8453)
      expect(addrs).toBe(BASE_ADDRESSES)
    })

    it('returns mainnet addresses for unknown chain (fallback)', () => {
      const addrs = getAddresses(1)
      expect(addrs).toBe(BASE_ADDRESSES)
    })
  })

  describe('BASE_TOKENS', () => {
    it('has at least 4 tokens', () => {
      expect(BASE_TOKENS.length).toBeGreaterThanOrEqual(4)
    })

    it('each token has required fields', () => {
      for (const token of BASE_TOKENS) {
        expect(token.symbol).toBeTruthy()
        expect(token.name).toBeTruthy()
        expect(token.decimals).toBeGreaterThan(0)
        expect(token.logo).toBeTruthy()
      }
    })

    it('includes LCLAW token', () => {
      const lclaw = BASE_TOKENS.find(t => t.symbol === 'LCLAW')
      expect(lclaw).toBeDefined()
      expect(lclaw!.decimals).toBe(18)
    })

    it('includes ETH as native token', () => {
      const eth = BASE_TOKENS.find(t => t.symbol === 'ETH')
      expect(eth).toBeDefined()
      expect(eth!.isNative).toBe(true)
    })
  })
})
