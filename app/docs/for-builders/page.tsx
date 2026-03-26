import { DocPage } from '@/components/liquid-claw/docs/doc-page'
import { Callout, CodeBlock } from '@/components/liquid-claw/docs/doc-content'

export const metadata = {
  title: 'For Builders & AI Agents | LiquidClaw Docs',
  description: 'Build on LiquidClaw — permissionless, composable, agent-friendly infrastructure',
}

export default function ForBuildersPage() {
  return (
    <DocPage>
      <h1>For Builders &amp; AI Agents</h1>
      <h2 id="build-on-liquidclaw">Build on LiquidClaw</h2>

      <p>
        LiquidClaw is designed to be composable, permissionless, and agent-friendly. Whether you&apos;re building a trading bot, a liquidity management agent, or an entirely new DeFi strategy — our contracts are ready for you.
      </p>
      <p>No API keys. No registration. No rate limits. Just open smart contracts on Base.</p>

      <h2 id="integration-guide">Integration Guide by Use Case</h2>

      <h3 id="trading-agents">Trading Agents</h3>
      <CodeBlock language="text">{`1. Get a quote:       Router.getAmountsOut(amountIn, routes[])
2. Execute the swap:  Router.swapExactTokensForTokens(amountIn, amountOutMin, routes[], to, deadline)`}</CodeBlock>

      <table>
        <thead>
          <tr><th>Function</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>swapExactTokensForTokens()</code></td><td>Standard token → token swap</td></tr>
          <tr><td><code>swapExactETHForTokens()</code></td><td>Native ETH → any token</td></tr>
          <tr><td><code>swapExactTokensForETH()</code></td><td>Any token → native ETH</td></tr>
          <tr><td><code>getAmountsOut()</code></td><td>Get a quote before executing</td></tr>
        </tbody>
      </table>

      <h3 id="liquidity-agents">Liquidity Management Agents</h3>
      <CodeBlock language="text">{`1. Preview:    Router.quoteAddLiquidity(tokenA, tokenB, stable, amountA, amountB)
2. Deposit:    Router.addLiquidity(tokenA, tokenB, stable, amountADesired, amountBDesired, ...)
3. Stake:      Gauge.deposit(lpAmount)
4. Monitor:    Pool.getReserves() — watch for rebalancing signals
5. Withdraw:   Router.removeLiquidity(...)`}</CodeBlock>

      <h3 id="voting-agents">Voting Agents</h3>
      <CodeBlock language="text">{`1. Lock:    VotingEscrow.createLock(amount, lockDuration)
2. Vote:    Voter.vote(tokenId, pools[], weights[])
3. Claim:   Voter.claimBribes() + Voter.claimFees()
4. Reset:   Voter.reset(tokenId)
5. Repeat each epoch for optimal allocation`}</CodeBlock>

      <h3 id="ai-vault-operators">AI Vault Operators</h3>
      <CodeBlock language="text">{`1. Register:  AIStrategyRegistry.registerStrategy(name, description, operator)
2. Be appointed as operator on an AIVault instance
3. Each epoch:
   a. Analyze all pool volumes, fees, and bribes
   b. Calculate optimal vote allocation
   c. Call AIVault.voteBatch(tokenIds[], pools[], weights[])
   d. Call claimBribes() + claimFees() to distribute rewards`}</CodeBlock>

      <h3 id="bribe-agents">Bribe Agents</h3>
      <CodeBlock language="text">{`1. Deposit bribe tokens to BribeVotingReward contract for your target pool
2. veLCLAW voters see the bribe offer and are incentivized to vote for your pool
3. More votes → more emissions → more LP rewards → deeper liquidity`}</CodeBlock>

      <h2 id="technical-specs">Technical Specifications</h2>
      <table>
        <thead>
          <tr><th>Parameter</th><th>Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Chain</td><td>Base (Coinbase L2)</td></tr>
          <tr><td>Chain ID</td><td>8453 (mainnet) / 84532 (testnet)</td></tr>
          <tr><td>Token Standard</td><td>LCLAW: ERC-20 + ERC-2612 Permit</td></tr>
          <tr><td>veNFT Standard</td><td>veLCLAW: ERC-721</td></tr>
          <tr><td>Solidity Version</td><td>0.8.19</td></tr>
          <tr><td>Pool Architecture</td><td>Minimal Proxy (EIP-1167 clones)</td></tr>
          <tr><td>Fee Range</td><td>0.01% — 0.50% (configurable per pool)</td></tr>
          <tr><td>Meta-transactions</td><td>ERC-2771 (gasless tx support)</td></tr>
          <tr><td>Oracle</td><td>Built-in TWAP oracle per pool</td></tr>
          <tr><td>Epoch Duration</td><td>1 week (604,800 seconds)</td></tr>
          <tr><td>Max Lock</td><td>2 years</td></tr>
        </tbody>
      </table>

      <h2 id="contract-addresses">Contract Addresses (Base Sepolia — Live)</h2>
      <table>
        <thead>
          <tr><th>Contract</th><th>Address</th></tr>
        </thead>
        <tbody>
          <tr><td>LCLAW Token</td><td><code>0x8D4DeBA522eB9FaB5Edb7DF61398C450FF6898c3</code></td></tr>
          <tr><td>Router</td><td><code>0xc64eD8215CA17Ba02551ED721C0F4ecEd566D51B</code></td></tr>
          <tr><td>PoolFactory</td><td><code>0x3BcFcca5b86eD04a00D975BC7d9ceC408d5f299B</code></td></tr>
          <tr><td>VotingEscrow</td><td><code>0xE905259865327516096561FEE8E0832A311BC0c9</code></td></tr>
          <tr><td>Voter</td><td><code>0x5259EC22e51A734506cB2f4a810E92Ad0F2C0927</code></td></tr>
          <tr><td>Minter</td><td><code>0xB5aFF886cF06699438b77Fe898966858ea78c928</code></td></tr>
          <tr><td>RewardsDistributor</td><td><code>0x347D178b332C0E3DF68FEccA733780335D1D2B1a</code></td></tr>
          <tr><td>AIVault</td><td><code>0x5249dbb911aE1057a049cbFf131B5b0FA58d39b2</code></td></tr>
          <tr><td>AIStrategyRegistry</td><td><code>0x4eBa60705742A56A1734cD35Ce4f88fC2e976905</code></td></tr>
          <tr><td>LCLAW/WETH Pool</td><td><code>0x82C3342f2c22F05Ed7c29B846c24522CD7DCC49C</code></td></tr>
          <tr><td>Gauge</td><td><code>0x4ed315e71b55f925492d35dfdebf7879d6051cd5</code></td></tr>
        </tbody>
      </table>

      <h2 id="architecture">Architecture Overview</h2>
      <CodeBlock language="text">{`┌─────────────────────────────────────────────────┐
│              USER / AI AGENT                     │
└──────┬──────────┬──────────┬───────────────────┘
       │          │          │
  ┌────▼───┐ ┌───▼────┐ ┌──▼──────────┐
  │ Router │ │ Voter  │ │  AI Vault   │
  └────┬───┘ └───┬────┘ └──┬──────────┘
       │         │         │
  ┌────▼──────┐ ┌▼────────┐│ ┌──────────────────┐
  │   Pools   │ │ Gauges  ││ │AIStrategyRegistry │
  │(vol/stbl) │ │(rewards)││ └──────────────────┘
  └───────────┘ └────┬────┘│
                ┌────▼────┐│
                │ Minter  │◄┘
                └────┬────┘
                ┌────▼──────────┐
                │VotingEscrow   │
                │(veLCLAW NFTs) │
                └───────────────┘`}</CodeBlock>

      <h2 id="best-practices">Best Practices</h2>
      <ul>
        <li><strong>Batch where possible.</strong> Use <code>voteBatch()</code> instead of individual <code>vote()</code> calls to save gas.</li>
        <li><strong>Check reserves before large operations.</strong> Call <code>Pool.getReserves()</code> to understand liquidity depth.</li>
        <li><strong>Set reasonable deadlines.</strong> All swap and liquidity functions accept a deadline parameter.</li>
        <li><strong>Monitor epoch boundaries.</strong> Voting resets each epoch. Vote early to lock in rewards.</li>
        <li><strong>Leverage ERC-2771.</strong> If you want to sponsor gas for your users, the protocol supports meta-transactions out of the box.</li>
      </ul>
    </DocPage>
  )
}
