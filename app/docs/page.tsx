import { DocPage } from '@/components/liquid-claw/docs/doc-page'
import { Callout } from '@/components/liquid-claw/docs/doc-content'

export const metadata = {
  title: 'LiquidClaw Docs | Welcome',
  description: 'Liquidity for the Agentic Economy — the first DEX built for AI agents on Base',
}

export default function DocsHome() {
  return (
    <DocPage>
      <h1>Welcome to LiquidClaw</h1>
      <h2 id="liquidity-for-the-agentic-economy">Liquidity for the Agentic Economy</h2>

      <p>
        LiquidClaw is the first decentralized exchange built specifically for the world of AI agents. We&apos;re live on Base — Coinbase&apos;s Layer 2 — and we&apos;re here to solve a simple problem: AI agent tokens need deep, reliable liquidity, and right now, nobody is building that infrastructure.
      </p>
      <p>Until now.</p>

      <h2 id="what-is-liquidclaw">What is LiquidClaw?</h2>

      <p>
        Think of LiquidClaw as a trading hub where anyone can swap tokens, provide liquidity, and earn rewards — just like other decentralized exchanges you might know. But here&apos;s what makes us different:
      </p>
      <p>
        <strong>We&apos;re built for AI agents from day one.</strong> Every smart contract, every interface, every incentive mechanism is designed so that autonomous AI agents can interact with the protocol just as easily as humans. No API keys. No registration. No rate limits. Just open, permissionless infrastructure.
      </p>
      <p>
        On top of that, we&apos;ve added something no other AMM has: an <strong>AI Vault</strong> that manages your governance votes automatically. You deposit, the AI optimizes, you earn. It&apos;s that simple.
      </p>

      <h2 id="why-does-this-matter">Why Does This Matter?</h2>

      <p>
        The AI agent economy on Base is exploding. Over 355,000 tokens have been deployed through Clanker, and more than 17,000 agents are running on Virtuals Protocol. These agents issue tokens, build communities, and generate real trading volume.
      </p>
      <p>
        But here&apos;s the catch — most of these tokens have no dedicated liquidity infrastructure. They&apos;re paired with VIRTUAL or WETH on general-purpose DEXes that don&apos;t prioritize them. There are no farming incentives, no bribe markets, no specialized pools.
      </p>
      <p>
        LiquidClaw fills that gap. We give every agent token a home with deep liquidity, farming rewards, and a governance system that aligns incentives for everyone involved.
      </p>

      <h2 id="how-it-works">How It Works (The Big Picture)</h2>

      <p>
        LiquidClaw runs on the <strong>ve(3,3) model</strong> — the same battle-tested tokenomics that power over $2 billion in TVL across protocols like Aerodrome and Velodrome. Here&apos;s the simplified version:
      </p>
      <ol>
        <li><strong>Traders</strong> swap tokens through our pools and pay a small fee (0.05%–0.30%)</li>
        <li><strong>Liquidity Providers</strong> deposit token pairs into pools and earn LCLAW emission rewards</li>
        <li><strong>LCLAW Holders</strong> lock their tokens to get <strong>veLCLAW</strong> — a governance NFT with voting power</li>
        <li><strong>veLCLAW Voters</strong> direct emissions to their favorite pools and earn 100% of trading fees + bribes</li>
        <li><strong>AI Agents</strong> can participate at every level — trading, providing liquidity, voting, and even managing votes for other users through the AI Vault</li>
      </ol>
      <p>
        The result is a flywheel: projects compete for emissions by offering bribes, voters earn yield for directing those emissions, and liquidity deepens across the ecosystem.
      </p>

      <h2 id="who-is-liquidclaw-for">Who Is LiquidClaw For?</h2>

      <p><strong>If you hold AI agent tokens</strong> — we give you a place to trade with better liquidity and earn yield on your holdings.</p>
      <p><strong>If you&apos;re a DeFi user</strong> — lock LCLAW, vote on pools, earn fees and bribes. Or just deposit in the AI Vault and let the algorithm handle everything.</p>
      <p><strong>If you&apos;re building an AI agent</strong> — list your token on LiquidClaw, set up a pool, offer bribes to attract liquidity, and let the ve(3,3) flywheel do the rest.</p>
      <p><strong>If you&apos;re a developer or AI agent builder</strong> — our contracts are fully permissionless with clean interfaces. Build trading bots, liquidity managers, or entirely new strategies on top of the protocol.</p>

      <h2 id="current-status">Current Status</h2>

      <p>LiquidClaw is <strong>live on Base Sepolia testnet</strong> with 20 smart contracts deployed, a fully operational frontend, and active emissions flowing.</p>

      <table>
        <thead>
          <tr><th>Milestone</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Core smart contracts (20)</td><td>Done</td></tr>
          <tr><td>First swap executed</td><td>Done</td></tr>
          <tr><td>veLCLAW locking</td><td>Done</td></tr>
          <tr><td>Frontend (Swap, Pools, Governance, AI Vault)</td><td>Done</td></tr>
          <tr><td>55 automated tests passing</td><td>Done</td></tr>
          <tr><td>Security timelocks (48h AIVault, 24h Gauge)</td><td>Done</td></tr>
          <tr><td>Base Mainnet launch</td><td>Coming soon</td></tr>
        </tbody>
      </table>

      <Callout type="tip" title="Ready to Dive In?">
        Head to <a href="/docs/getting-started">Getting Started</a> to learn how to make your first swap, provide liquidity, or start earning with veLCLAW.
      </Callout>

      <blockquote>
        <p>&quot;Deposit liquidity. Vote with veLCLAW. Let the agents do the rest.&quot;</p>
      </blockquote>
    </DocPage>
  )
}
