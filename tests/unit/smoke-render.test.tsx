import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

// Mock hooks that make contract calls
vi.mock('@/hooks/use-swap', () => ({
  useSwap: () => ({
    tokenIn: null,
    tokenOut: null,
    amountIn: '',
    amountOut: '',
    setAmountIn: vi.fn(),
    setTokenIn: vi.fn(),
    setTokenOut: vi.fn(),
    switchTokens: vi.fn(),
    quote: null,
    isQuoting: false,
    swap: vi.fn(),
    isSwapping: false,
    approve: vi.fn(),
    isApproving: false,
    needsApproval: false,
    swapHash: undefined,
    error: null,
    slippage: 0.5,
    setSlippage: vi.fn(),
    balance: undefined,
  }),
}))

vi.mock('@/hooks/use-pools', () => ({
  usePools: () => ({
    pools: [],
    isLoading: false,
    error: null,
  }),
  usePoolsList: () => ({
    pools: [],
    isLoading: false,
    isEmpty: true,
  }),
}))

vi.mock('@/hooks/use-voting-escrow', () => ({
  useVotingEscrow: () => ({
    locks: [],
    isLoading: false,
    createLock: vi.fn(),
    isCreatingLock: false,
    votingPower: 0n,
  }),
}))

vi.mock('@/hooks/use-ai-vault', () => ({
  useAIVault: () => ({
    deposits: [],
    totalPower: 0n,
    deposit: vi.fn(),
    withdraw: vi.fn(),
    isDepositing: false,
    isWithdrawing: false,
    vaultStats: null,
    strategies: [],
  }),
  useAIVaultStats: () => ({
    totalDeposited: 0n,
    operator: undefined,
  }),
  useUserVaultDeposits: () => ({
    deposits: [],
    totalPower: 0n,
    refetchIds: vi.fn(),
  }),
}))

vi.mock('@/hooks/use-contracts', () => ({
  useTokenBalance: () => ({ data: undefined, isLoading: false }),
  useTokenAllowance: () => ({ data: undefined }),
  useApprove: () => ({ approve: vi.fn(), isPending: false }),
}))

// Test components individually (not full pages, since pages include Header with RainbowKit)
describe('Smoke Render Tests', () => {
  it('renders SwapCard without crashing', async () => {
    const { SwapCard } = await import('@/components/liquid-claw/swap-card')
    const { container } = render(<SwapCard />)
    expect(container).toBeTruthy()
  })

  it('renders Pools without crashing', async () => {
    const { Pools } = await import('@/components/liquid-claw/pools')
    const { container } = render(<Pools />)
    expect(container).toBeTruthy()
  })

  it('renders Footer without crashing', async () => {
    const { Footer } = await import('@/components/liquid-claw/footer')
    const { container } = render(<Footer />)
    expect(container).toBeTruthy()
  })

  it('renders GaugeEmptyState without crashing', async () => {
    const { GaugeEmptyState } = await import('@/components/liquid-claw/gauges/gauge-empty-state')
    const { container } = render(<GaugeEmptyState />)
    expect(container).toBeTruthy()
  })

  it('renders DocContent without crashing', async () => {
    const { DocContent } = await import('@/components/liquid-claw/docs/doc-content')
    const { container } = render(
      <DocContent>
        <h1>Test Doc</h1>
        <p>Test content</p>
      </DocContent>
    )
    expect(container).toBeTruthy()
  })

  it('renders AgentsSection without crashing', async () => {
    const { AgentsSection } = await import('@/components/liquid-claw/agents-section')
    const { container } = render(<AgentsSection />)
    expect(container).toBeTruthy()
  })

  it('renders RewardsSummary without crashing', async () => {
    const { RewardsSummary } = await import('@/components/liquid-claw/rewards/rewards-summary')
    const { container } = render(<RewardsSummary />)
    expect(container).toBeTruthy()
  })

  it('renders PortfolioStats without crashing', async () => {
    const { PortfolioStats } = await import('@/components/liquid-claw/dashboard/portfolio-stats')
    const { container } = render(<PortfolioStats />)
    expect(container).toBeTruthy()
  })
})
