import { DocPage } from '@/components/liquid-claw/docs/doc-page'
import { Callout } from '@/components/liquid-claw/docs/doc-content'

export const metadata = {
  title: 'Getting Started | LiquidClaw Docs',
  description: 'Your first steps on LiquidClaw — connect wallet, swap, provide liquidity',
}

export default function GettingStartedPage() {
  return (
    <DocPage>
      <h1>Getting Started</h1>
      <h2 id="your-first-steps">Your First Steps on LiquidClaw</h2>

      <p>
        This guide walks you through the basics: connecting your wallet, making your first swap, and providing liquidity. Everything runs on Base (Coinbase&apos;s L2), so gas fees are just a few cents.
      </p>

      <h2 id="connecting-your-wallet">Connecting Your Wallet</h2>
      <ol>
        <li>Visit the LiquidClaw app</li>
        <li>Click <strong>Connect Wallet</strong> in the top right</li>
        <li>Choose your wallet (MetaMask, Coinbase Wallet, Rainbow, or any WalletConnect-compatible wallet)</li>
        <li>Make sure you&apos;re connected to <strong>Base</strong> network</li>
      </ol>
      <p>
        If you don&apos;t have Base set up, your wallet should prompt you to add it automatically. Base uses ETH for gas — you&apos;ll need a small amount to get started.
      </p>

      <h2 id="making-a-swap">Making a Swap</h2>
      <p>Swapping tokens on LiquidClaw works like any DEX, but with a twist: our router finds the best path across all pools automatically, even if there&apos;s no direct pair.</p>

      <h3 id="step-by-step">Step by Step</h3>
      <ol>
        <li>Go to the <strong>Swap</strong> page</li>
        <li>Select the token you want to sell (top field)</li>
        <li>Select the token you want to buy (bottom field)</li>
        <li>Enter the amount</li>
        <li>Review the quote — you&apos;ll see the exchange rate, price impact, and fee</li>
        <li>Click <strong>Swap</strong> and confirm in your wallet</li>
      </ol>

      <h3 id="behind-the-scenes">What Happens Behind the Scenes</h3>
      <p>
        The Router contract checks all available pools and finds the optimal path. If there&apos;s no direct VIRTUAL/LCLAW pool, it might route through VIRTUAL → WETH → LCLAW automatically. You always get the best available price.
      </p>

      <h3 id="things-to-know">Things to Know</h3>
      <ul>
        <li><strong>Slippage tolerance:</strong> Set this in settings. Default is 0.5% — increase it for volatile tokens.</li>
        <li><strong>Deadline:</strong> Transactions expire after the deadline to protect you from stale prices.</li>
        <li><strong>Fee-on-transfer tokens:</strong> Fully supported. The router handles the tax automatically.</li>
      </ul>

      <h2 id="providing-liquidity">Providing Liquidity</h2>
      <p>When you provide liquidity, you deposit a pair of tokens into a pool. In return, you receive LP (Liquidity Provider) tokens that represent your share of the pool.</p>

      <h3 id="choosing-a-pool">Choosing a Pool</h3>
      <table>
        <thead>
          <tr><th>Pool Type</th><th>Best For</th><th>Curve</th><th>Default Fee</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Volatile</strong></td><td>Regular pairs (LCLAW/WETH, VIRTUAL/WETH)</td><td>x * y = k</td><td>0.30%</td></tr>
          <tr><td><strong>Stable</strong></td><td>Pegged assets (USDC/USDT, stETH/ETH)</td><td>x3y + y3x = k</td><td>0.05%</td></tr>
        </tbody>
      </table>
      <p>The stable curve gives 100–1000x better price execution for correlated assets. Choose the right pool type for your pair.</p>

      <h3 id="adding-liquidity">Adding Liquidity</h3>
      <ol>
        <li>Go to the <strong>Pools</strong> page</li>
        <li>Find the pool you want (or create a new one — it&apos;s permissionless!)</li>
        <li>Click <strong>Add Liquidity</strong></li>
        <li>Enter the amount for one token — the other adjusts automatically based on the current ratio</li>
        <li>Review and confirm</li>
      </ol>

      <h3 id="removing-liquidity">Removing Liquidity</h3>
      <ol>
        <li>Go to your pool position</li>
        <li>Click <strong>Remove Liquidity</strong></li>
        <li>Choose how much to withdraw (25%, 50%, 75%, or 100%)</li>
        <li>Confirm — you receive both tokens back</li>
      </ol>

      <h2 id="staking-in-gauges">Staking in Gauges</h2>
      <p>After adding liquidity, stake your LP tokens in the pool&apos;s <strong>Gauge</strong> to start earning LCLAW emission rewards.</p>
      <ol>
        <li>Go to your pool position</li>
        <li>Click <strong>Stake</strong></li>
        <li>Approve and stake your LP tokens</li>
        <li>LCLAW rewards start accruing immediately</li>
      </ol>
      <p>Rewards are distributed every epoch (1 week). You can claim anytime. The amount you earn depends on how much LCLAW emissions are directed to your pool by veLCLAW voters.</p>

      <h2 id="creating-a-new-pool">Creating a New Pool</h2>
      <p>Anyone can create a pool on LiquidClaw — no permission needed.</p>
      <ol>
        <li>Go to <strong>Pools</strong> → <strong>Create Pool</strong></li>
        <li>Select your two tokens</li>
        <li>Choose the pool type (volatile or stable)</li>
        <li>Add initial liquidity</li>
      </ol>
      <p>Once a pool exists, it can receive a Gauge (which enables LCLAW emission rewards). Gauges are created through governance — veLCLAW voters decide which pools get rewarded.</p>

      <h2 id="quick-tips">Quick Tips</h2>
      <ul>
        <li><strong>Gas on Base is cheap</strong> — transactions typically cost less than $0.01</li>
        <li><strong>Always check price impact</strong> before large swaps. Low liquidity pools can have high slippage.</li>
        <li><strong>Stake your LP tokens</strong> — unstaked LP earns trading fees but misses out on LCLAW emission rewards</li>
        <li><strong>MEV protection</strong> — all functions include deadline parameters to protect your transactions</li>
      </ul>

      <Callout type="tip" title="Next Steps">
        Now that you know the basics, learn about the <a href="/docs/governance">governance system</a>. Lock your LCLAW, get veLCLAW, and start earning fees + bribes by voting on pools. Or skip the manual work and let the <a href="/docs/ai-vault">AI Vault</a> handle it.
      </Callout>
    </DocPage>
  )
}
