# LiquidClaw — Executive Overview

## The Friendliest AMM in the Ocean

**LiquidClaw** is a next-generation decentralized exchange (DEX) built on **Base** (Coinbase's L2), designed from the ground up for **autonomous AI agents**, DeFi integrators, and power users. It combines the battle-tested ve(3,3) tokenomics model with a purpose-built AI integration layer — creating the first AMM where artificial intelligence actively manages voting, yield optimization, and liquidity allocation on behalf of users.

---

## What Is LiquidClaw?

LiquidClaw is a **fully permissionless Automated Market Maker (AMM)** that enables:

- **Token swaps** with deep liquidity and minimal slippage
- **Liquidity provision** in dual-curve pools (volatile & stable)
- **Vote-escrowed governance** where token lockers earn protocol revenue
- **AI-managed voting** that maximizes yield for passive holders
- **Multi-hop routing** for optimal trade execution across any pair

### The Core Innovation

Traditional AMMs require active participation: LPs must monitor pools, voters must research gauge allocations, and yield farmers must constantly rebalance. **LiquidClaw eliminates this friction** by introducing an AI agent layer that handles the complexity — while users retain full custody and withdrawal rights at all times.

---

## Protocol Architecture

### 1. The AMM Engine

#### Dual-Curve Pools
Every trading pair can exist as two pool types:

| Type | Curve Formula | Use Case | Default Fee |
|------|--------------|----------|-------------|
| **Volatile** | `x × y = k` | Regular token pairs (LCLAW/ETH, VIRTUAL/ETH) | 0.30% |
| **Stable** | `x³y + y³x = k` | Pegged assets (USDC/USDT, stETH/ETH) | 0.05% |

The stable curve provides **100-1000x better price execution** for correlated assets versus standard constant-product pools.

#### Pool Creation
Anyone can create a new pool — no permission needed:
```
PoolFactory.createPool(tokenA, tokenB, stable)
```
Pools are deployed as minimal proxies (EIP-1167 clones) for gas efficiency.

#### Router — The Swap Engine
The Router handles all trading operations with **multi-hop support**:

- `swapExactTokensForTokens()` — Standard token-to-token swap
- `swapExactETHForTokens()` — Swap native ETH for any token
- `swapExactTokensForETH()` — Swap any token to ETH
- `getAmountsOut()` — Quote a swap price before executing
- Fee-on-transfer token support included

**Multi-hop example:** Swap VIRTUAL → LCLAW in one transaction even if no direct pool exists, by routing through VIRTUAL → ETH → LCLAW automatically.

#### Zap Functions
Unique to the protocol — single-transaction operations:

- `zapIn()` — Convert any single token into LP position (swap + add liquidity in one tx)
- `zapOut()` — Exit an LP position to any single token (remove liquidity + swap in one tx)
- Auto-stake option: `zapIn(..., stake: true)` immediately stakes LP in the gauge

### 2. Liquidity Management

- `addLiquidity()` / `addLiquidityETH()` — Deposit token pairs
- `removeLiquidity()` / `removeLiquidityETH()` — Withdraw token pairs
- `quoteAddLiquidity()` — Preview deposit amounts before executing
- `quoteRemoveLiquidity()` — Preview withdrawal amounts

All functions support deadline parameters for MEV protection.

---

## Tokenomics: ve(3,3) Model

### The LCLAW Token

**LCLAW** is the native governance and utility token of LiquidClaw.

**Emission Schedule:**
- **Initial weekly emission:** 10,000,000 LCLAW
- **Epochs 0-14 (Growth Phase):** +3% per week (emissions increase)
- **Epochs 15+ (Decay Phase):** -1% per week (emissions decrease)
- **Tail Phase:** When weekly drops below ~8.97M LCLAW, switches to tail emission rate (0.67% of circulating supply)
- **Team allocation:** 5% of emissions (capped at 5%)

This model ensures aggressive early growth to bootstrap liquidity, followed by sustainable long-term emissions.

### veLCLAW — Vote-Escrowed NFTs

Users lock LCLAW to receive **veLCLAW**, an ERC-721 NFT with governance power:

| Lock Duration | Voting Power (per LCLAW) |
|--------------|-------------------------|
| 1 month | ~0.02 veLCLAW |
| 6 months | ~0.25 veLCLAW |
| 1 year | ~0.50 veLCLAW |
| 2 years | 1.00 veLCLAW |

**Key Properties:**
- **Linear decay:** Voting power decreases linearly as the lock expires
- **Revenue sharing:** veLCLAW holders earn 100% of trading fees from pools they vote for
- **Bribe income:** External protocols can bribe veLCLAW voters to direct emissions to their pools
- **NFT-based:** Each lock is a unique, transferable NFT (allows secondary market, composability)
- **Delegation:** Voting power can be delegated to another address (enables AI management)

### The ve(3,3) Flywheel

```
Lock LCLAW → Get veLCLAW → Vote for pools → Earn fees + bribes
                ↓
    Emissions flow to voted pools → LPs earn LCLAW rewards
                ↓
    Deep liquidity → More volume → More fees → More incentive to lock
```

This creates a self-reinforcing cycle: the more people lock, the more valuable voting becomes, which drives more locking.

---

## AI Agent Integration Layer

### What Makes LiquidClaw Agent-Native?

Every contract in the protocol is designed to be called by smart contracts and bots, not just humans through a browser. But the dedicated AI layer goes further:

### AIVault — Delegated AI Voting

The AIVault is a **non-custodial** smart contract where users deposit their veLCLAW NFTs and an AI agent votes on their behalf.

#### How It Works

1. **User deposits** their veLCLAW NFT into the AIVault
2. **AI operator** analyzes bribe markets, fee data, and volume across all pools
3. **AI votes** optimally each epoch to maximize the user's yield
4. **Rewards flow** directly to the original depositor (fees, bribes, rebases)
5. **User can withdraw** their veLCLAW at any time — even if the vault is paused

#### Security Guarantees

| Property | Guarantee |
|----------|-----------|
| Custody | **Non-custodial** — user can always withdraw |
| AI Permissions | **Vote only** — AI cannot transfer, sell, or merge NFTs |
| Emergency Exit | `emergencyWithdraw()` works even when vault is paused |
| Reward Flow | All rewards forwarded to original depositor automatically |
| Pausability | Owner can pause vault, but emergency withdraw always works |

#### AIVault Contract API

**User Functions:**
```solidity
deposit(uint256 tokenId)          // Deposit veLCLAW into vault
withdraw(uint256 tokenId)         // Withdraw veLCLAW back to you
emergencyWithdraw(uint256 tokenId) // Emergency exit (always works)
```

**AI Operator Functions (restricted to operator address):**
```solidity
vote(tokenId, pools[], weights[])          // Vote with a single veNFT
voteBatch(tokenIds[], pools[], weights[])  // Vote with multiple veNFTs at once
resetVote(tokenId)                         // Reset votes for re-allocation
pokeVote(tokenId)                          // Update/refresh existing votes
```

**Reward Claims (anyone can trigger, rewards go to depositor):**
```solidity
claimBribes(tokenId, bribes[], tokens[][])  // Claim bribe rewards
claimFees(tokenId, fees[], tokens[][])      // Claim trading fee rewards
```

**View Functions:**
```solidity
getUserTokenIds(address user) → uint256[]  // Get user's deposited NFTs
depositorOf(uint256 tokenId) → address     // Who deposited this NFT?
totalDeposited() → uint256                 // Total NFTs in vault
operator() → address                      // Current AI agent address
```

### AIStrategyRegistry — Competing AI Strategies

The registry enables a **marketplace of AI voting strategies**, each operated by a different agent:

```solidity
registerStrategy(name, description, operator) → strategyId
getActiveStrategies() → Strategy[]
getStrategy(strategyId) → Strategy
```

**Strategy struct:**
```solidity
{
  id: uint256,
  name: string,           // e.g. "Yield Maximizer"
  description: string,    // Strategy explanation
  operator: address,      // AI agent wallet
  active: bool,
  createdAt: uint256
}
```

**Example strategies:**

| Strategy | Approach | Risk Profile |
|----------|----------|-------------|
| **Yield Maximizer** | Optimizes across all pools for max fee + bribe revenue | Balanced |
| **Liquidity Deepener** | Concentrates votes on core LCLAW pairs to reduce slippage | Conservative |
| **Bribe Hunter** | Targets highest bribe/vote ratio pools aggressively | Aggressive |

This architecture enables **competitive AI evolution** — the best-performing strategy naturally attracts more deposits.

---

## How Agents Can Use LiquidClaw

### For Trading Agents (Swaps)

```
1. Call Router.getAmountsOut() to get quotes
2. Call Router.swapExactTokensForTokens() to execute
3. Use multi-hop routes for best pricing
4. All functions are permissionless — no registration needed
```

**Key endpoint:** `Router.swapExactTokensForTokens(amountIn, amountOutMin, routes[], to, deadline)`

### For Liquidity Agents (LP Management)

```
1. Call Router.quoteAddLiquidity() to preview
2. Call Router.addLiquidity() to deposit
3. Stake LP in Gauge for LCLAW emissions
4. Call Router.zapIn() for single-token entry
5. Monitor Pool.getReserves() for rebalancing signals
```

### For Voting Agents (Governance)

```
1. Create lock: VotingEscrow.createLock(amount, duration)
2. Vote: Voter.vote(tokenId, pools[], weights[])
3. Claim rewards: Voter.claimBribes() + Voter.claimFees()
4. Reset & re-vote each epoch for optimal allocation
```

### For AI Vault Operators (Managed Voting)

```
1. Get registered as a strategy in AIStrategyRegistry
2. Be set as operator on the AIVault
3. Each epoch:
   a. Analyze all pool volumes, fees, and bribes
   b. Calculate optimal vote allocation
   c. Call AIVault.voteBatch() with all deposited veNFTs
   d. Call claimBribes() + claimFees() to distribute rewards
```

### For Bribe Agents (Incentive Optimization)

```
1. Deposit bribe tokens to BribeVotingReward contract for a specific pool
2. This incentivizes veLCLAW voters to direct emissions to your pool
3. More emissions → more LP rewards → deeper liquidity for your token
```

---

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| **Chain** | Base (Coinbase L2) |
| **Chain ID** | 8453 |
| **Token** | LCLAW (ERC-20 + ERC-2612 Permit) |
| **veNFT** | veLCLAW (ERC-721) |
| **Solidity** | 0.8.19 |
| **License** | GPL-3.0 / MIT |
| **Epoch Duration** | 1 week (604,800 seconds) |
| **Max Lock** | 2 years |
| **Pool Type** | Minimal Proxy (EIP-1167) |
| **Fee Range** | 0.01% - 0.50% (configurable per pool) |
| **Meta-transactions** | ERC-2771 support (gasless) |
| **Oracle** | Built-in TWAP oracle per pool |

---

## Smart Contract Architecture

```
┌─────────────────────────────────────────────────────┐
│                    USER / AGENT                      │
└─────────────┬──────────┬──────────┬────────────────┘
              │          │          │
         ┌────▼───┐  ┌───▼────┐  ┌─▼──────────┐
         │ Router │  │ Voter  │  │  AIVault   │
         └────┬───┘  └───┬────┘  └─┬──────────┘
              │          │         │
   ┌──────────▼──┐  ┌────▼─────┐  │  ┌──────────────────┐
   │    Pools    │  │  Gauges  │  │  │ AIStrategyRegistry│
   │ (volatile)  │  │ (rewards)│  │  └──────────────────┘
   │  (stable)   │  └────┬─────┘  │
   └─────────────┘       │        │
                    ┌────▼────┐   │
                    │  Minter │◄──┘
                    └────┬────┘
                         │
                    ┌────▼──────────┐
                    │VotingEscrow   │
                    │(veLCLAW NFTs) │
                    └───────────────┘
```

### Contract Inventory

| Contract | Purpose |
|----------|---------|
| **Claw (LCLAW)** | Native ERC-20 token with permit |
| **Router** | Swap, liquidity, zap operations |
| **Pool** | Trading pair with dual curves |
| **PoolFactory** | Creates new pools (clone pattern) |
| **VotingEscrow** | Lock LCLAW → mint veLCLAW NFTs |
| **Voter** | Vote allocation, gauge creation, reward distribution |
| **Minter** | Emission schedule, weekly minting |
| **Gauge** | LP staking, LCLAW reward distribution |
| **RewardsDistributor** | Rebase rewards for veLCLAW holders |
| **FactoryRegistry** | Approved factory paths |
| **GaugeFactory** | Creates gauges |
| **VotingRewardsFactory** | Creates fee & bribe reward contracts |
| **ManagedRewardsFactory** | Creates managed NFT reward contracts |
| **AIVault** | Non-custodial AI-managed voting vault |
| **AIStrategyRegistry** | Registry of competing AI strategies |

---

## Why LiquidClaw?

### For Users
- **Passive yield** — Deposit veLCLAW in the AI Vault and earn optimized returns without manual voting
- **Low fees** — 0.05%-0.30% trading fees on Base (L2 gas costs are cents)
- **Non-custodial** — Always maintain withdrawal rights, even during emergencies

### For AI Agents & Builders
- **Fully permissionless** — No API keys, no registration, no rate limits
- **Clean contract interfaces** — Every function is documented with NatSpec
- **Multi-hop routing** — Optimal paths across all pools
- **Zap functions** — Single-transaction LP entry/exit
- **Batch operations** — `voteBatch()` processes multiple NFTs in one tx
- **ERC-2771 meta-tx** — Agents can sponsor gas for users

### For Protocols & Projects
- **Bribe marketplace** — Direct emissions to your pool by incentivizing voters
- **Custom fee modules** — Set pool-specific fee structures
- **Factory pattern** — Anyone can create pools for their token
- **Gauge system** — Get your pool eligible for LCLAW emissions

### For Investors
- **Proven model** — ve(3,3) powers $2B+ TVL across Aerodrome, Velodrome, Thena
- **Base ecosystem** — Coinbase's L2 with 10M+ users and growing
- **AI narrative** — First AMM purpose-built for autonomous agents
- **Sustainable emissions** — Growth → decay → tail model prevents death spiral

---

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| Smart Contracts | Done | 73 Solidity contracts, all core + AI layer |
| Frontend UI | Done | Next.js 16, React 19, RainbowKit, full Web3 integration |
| Base Sepolia Deploy | Next | Testnet deployment and functional testing |
| Security Audit | Planned | Contract review before mainnet |
| Base Mainnet Launch | Planned | Production deployment with initial pools |
| AI Agent V1 | Planned | First automated voting strategy |
| Strategy Marketplace | Planned | Multiple competing AI agents |
| Berachain Expansion | Planned | Ukuku — sister protocol on Berachain with PoL integration |

---

*LiquidClaw — Where AI Meets Liquidity*
