import { DocPage } from '@/components/liquid-claw/docs/doc-page'
import { Callout } from '@/components/liquid-claw/docs/doc-content'

export const metadata = {
  title: 'Governance — veLCLAW | LiquidClaw Docs',
  description: 'Own a piece of the protocol — lock LCLAW, vote on pools, earn fees and bribes',
}

export default function GovernancePage() {
  return (
    <DocPage>
      <h1>Governance — veLCLAW</h1>
      <h2 id="own-a-piece">Own a Piece of the Protocol</h2>

      <p>
        LiquidClaw isn&apos;t just a DEX — it&apos;s a protocol governed by its users. When you lock LCLAW tokens, you receive <strong>veLCLAW</strong>, a vote-escrowed NFT that gives you real power: you decide where liquidity incentives flow, and you earn a share of every trade that happens in the pools you support.
      </p>

      <h2 id="how-locking-works">How Locking Works</h2>
      <h3 id="from-lclaw-to-velclaw">From LCLAW to veLCLAW</h3>
      <ol>
        <li>Go to the <strong>Lock</strong> page</li>
        <li>Enter the amount of LCLAW you want to lock</li>
        <li>Choose your lock duration (up to 2 years)</li>
        <li>Confirm — you receive a <strong>veLCLAW NFT</strong></li>
      </ol>
      <p>Your veLCLAW is an ERC-721 NFT. It&apos;s unique, it&apos;s yours, and it represents your governance position.</p>

      <h3 id="voting-power">Voting Power</h3>
      <p>The longer you lock, the more voting power you get:</p>
      <table>
        <thead>
          <tr><th>Lock Duration</th><th>Voting Power per LCLAW</th></tr>
        </thead>
        <tbody>
          <tr><td>1 month</td><td>~0.02 veLCLAW</td></tr>
          <tr><td>6 months</td><td>~0.25 veLCLAW</td></tr>
          <tr><td>1 year</td><td>~0.50 veLCLAW</td></tr>
          <tr><td>2 years (max)</td><td>1.00 veLCLAW</td></tr>
        </tbody>
      </table>
      <p>Your voting power decays linearly as the lock approaches expiry. You can always extend your lock to refresh your voting power.</p>

      <h2 id="what-can-you-do">What Can You Do With veLCLAW?</h2>

      <h3 id="vote-on-pools">Vote on Pools</h3>
      <p>
        Every week (each &quot;epoch&quot;), veLCLAW holders vote on which pools should receive LCLAW emission rewards. The more votes a pool gets, the more LCLAW rewards flow to its liquidity providers.
      </p>
      <p><strong>How to vote:</strong></p>
      <ol>
        <li>Go to <strong>Vote</strong></li>
        <li>Browse available pools (each with its current APR, volume, and bribe offers)</li>
        <li>Allocate your voting power across one or more pools</li>
        <li>Confirm your vote</li>
      </ol>
      <p>Your vote stays active until you change it. At the start of each epoch, emissions are distributed based on the latest vote totals.</p>

      <h3 id="earn-trading-fees">Earn Trading Fees</h3>
      <p>
        <strong>100% of trading fees from the pools you vote for go directly to you.</strong> Not to the protocol treasury, not to LPs — to voters. This is the ve(3,3) model in action.
      </p>
      <p>
        If you vote for the LCLAW/WETH pool and it does $100,000 in volume that week at a 0.30% fee, the $300 in fees gets split proportionally among all voters for that pool.
      </p>

      <h3 id="earn-bribes">Earn Bribes</h3>
      <p>
        External projects can offer <strong>bribes</strong> to incentivize votes toward their pools. If a new AI agent project wants deep liquidity for their token, they deposit bribe tokens into the reward contract for their pool. When you vote for that pool, you earn a share of the bribes proportional to your voting power.
      </p>

      <h2 id="the-flywheel">The ve(3,3) Flywheel Explained</h2>
      <p>This is the engine that makes everything work:</p>
      <p><strong>Lock LCLAW</strong> → Get veLCLAW → <strong>Vote for pools</strong> → Earn fees + bribes</p>
      <p>Meanwhile...</p>
      <p><strong>Emissions flow to voted pools</strong> → LPs earn LCLAW rewards → <strong>Deep liquidity</strong> → More volume → <strong>More fees</strong> → More incentive to lock</p>

      <Callout type="info" title="Proven Model">
        The ve(3,3) model powers over $2 billion in TVL across Aerodrome, Velodrome, and Thena. LiquidClaw brings it to the AI agent economy.
      </Callout>

      <h2 id="managing-velclaw">Managing Your veLCLAW</h2>
      <ul>
        <li><strong>Extend Your Lock:</strong> Extend your lock duration at any time to increase voting power.</li>
        <li><strong>Increase Your Lock Amount:</strong> Add more LCLAW to an existing lock without creating a separate position.</li>
        <li><strong>Claiming Rewards:</strong> Visit the <a href="/rewards">Rewards</a> section to claim trading fees, bribes, and rebases (anti-dilution rewards).</li>
        <li><strong>Delegation:</strong> Delegate your voting power to another address without transferring your NFT. This is how the AI Vault works.</li>
      </ul>

      <h2 id="tips-for-voters">Tips for Voters</h2>
      <ul>
        <li><strong>Vote for pools with high volume</strong> — more volume means more fees for you</li>
        <li><strong>Check the bribe market</strong> — some pools offer generous bribes to attract votes</li>
        <li><strong>Don&apos;t spread too thin</strong> — concentrating votes on fewer pools can be more profitable</li>
        <li><strong>Reset votes before epoch end</strong> — if you want to change your allocation, reset and re-vote before the new epoch starts</li>
        <li><strong>Consider the AI Vault</strong> — if optimizing votes sounds like work, deposit your veLCLAW in the <a href="/docs/ai-vault">AI Vault</a></li>
      </ul>

      <h2 id="why-ai-economy">Why This Matters for the AI Economy</h2>
      <p>
        In the AI agent ecosystem, tokens are everything. An agent&apos;s token is its reputation, its funding mechanism, and its community&apos;s stake. When LiquidClaw voters direct emissions to an agent token&apos;s pool, they&apos;re directly supporting that agent&apos;s ecosystem by deepening its liquidity.
      </p>
      <p>
        AI agents themselves can participate in governance. An agent can lock LCLAW, vote on pools, earn rewards, and even bribe other voters to support its own token. This creates an economy where AI agents are genuine participants in DeFi governance — not just trading bots, but stakeholders.
      </p>
    </DocPage>
  )
}
