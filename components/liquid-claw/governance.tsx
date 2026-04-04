"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Lock,
  Vote,
  Gift,
  Loader2,
  Check,
  Clock,
  Infinity,
  ChevronRight,
} from "lucide-react"
import { useAccount, useChainId } from "wagmi"
import { getTxUrl } from "@/lib/explorer"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { formatUnits } from "viem"
import { useI18n } from "@/lib/i18n"
import {
  useUserVeNFTs,
  useCreateLock,
  type VeNFT,
} from "@/hooks/use-voting-escrow"

const LOCK_OPTIONS = [
  { label: "1 month", weeks: 4 },
  { label: "3 months", weeks: 13 },
  { label: "6 months", weeks: 26 },
  { label: "1 year", weeks: 52 },
  { label: "2 years", weeks: 104 },
]

function VeNFTCard({ nft }: { nft: VeNFT }) {
  const lockEndDate = new Date(Number(nft.lockEnd) * 1000)
  const isExpired = lockEndDate.getTime() < Date.now() && !nft.isPermanent
  const lockedFormatted = parseFloat(formatUnits(nft.lockedAmount, 18)).toLocaleString(
    undefined,
    { maximumFractionDigits: 2 }
  )
  const powerFormatted = parseFloat(formatUnits(nft.votingPower, 18)).toLocaleString(
    undefined,
    { maximumFractionDigits: 2 }
  )

  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-mono text-muted-foreground">
            veLCLAW #{nft.tokenId.toString()}
          </span>
          {nft.isPermanent ? (
            <Badge className="bg-primary/10 text-primary border-0">
              <Infinity className="w-3 h-3 mr-1" />
              Permanent
            </Badge>
          ) : isExpired ? (
            <Badge className="bg-destructive/10 text-destructive border-0">Expired</Badge>
          ) : (
            <Badge className="bg-secondary/50 text-secondary-foreground border-0">
              <Clock className="w-3 h-3 mr-1" />
              Active
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Locked</span>
            <span className="text-sm font-semibold text-foreground">
              {lockedFormatted} LCLAW
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Voting Power</span>
            <span className="text-sm font-semibold text-primary">{powerFormatted}</span>
          </div>
          {!nft.isPermanent && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Unlocks</span>
              <span className="text-sm text-foreground">
                {lockEndDate.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CreateLockForm() {
  const chainId = useChainId()
  const [amount, setAmount] = useState("")
  const [selectedWeeks, setSelectedWeeks] = useState(52)

  const {
    lclawBalance,
    needsApproval,
    approveLclaw,
    isApproving,
    createLock,
    isLocking,
    lockConfirmed,
    lockHash,
  } = useCreateLock()

  const handleMax = () => setAmount(lclawBalance)

  const handleLock = () => {
    if (needsApproval(amount)) {
      approveLclaw()
    } else {
      createLock(amount, selectedWeeks)
    }
  }

  const isValid = amount && parseFloat(amount) > 0 && parseFloat(amount) <= parseFloat(lclawBalance)

  // Estimate voting power (linear: max at 2 years)
  const estimatedPower =
    amount && parseFloat(amount) > 0
      ? ((parseFloat(amount) * selectedWeeks) / 104).toFixed(2)
      : "0"

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lock className="w-5 h-5 text-primary" />
          Lock LCLAW → veLCLAW
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Amount input */}
        <div className="bg-muted/50 rounded-2xl p-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Amount to lock</span>
            <button onClick={handleMax} className="hover:text-foreground transition-colors">
              Balance: {parseFloat(lclawBalance).toFixed(2)} LCLAW
              <span className="ml-1 text-primary font-medium">MAX</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-0 bg-transparent text-2xl font-semibold p-0 focus-visible:ring-0"
            />
            <span className="flex items-center gap-2 bg-background rounded-full px-4 py-2 shrink-0">
              <img src="/images/lobster-mascot.jpg" alt="LCLAW" className="w-6 h-6 rounded-full object-cover" />
              <span className="font-semibold text-sm">LCLAW</span>
            </span>
          </div>
        </div>

        {/* Lock duration */}
        <div>
          <span className="text-sm font-medium text-foreground mb-2 block">
            Lock Duration
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {LOCK_OPTIONS.map((opt) => (
              <button
                key={opt.weeks}
                onClick={() => setSelectedWeeks(opt.weeks)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedWeeks === opt.weeks
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Estimated output */}
        {amount && parseFloat(amount) > 0 && (
          <div className="bg-accent/5 rounded-xl p-3 text-sm space-y-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated veLCLAW power</span>
              <span className="text-primary font-semibold">{estimatedPower}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Lock duration</span>
              <span>{selectedWeeks} weeks</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Power decays to</span>
              <span>0 at unlock</span>
            </div>
          </div>
        )}

        {/* Action button */}
        {lockConfirmed ? (
          <Button
            disabled
            className="w-full rounded-xl h-12 bg-green-600 hover:bg-green-600 text-white"
          >
            <Check className="w-4 h-4 mr-2" />
            Lock Created!
          </Button>
        ) : (
          <Button
            onClick={handleLock}
            disabled={!isValid || isApproving || isLocking}
            className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {(isApproving || isLocking) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {needsApproval(amount)
              ? "Approve LCLAW"
              : isLocking
              ? "Creating Lock..."
              : `Lock for ${LOCK_OPTIONS.find((o) => o.weeks === selectedWeeks)?.label}`}
          </Button>
        )}

        {lockHash && (
          <div className="text-center">
            <a
              href={getTxUrl(chainId, lockHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              View on BaseScan
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function Governance() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { veNFTs, count, isLoading } = useUserVeNFTs()

  return (
    <section className="min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Vote className="w-4 h-4" />
            ve(3,3) Governance
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Lock, Vote, <span className="text-primary">Earn</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lock your LCLAW tokens to receive veLCLAW — a vote-escrowed NFT that gives you
            governance power, trading fee revenue, and bribe rewards.
          </p>
        </div>

        {/* How it works cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-border text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">1. Lock LCLAW</h3>
              <p className="text-sm text-muted-foreground">
                Lock your LCLAW for up to 2 years. Longer locks = more voting power.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Vote className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">2. Vote on Pools</h3>
              <p className="text-sm text-muted-foreground">
                Direct LCLAW emissions to your favorite pools each epoch. Earn bribes from
                protocols.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">3. Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Collect 100% of trading fees + bribes + rebase anti-dilution every epoch.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Lock Form */}
          <div>
            {isConnected ? (
              <CreateLockForm />
            ) : (
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-8 text-center">
                  <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Connect to Lock
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect your wallet to lock LCLAW and start earning.
                  </p>
                  <div className="inline-block">
                    <ConnectButton />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* User's veLCLAW NFTs */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              Your veLCLAW Positions
              {count > 0 && (
                <Badge className="bg-primary/10 text-primary border-0">{count}</Badge>
              )}
            </h3>

            {!isConnected && (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center text-muted-foreground">
                  Connect wallet to view your positions
                </CardContent>
              </Card>
            )}

            {isConnected && isLoading && (
              <div className="flex items-center justify-center gap-2 py-12">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-muted-foreground">Loading positions...</span>
              </div>
            )}

            {isConnected && !isLoading && veNFTs.length === 0 && (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-2">No veLCLAW positions yet</p>
                  <p className="text-sm text-muted-foreground">
                    Lock LCLAW to get started with governance and earning rewards.
                  </p>
                </CardContent>
              </Card>
            )}

            {veNFTs.length > 0 && (
              <div className="space-y-3">
                {veNFTs.map((nft) => (
                  <VeNFTCard key={nft.tokenId.toString()} nft={nft} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
