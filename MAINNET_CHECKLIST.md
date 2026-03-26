# LiquidClaw AMM - Mainnet Launch Checklist

## Status: Frontend READY, Contracts PENDING

---

## Already Done

- [x] Frontend deployed on Vercel (https://liquidclaw-amm.vercel.app)
- [x] WalletConnect Project ID configured (production)
- [x] 93 automated tests passing (22 unit + 71 E2E)
- [x] TypeScript strict mode, 0 errors
- [x] Error boundaries (app/error.tsx, global-error.tsx, not-found.tsx)
- [x] Wrong network detection with auto-switch to Base
- [x] Security headers (CSP, X-Frame-Options, X-Content-Type-Options)
- [x] Input validations (slippage 0.01-50%, vote weight guards)
- [x] Dynamic explorer URLs (auto-switches basescan.org vs sepolia.basescan.org)
- [x] All dependencies pinned (no "latest")
- [x] 0 TODO comments in codebase
- [x] Lock page + dashboard connected to VotingEscrow contract
- [x] Vote page reads real voting power from veNFTs
- [x] Vercel auto-deploy on git push

---

## Step 1: Deploy Contracts to Base Mainnet

**Wallet**: `0x7c7Faf397dAC2a9Ae6FD902B47e36810913ca644`
**Chain**: Base (8453)
**Needs**: ETH on Base for gas (~0.01 ETH should be enough)

Deploy the same contracts currently on Base Sepolia:
1. LCLAW token
2. Router
3. PoolFactory
4. VotingEscrow
5. Voter
6. Minter
7. RewardsDistributor
8. FactoryRegistry
9. AIVault
10. AIStrategyRegistry

Save each deployed address.

---

## Step 2: Update Frontend Addresses

Edit `lib/contracts/addresses.ts` and replace the zero addresses in `BASE_ADDRESSES`:

```typescript
export const BASE_ADDRESSES: ContractAddresses = {
  lclaw: "0x...",      // paste deployed address
  router: "0x...",
  poolFactory: "0x...",
  votingEscrow: "0x...",
  voter: "0x...",
  minter: "0x...",
  rewardsDistributor: "0x...",
  factoryRegistry: "0x...",
  aiVault: "0x...",
  aiStrategyRegistry: "0x...",
  weth: "0x4200000000000000000000000000000000000006",  // keep - Base WETH
  usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",  // keep - Base USDC
  virtual: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",  // keep - VIRTUAL
}
```

Also update `BASE_TOKENS` LCLAW address to the new mainnet address.

Then: `git add . && git commit -m "Add mainnet contract addresses" && git push`
Vercel will auto-deploy.

---

## Step 3: Verify Contracts on BaseScan

For each contract:
```
npx hardhat verify --network base <address> <constructor-args>
```
Or use BaseScan's UI verification.

---

## Step 4: Create Initial Liquidity

1. Add LCLAW/WETH pool via the Create Pool page
2. Add LCLAW/USDC pool
3. This enables swapping

---

## Step 5: Optional - Custom Domain

1. Buy domain (e.g., liquidclaw.xyz)
2. In Vercel: Settings > Domains > Add
3. Add DNS records as Vercel instructs
4. SSL is automatic

---

## Post-Launch Monitoring

- Check https://liquidclaw-amm.vercel.app loads
- Test wallet connection on Base mainnet
- Test a small swap
- Verify tx links go to basescan.org (not sepolia)
- Monitor WalletConnect dashboard for usage
