<div align="center">

# LiquidClaw Finance

### ve(3,3) AMM DEX on BSC and Base

**[→ Live at liquidclawfinance.com](https://liquidclawfinance.com)**

[![BSC Mainnet](https://img.shields.io/badge/BSC-mainnet-F0B90B.svg)](https://liquidclawfinance.com)
[![Base L2](https://img.shields.io/badge/Base-L2-0052FF.svg)](https://liquidclawfinance.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg)](https://www.typescriptlang.org/)
[![Solidity Contracts](https://img.shields.io/badge/contracts-liquidclaw--bsc-363636.svg)](https://github.com/asastuai/liquidclaw-bsc)

Swap · Lock · Vote · Earn — an Aerodrome-style flywheel for BSC and Base.

</div>

---

## What it is

LiquidClaw Finance is a permissionless AMM DEX with **ve(3,3) tokenomics** — the design pattern popularized by Solidly, Velodrome, and Aerodrome, ported to BSC and Base. Liquidity providers and long-term lockers are aligned through gauges: you lock tokens, you vote, you earn fees plus emissions proportional to what you direct.

This repository is the **production frontend** serving [liquidclawfinance.com](https://liquidclawfinance.com). The on-chain contracts live at [asastuai/liquidclaw-bsc](https://github.com/asastuai/liquidclaw-bsc).

---

## Features

- **Swap** — constant-product pools with bilingual interface (EN / ZH)
- **Pools** — LP into stable or volatile pools; deposit receipts as standard ERC-20s
- **Lock** — lock LCLAW for up to 4 years to mint veLCLAW and vote on gauge emissions
- **Vote** — direct weekly emissions to the pools you LP into, earn the fees
- **Gauges** — per-pool reward streams tied to the vote distribution
- **Governance** — on-chain proposals tied to veLCLAW holdings
- **AI Vault** — automated governance optimization (experimental)
- **Multi-chain** — BSC mainnet + Base L2, single frontend, same contracts

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Radix UI |
| Web3 | wagmi + viem |
| i18n | Custom EN / ZH switcher |
| Testing | Vitest (unit) + Playwright (e2e) |
| Deployment | Vercel |

---

## Run locally

```bash
# Install
pnpm install         # or: npm install / yarn

# Dev server
pnpm dev

# Build
pnpm build

# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
├── app/                      # Next.js App Router
│   ├── swap/                 # Swap interface
│   ├── pools/                # LP management
│   ├── lock/                 # veLCLAW lock
│   ├── vote/                 # Gauge voting
│   ├── gauges/               # Gauge overview
│   ├── rewards/              # Claim rewards
│   ├── governance/           # Proposals + voting
│   ├── ai-vault/             # Automated governance vault
│   ├── genesis/              # Launch / airdrop
│   ├── docs/                 # In-app docs
│   └── dashboard/            # User dashboard
├── components/
│   ├── liquid-claw/          # Domain components (swap-card, network-guard, etc.)
│   └── ui/                   # Radix primitives
├── lib/
│   ├── contracts/            # ABIs + addresses
│   └── i18n.tsx              # Translation system
├── public/
│   └── images/tokens/        # Token logos
└── tests/                    # Vitest + Playwright
```

---

## Related repositories

- [**liquidclaw-bsc**](https://github.com/asastuai/liquidclaw-bsc) — Solidity contracts (13 deployed, verified on BscScan)
- [**asastuai**](https://github.com/asastuai/asastuai) — Developer profile and full portfolio

---

## License

Apache 2.0 — see [LICENSE](LICENSE) (frontend); contract licensing follows the [liquidclaw-bsc](https://github.com/asastuai/liquidclaw-bsc) repository.

---

Built by [Juan Cruz Maisu](https://github.com/asastuai) · Buenos Aires, Argentina
