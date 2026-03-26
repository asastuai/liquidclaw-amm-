import { DocPage } from '@/components/liquid-claw/docs/doc-page'
import { Callout } from '@/components/liquid-claw/docs/doc-content'

export const metadata = {
  title: 'Tokenomics | LiquidClaw Docs',
  description: 'How LCLAW powers the ecosystem — emissions, revenue, and the ve(3,3) flywheel',
}

export default function TokenomicsPage() {
  return (
    <DocPage>
      <h1>Tokenomics</h1>
      <h2 id="how-lclaw-powers">How LCLAW Powers the Ecosystem</h2>

      <p>
        LCLAW is the native token of LiquidClaw. It serves two roles: as a reward for liquidity providers (through emissions) and as a governance token (through veLCLAW locking). The emission model is designed to bootstrap liquidity aggressively in the early weeks, then transition to sustainable long-term emissions.
      </p>

      <h2 id="the-token">The LCLAW Token</h2>
      <table>
        <thead>
          <tr><th>Property</th><th>Detail</th></tr>
        </thead>
        <tbody>
          <tr><td>Name</td><td>LiquidClaw</td></tr>
          <tr><td>Symbol</td><td>LCLAW</td></tr>
          <tr><td>Standard</td><td>ERC-20 + ERC-2612 Permit</td></tr>
          <tr><td>Chain</td><td>Base (Coinbase L2)</td></tr>
          <tr><td>Decimals</td><td>18</td></tr>
        </tbody>
      </table>
      <p>LCLAW has no fixed supply cap. Instead, it follows a dynamic emission schedule that adjusts based on the protocol&apos;s lifecycle phase.</p>

      <h2 id="emission-schedule">Emission Schedule</h2>

      <h3 id="phase-1-growth">Phase 1: Growth (Epochs 0–14)</h3>
      <p><strong>Starting emission:</strong> 10,000,000 LCLAW per week</p>
      <p>
        During the growth phase, weekly emissions increase by 3% each epoch. This front-loads incentives to bootstrap liquidity when it matters most — during the first weeks after launch. By the end of the growth phase (week 14), weekly emissions reach approximately 15.1M LCLAW.
      </p>

      <h3 id="phase-2-decay">Phase 2: Decay (Epochs 15+)</h3>
      <p>
        Once the growth phase ends, emissions decrease by 1% per week. This gradual reduction prevents runaway inflation while maintaining meaningful incentives for liquidity providers.
      </p>

      <h3 id="phase-3-tail">Phase 3: Tail Emission</h3>
      <p>
        When weekly emissions drop below approximately 8.97M LCLAW, the protocol switches to a tail emission rate of <strong>0.67% of circulating supply per week</strong>. This ensures there are always some incentives flowing, even in the long term.
      </p>

      <Callout type="info" title="Why This Design?">
        The growth → decay → tail model solves the &quot;death spiral&quot; problem: aggressive early emissions attract users, controlled decay reduces sell pressure, and sustainable tail emissions keep the protocol alive forever.
      </Callout>

      <h2 id="protocol-allocations">Protocol Allocations</h2>
      <p>17% of all emissions are allocated to sustain and grow the protocol, split into two transparent categories:</p>

      <h3 id="team-allocation">Team — 5% of Emissions</h3>
      <table>
        <thead>
          <tr><th>Component</th><th>Detail</th></tr>
        </thead>
        <tbody>
          <tr><td>Rate</td><td>5% of all weekly emissions</td></tr>
          <tr><td>Liquid (50%)</td><td>Available for operations, salaries, infrastructure</td></tr>
          <tr><td>Locked (50%)</td><td>Locked as veLCLAW for 2 years — earns by voting, aligned with protocol</td></tr>
        </tbody>
      </table>

      <h3 id="ecosystem-growth">Ecosystem Growth — 12% of Emissions</h3>
      <table>
        <thead>
          <tr><th>Component</th><th>Detail</th></tr>
        </thead>
        <tbody>
          <tr><td>Rate</td><td>12% of all weekly emissions</td></tr>
          <tr><td>Liquid (50%)</td><td>Marketing campaigns, KOL partnerships, bounties, grants, community incentives</td></tr>
          <tr><td>Partnerships (50%)</td><td>Strategic partners choose their preferred structure (see below)</td></tr>
        </tbody>
      </table>

      <h3 id="partner-options">Partnership Incentive Options</h3>
      <p>Strategic partners can choose how they receive their allocation:</p>
      <table>
        <thead>
          <tr><th>Option</th><th>Structure</th><th>Benefits</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Monthly Vesting</strong></td>
            <td>Linear unlock over 24 months (~4.17%/month)</td>
            <td>Liquid LCLAW, flexibility to sell or hold</td>
          </tr>
          <tr>
            <td><strong>Full Commit (veLCLAW)</strong></td>
            <td>100% locked as veLCLAW for 2 years</td>
            <td>Boosted APR, 100% of trading fees from voted pools, bribe earnings, anti-dilution rebases, maximum governance power</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="Why Commit?">
        Partners who lock as veLCLAW earn real yield on top of their allocation — trading fees, bribes, and rebases. The longer the commitment, the higher the rewards. Monthly vesting gives flexibility; full commit gives maximum APR.
      </Callout>

      <Callout type="info" title="Why 17% Total?">
        A protocol without growth budget dies. The team allocation is 50/50 liquid/locked to ensure alignment. The ecosystem fund gives partners a choice — flexibility or yield — making LiquidClaw attractive for integrations while keeping incentives sustainable.
      </Callout>

      <h2 id="revenue-model">Revenue Model</h2>
      <table>
        <thead>
          <tr><th>Source</th><th>Detail</th></tr>
        </thead>
        <tbody>
          <tr><td>Swap fees</td><td>0.30% for volatile pools, 0.05% for stable pools</td></tr>
          <tr><td>Fee distribution</td><td>100% of fees go to veLCLAW voters</td></tr>
          <tr><td>Protocol fee</td><td>2% of swap fees to the treasury (for operations)</td></tr>
          <tr><td>Bribe marketplace</td><td>Projects deposit bribes to attract votes for their pools</td></tr>
        </tbody>
      </table>
      <p>The model is straightforward: projects need liquidity for their tokens. They pay bribes to attract emissions. Voters earn bribes + fees. LPs earn LCLAW rewards. Everyone wins.</p>

      <h2 id="velclaw-governance">veLCLAW — The Governance Layer</h2>
      <table>
        <thead>
          <tr><th>Lock Duration</th><th>Voting Power</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>1 month</td><td>~0.02 per LCLAW</td><td>Minimal commitment</td></tr>
          <tr><td>6 months</td><td>~0.25 per LCLAW</td><td>Short-term participation</td></tr>
          <tr><td>1 year</td><td>~0.50 per LCLAW</td><td>Serious governance</td></tr>
          <tr><td>2 years</td><td>1.00 per LCLAW</td><td>Maximum power, maximum alignment</td></tr>
        </tbody>
      </table>

      <h3 id="what-velclaw-earns">What veLCLAW Earns</h3>
      <ul>
        <li><strong>100% of trading fees</strong> from pools you vote for</li>
        <li><strong>Bribes</strong> offered by projects for your pool votes</li>
        <li><strong>Rebases</strong> — anti-dilution rewards that protect your voting share</li>
      </ul>

      <h2 id="core-pools">Core Pools</h2>

      <h3>Live at Launch — Stablecoins &amp; Blue Chips</h3>
      <table>
        <thead><tr><th>Pool</th><th>Type</th><th>Fee</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>USDC / USDT</td><td>Stable</td><td>0.05%</td><td>Deployed</td></tr>
          <tr><td>ETH / USDC</td><td>Volatile</td><td>0.30%</td><td>Deployed</td></tr>
        </tbody>
      </table>

      <h3>Phase 2 — After Token Launch</h3>
      <table>
        <thead><tr><th>Pool</th><th>Type</th><th>Fee</th></tr></thead>
        <tbody>
          <tr><td>LCLAW / WETH</td><td>Volatile</td><td>0.30%</td></tr>
          <tr><td>LCLAW / USDC</td><td>Stable</td><td>0.05%</td></tr>
          <tr><td>VIRTUAL / WETH</td><td>Volatile</td><td>0.30%</td></tr>
        </tbody>
      </table>

      <h3>Phase 3 — Ecosystem Expansion</h3>
      <table>
        <thead><tr><th>Pool</th><th>Type</th><th>Fee</th></tr></thead>
        <tbody>
          <tr><td>AI agent tokens / WETH</td><td>Volatile</td><td>0.30%</td></tr>
          <tr><td>Partner tokens / USDC</td><td>Volatile</td><td>0.30%</td></tr>
          <tr><td>Trending tokens</td><td>Volatile</td><td>0.30%</td></tr>
        </tbody>
      </table>
      <p>New pools are added as the ecosystem grows. LiquidClaw is permissionless — anyone can create a pool for any token pair on Base.</p>

      <h2 id="the-flywheel-in-numbers">The Flywheel in Numbers</h2>
      <ol>
        <li><strong>New agent token launches</strong> on Virtuals or Clanker</li>
        <li><strong>LiquidClaw creates a pool</strong> within hours</li>
        <li><strong>Project offers bribes</strong> to attract votes to their pool</li>
        <li><strong>veLCLAW voters</strong> direct emissions to the pool, earning bribes + fees</li>
        <li><strong>LPs stake</strong> in the pool&apos;s gauge, earning LCLAW rewards</li>
        <li><strong>Liquidity deepens</strong>, trading volume increases, fees grow</li>
        <li><strong>The agent itself</strong> talks about the deep liquidity on LiquidClaw, bringing more users</li>
        <li><strong>More LCLAW gets locked</strong>, strengthening the flywheel</li>
      </ol>

      <Callout type="tip" title="Compounding Network Effects">
        This cycle repeats with every new agent token, creating compounding network effects that strengthen the entire ecosystem.
      </Callout>
    </DocPage>
  )
}
