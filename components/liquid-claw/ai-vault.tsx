"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Cpu,
  Shield,
  ArrowRight,
  Loader2,
  Check,
  LogOut,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Lock,
} from "lucide-react"
import { useAccount, useChainId } from "wagmi"
import { getTxUrl } from "@/lib/explorer"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { formatUnits } from "viem"
import {
  useAIVaultStats,
  useVaultDeposits,
  useDepositToVault,
  useWithdrawFromVault,
  useAIStrategies,
} from "@/hooks/use-ai-vault"
import { useUserVeNFTs, type VeNFT } from "@/hooks/use-voting-escrow"
import { useI18n } from "@/lib/i18n"

// Preview strategies shown before deployment
const PREVIEW_STRATEGIES = [
  {
    name: "Yield Maximizer",
    description:
      "Optimizes votes across all pools to maximize fee revenue + bribes. Rebalances weekly based on volume and bribe data.",
    icon: TrendingUp,
    tag: "Popular",
  },
  {
    name: "Liquidity Deepener",
    description:
      "Concentrates votes on core LCLAW pairs to deepen protocol-owned liquidity and reduce slippage for all traders.",
    icon: Sparkles,
    tag: "Protocol",
  },
  {
    name: "Bribe Hunter",
    description:
      "Aggressively targets pools with highest bribe/vote ratios. Higher variance but potentially higher APR.",
    icon: Brain,
    tag: "Aggressive",
  },
]

function DepositableNFTCard({
  nft,
  onDeposit,
  isLoading,
}: {
  nft: VeNFT
  onDeposit: (tokenId: bigint) => void
  isLoading: boolean
}) {
  const lockedFormatted = parseFloat(formatUnits(nft.lockedAmount, 18)).toLocaleString(
    undefined,
    { maximumFractionDigits: 2 }
  )
  const powerFormatted = parseFloat(formatUnits(nft.votingPower, 18)).toLocaleString(
    undefined,
    { maximumFractionDigits: 2 }
  )

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
      <div>
        <span className="text-sm font-mono text-muted-foreground">
          veLCLAW #{nft.tokenId.toString()}
        </span>
        <div className="text-sm text-foreground font-semibold">{lockedFormatted} LCLAW</div>
        <div className="text-xs text-muted-foreground">Power: {powerFormatted}</div>
      </div>
      <Button
        size="sm"
        onClick={() => onDeposit(nft.tokenId)}
        disabled={isLoading}
        className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Deposit <ArrowRight className="w-3 h-3 ml-1" />
          </>
        )}
      </Button>
    </div>
  )
}

function VaultDepositCard({
  tokenId,
  votingPower,
  lockedAmount,
  onWithdraw,
  isWithdrawing,
}: {
  tokenId: bigint
  votingPower: bigint
  lockedAmount: bigint
  onWithdraw: (tokenId: bigint) => void
  isWithdrawing: boolean
}) {
  const lockedFormatted = parseFloat(formatUnits(lockedAmount, 18)).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
  const powerFormatted = parseFloat(formatUnits(votingPower, 18)).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })

  return (
    <div className="flex items-center justify-between p-4 bg-accent/5 rounded-xl border border-accent/20">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-muted-foreground">
            veLCLAW #{tokenId.toString()}
          </span>
          <Badge className="bg-accent/10 text-accent border-0 text-xs">
            <Brain className="w-3 h-3 mr-1" />
            AI Managed
          </Badge>
        </div>
        <div className="text-sm text-foreground font-semibold">{lockedFormatted} LCLAW</div>
        <div className="text-xs text-muted-foreground">Power: {powerFormatted}</div>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onWithdraw(tokenId)}
        disabled={isWithdrawing}
        className="rounded-lg"
      >
        {isWithdrawing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <LogOut className="w-3 h-3 mr-1" />
            Withdraw
          </>
        )}
      </Button>
    </div>
  )
}

export function AIVault() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { totalDeposited } = useAIVaultStats()
  const { veNFTs } = useUserVeNFTs()
  const { deposits, totalPower, refetchIds } = useVaultDeposits()
  const { strategies } = useAIStrategies()
  const [depositingId, setDepositingId] = useState<bigint | null>(null)

  const {
    approveForVault,
    isApproving,
    approveConfirmed,
    deposit,
    isDepositing,
    depositConfirmed,
    depositHash,
  } = useDepositToVault()

  const { withdraw, isWithdrawing, withdrawConfirmed, withdrawHash } =
    useWithdrawFromVault()

  // Filter out veNFTs already in vault
  const depositedIdSet = new Set(deposits.map((d) => d.tokenId.toString()))
  const availableNFTs = veNFTs.filter((nft) => !depositedIdSet.has(nft.tokenId.toString()))

  const handleDeposit = (tokenId: bigint) => {
    setDepositingId(tokenId)
    approveForVault(tokenId)
  }

  // Chain: approve → deposit
  if (approveConfirmed && depositingId && !isDepositing && !depositConfirmed) {
    deposit(depositingId)
  }

  const showPreview = strategies.length === 0

  return (
    <section className="min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            AI-Powered Voting
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Let AI Maximize Your <span className="text-primary">veLCLAW</span> Yield
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deposit your veLCLAW into the AI Vault. Our optimization engine analyzes bribes,
            fees, and volumes to vote optimally every epoch — so you earn more, hands-free.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Card className="bg-card border-border text-center">
            <CardContent className="p-5">
              <div className="text-2xl font-bold text-foreground">{totalDeposited}</div>
              <div className="text-sm text-muted-foreground">veNFTs in Vault</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border text-center">
            <CardContent className="p-5">
              <div className="text-2xl font-bold text-foreground">
                {parseFloat(formatUnits(totalPower, 18)).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-sm text-muted-foreground">Your AI Voting Power</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border text-center">
            <CardContent className="p-5">
              <div className="text-2xl font-bold text-primary">
                {showPreview ? "3" : strategies.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Strategies</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Strategies */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" />
              AI Strategies
            </h3>

            {showPreview ? (
              <div className="space-y-3">
                {PREVIEW_STRATEGIES.map((s, i) => (
                  <Card key={i} className="bg-card border-border hover:border-accent/30 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            <s.icon className="w-4 h-4 text-accent" />
                          </div>
                          <h4 className="font-semibold text-foreground">{s.name}</h4>
                        </div>
                        <Badge className="bg-accent/10 text-accent border-0 text-xs">
                          {s.tag}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {strategies.map((s) => (
                  <Card
                    key={s.id.toString()}
                    className="bg-card border-border hover:border-accent/30 transition-colors"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{s.name}</h4>
                        <Badge className="bg-green-500/10 text-green-500 border-0 text-xs">
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{s.description}</p>
                      <span className="text-xs font-mono text-muted-foreground">
                        Operator: {s.operator.slice(0, 6)}...{s.operator.slice(-4)}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Security note */}
            <div className="mt-4 flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
              <Shield className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Non-Custodial</h4>
                <p className="text-xs text-muted-foreground">
                  You can withdraw your veLCLAW at any time — even if the vault is paused.
                  The AI can only vote, never transfer your NFT.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Deposit/Withdraw */}
          <div>
            {!isConnected ? (
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-8 text-center">
                  <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Connect to Use AI Vault
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect your wallet to deposit veLCLAW and let AI optimize your votes.
                  </p>
                  <div className="inline-block">
                    <ConnectButton />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Deposited in vault */}
                {deposits.length > 0 && (
                  <Card className="bg-card border-border shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Brain className="w-4 h-4 text-accent" />
                        In AI Vault ({deposits.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {deposits.map((d) => (
                        <VaultDepositCard
                          key={d.tokenId.toString()}
                          tokenId={d.tokenId}
                          votingPower={d.votingPower}
                          lockedAmount={d.lockedAmount}
                          onWithdraw={withdraw}
                          isWithdrawing={isWithdrawing}
                        />
                      ))}
                      {withdrawHash && (
                        <a
                          href={getTxUrl(chainId, withdrawHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:underline block text-center"
                        >
                          View withdrawal on BaseScan
                        </a>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Available to deposit */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary" />
                      Available veLCLAW ({availableNFTs.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {availableNFTs.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-sm text-muted-foreground mb-1">
                          No veLCLAW available to deposit
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lock LCLAW in the governance section first.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {availableNFTs.map((nft) => (
                          <DepositableNFTCard
                            key={nft.tokenId.toString()}
                            nft={nft}
                            onDeposit={handleDeposit}
                            isLoading={
                              depositingId === nft.tokenId &&
                              (isApproving || isDepositing)
                            }
                          />
                        ))}
                      </div>
                    )}

                    {depositConfirmed && (
                      <div className="mt-3 text-center">
                        <div className="flex items-center justify-center gap-2 text-green-500 text-sm mb-1">
                          <Check className="w-4 h-4" />
                          Deposited successfully!
                        </div>
                        {depositHash && (
                          <a
                            href={getTxUrl(chainId, depositHash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:underline"
                          >
                            View on BaseScan
                          </a>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
