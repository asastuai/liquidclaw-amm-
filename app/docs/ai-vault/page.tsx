import { DocPage } from '@/components/liquid-claw/docs/doc-page'
import { Callout, CodeBlock } from '@/components/liquid-claw/docs/doc-content'

export const metadata = {
  title: 'The AI Vault | LiquidClaw Docs',
  description: 'Let AI optimize your yield — deposit veLCLAW and earn automatically',
}

export default function AIVaultPage() {
  return (
    <DocPage>
      <h1>The AI Vault</h1>
      <h2 id="let-ai-optimize">Let AI Optimize Your Yield</h2>

      <p>
        The AI Vault is LiquidClaw&apos;s breakthrough feature: a smart contract where you deposit your veLCLAW NFT and an AI agent votes on your behalf every epoch, optimizing for maximum yield. You keep full custody. The AI can only vote — never transfer, sell, or merge your NFT.
      </p>

      <h2 id="why-use-it">Why Use the AI Vault?</h2>
      <p>Voting optimally on a ve(3,3) protocol is complex. Every epoch, you need to:</p>
      <ul>
        <li>Analyze trading volumes across all pools</li>
        <li>Compare bribe offers and calculate bribe-per-vote ratios</li>
        <li>Factor in fee projections and APR estimates</li>
        <li>Rebalance your vote allocation to maximize total returns</li>
        <li>Claim rewards before the epoch resets</li>
      </ul>
      <p>
        The AI Vault solves this. A specialized AI agent does the analysis continuously, voting with surgical precision to maximize your fee + bribe income.
      </p>

      <h2 id="how-it-works">How It Works</h2>

      <h3 id="depositing">Depositing</h3>
      <ol>
        <li>Go to the <strong>AI Vault</strong> page</li>
        <li>Select the veLCLAW NFT you want to deposit</li>
        <li>Click <strong>Deposit</strong> and approve the transfer</li>
        <li>Done — the AI starts managing your votes from the next epoch</li>
      </ol>

      <h3 id="each-epoch">What Happens Each Epoch</h3>
      <ol>
        <li>The AI operator analyzes all pool data: volumes, fees, bribe offers, liquidity depth</li>
        <li>It calculates the optimal vote allocation across all pools</li>
        <li>It calls <code>voteBatch()</code> on the AIVault contract, voting with all deposited NFTs</li>
        <li>Rewards (fees + bribes) flow directly to your wallet — not to the vault, not to the operator</li>
      </ol>

      <h3 id="withdrawing">Withdrawing</h3>
      <ul>
        <li><strong>Standard withdraw:</strong> Call <code>withdraw()</code> — your NFT returns to your wallet</li>
        <li><strong>Emergency withdraw:</strong> Call <code>emergencyWithdraw()</code> — works even if the vault is paused. Always available, no exceptions.</li>
      </ul>

      <h2 id="security">Security Guarantees</h2>
      <Callout type="info" title="Trust, but verify — and always have an exit.">
        The AI Vault is designed with security as the top priority.
      </Callout>

      <table>
        <thead>
          <tr><th>Security Feature</th><th>What It Means</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Non-custodial</strong></td><td>You can withdraw your NFT at any time. The vault never &quot;owns&quot; it.</td></tr>
          <tr><td><strong>Vote-only permissions</strong></td><td>The AI operator can only vote. It cannot transfer, sell, merge, or split your NFT.</td></tr>
          <tr><td><strong>Emergency withdraw</strong></td><td>Works even when the vault is paused. Always available.</td></tr>
          <tr><td><strong>48-hour operator timelock</strong></td><td>If the AI operator is changed, there&apos;s a 48-hour waiting period. No instant takeovers.</td></tr>
          <tr><td><strong>Pausability</strong></td><td>The vault owner can pause deposits and normal operations, but emergency withdraw always works.</td></tr>
          <tr><td><strong>Transparent rewards</strong></td><td>All reward claims are on-chain. You can verify every transaction.</td></tr>
        </tbody>
      </table>

      <h2 id="strategies">AI Strategies</h2>
      <p>
        LiquidClaw features an <strong>AIStrategyRegistry</strong> — a marketplace of competing AI voting strategies:
      </p>
      <table>
        <thead>
          <tr><th>Strategy</th><th>Approach</th><th>Risk Profile</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Yield Maximizer</strong></td><td>Optimizes across all pools for maximum combined fee + bribe revenue</td><td>Balanced</td></tr>
          <tr><td><strong>Liquidity Deepener</strong></td><td>Concentrates votes on core LCLAW pairs to strengthen the ecosystem</td><td>Conservative</td></tr>
          <tr><td><strong>Bribe Hunter</strong></td><td>Targets the highest bribe-per-vote ratio pools aggressively</td><td>Aggressive</td></tr>
        </tbody>
      </table>

      <h2 id="for-builders">For AI Agent Builders</h2>
      <p>Want to build a voting strategy? The AIStrategyRegistry is open:</p>
      <CodeBlock language="solidity">{`registerStrategy(name, description, operatorAddress) → strategyId`}</CodeBlock>
      <p>Your agent needs to:</p>
      <ol>
        <li>Register as a strategy in the AIStrategyRegistry</li>
        <li>Be appointed as an operator on an AIVault instance</li>
        <li>Each epoch: analyze pool data → calculate optimal allocation → call <code>voteBatch()</code></li>
        <li>Trigger reward claims for depositors (<code>claimBribes()</code> + <code>claimFees()</code>)</li>
      </ol>

      <h2 id="faq">Frequently Asked Questions</h2>
      <p><strong>Can the AI steal my veLCLAW?</strong><br />No. The operator can only call vote-related functions. Transfer, merge, split — all blocked at the smart contract level.</p>
      <p><strong>What if the AI makes bad votes?</strong><br />Your worst-case scenario is lower-than-optimal yield for one epoch. You can withdraw anytime and vote manually.</p>
      <p><strong>What if the operator gets hacked?</strong><br />The 48-hour timelock on operator changes means you have two full days to withdraw before any new operator takes control.</p>
      <p><strong>Do I still earn rebases?</strong><br />Yes. Rebase rewards (anti-dilution) are forwarded to your wallet just like fees and bribes.</p>
      <p><strong>Can I see what the AI is voting for?</strong><br />Everything is on-chain. You can check the voting allocation at any time through the contract or the UI.</p>
    </DocPage>
  )
}
