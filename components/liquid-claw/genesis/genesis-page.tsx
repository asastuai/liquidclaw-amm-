"use client"

import { useState } from "react"
import { useAccount, useChainId, useBalance } from "wagmi"
import { Header } from "../header"
import { Footer } from "../footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Droplets,
  Shield,
  Lock,
  Clock,
  ChevronRight,
  AlertTriangle,
  Check,
  Loader2,
  Vote,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const GENESIS_CONFIG = {
  targetRaise: 50000, // $50K target
  minContribution: 10, // $10 min
  maxContribution: 5000, // $5K max per wallet
  durationDays: 7,
  velclawPerUsdc: 1000, // 1 USDC = 1000 veLCLAW
  lockDuration: "2 years",
  distribution: {
    liquidity: 70,
    treasury: 20,
    operations: 10,
  },
}

const benefits = [
  {
    icon: Vote,
    title: "Governance Power",
    description: "veLCLAW gives you voting rights on emission allocation from day one",
  },
  {
    icon: TrendingUp,
    title: "Fee Revenue",
    description: "Earn 100% of trading fees from pools you vote for — real yield, not inflationary",
  },
  {
    icon: Shield,
    title: "Anti-Dilution",
    description: "Rebases protect your voting share as new LCLAW is emitted",
  },
  {
    icon: Lock,
    title: "Early Advantage",
    description: "First veLCLAW holders get maximum voting power before emissions begin",
  },
]

const faqs = [
  {
    q: "What am I receiving?",
    a: "You receive veLCLAW — locked governance tokens that give you voting power, fee revenue, and bribe earnings. These are locked for 2 years and cannot be transferred.",
  },
  {
    q: "Where do my funds go?",
    a: "70% goes directly to LCLAW/USDC pool liquidity (protocol-owned, permanent). 20% to protocol treasury. 10% to operations.",
  },
  {
    q: "Can I withdraw my contribution?",
    a: "No. This is a one-way contribution. You receive locked veLCLAW in return. Your funds become protocol-owned liquidity.",
  },
  {
    q: "When do emissions start?",
    a: "Emissions begin immediately after the Genesis Event concludes and gauges are activated.",
  },
  {
    q: "Is this available in the US?",
    a: "No. Residents of the United States and OFAC-sanctioned jurisdictions are not eligible to participate.",
  },
]

export function GenesisPage() {
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const { data: ethBalance } = useBalance({ address })
  const [amount, setAmount] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Genesis not yet active — preview mode
  const isActive = false
  const totalRaised = 0
  const participants = 0
  const timeLeft = `${GENESIS_CONFIG.durationDays} days`
  const progress = (totalRaised / GENESIS_CONFIG.targetRaise) * 100

  const velclawAmount = parseFloat(amount || "0") * GENESIS_CONFIG.velclawPerUsdc

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-0 px-4 py-1.5">
              <Droplets className="w-4 h-4 mr-2" />
              Liquidity Genesis Event
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Bootstrap the <span className="text-primary">Deep End</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contribute liquidity to launch LiquidClaw. Receive locked veLCLAW with
              governance power, fee revenue, and early-mover advantage.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left — Stats & Contribute */}
            <div className="lg:col-span-2 space-y-6">

              {/* Progress Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Genesis Progress</h2>
                    {!isActive && (
                      <Badge variant="outline" className="text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    )}
                    {isActive && (
                      <Badge className="bg-green-500/10 text-green-500 border-0">
                        Live
                      </Badge>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-3 bg-muted rounded-full mb-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${totalRaised.toLocaleString()} raised
                    </span>
                    <span className="text-foreground font-medium">
                      ${GENESIS_CONFIG.targetRaise.toLocaleString()} target
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{participants}</p>
                      <p className="text-xs text-muted-foreground">Participants</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{timeLeft}</p>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{GENESIS_CONFIG.lockDuration}</p>
                      <p className="text-xs text-muted-foreground">Lock Period</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contribute Card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Contribute</h2>

                  {!isConnected ? (
                    <div className="text-center py-8">
                      <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground mb-4">Connect your wallet to participate</p>
                      <ConnectButton />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Amount input */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-foreground">Amount (USDC)</label>
                          <span className="text-xs text-muted-foreground">
                            Min ${GENESIS_CONFIG.minContribution} — Max ${GENESIS_CONFIG.maxContribution.toLocaleString()}
                          </span>
                        </div>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={!isActive}
                            className="text-lg h-12 pr-16"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                            USDC
                          </span>
                        </div>
                      </div>

                      {/* You receive */}
                      {velclawAmount > 0 && (
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">You will receive</span>
                            <div className="text-right">
                              <p className="text-lg font-bold text-foreground">{velclawAmount.toLocaleString()} veLCLAW</p>
                              <p className="text-xs text-muted-foreground">Locked for {GENESIS_CONFIG.lockDuration}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Fund allocation */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <p className="text-xs font-medium text-muted-foreground mb-3">Your contribution goes to:</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Protocol Liquidity (LCLAW/USDC pool)</span>
                            <span className="font-medium text-foreground">{GENESIS_CONFIG.distribution.liquidity}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Protocol Treasury</span>
                            <span className="font-medium text-foreground">{GENESIS_CONFIG.distribution.treasury}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Operations</span>
                            <span className="font-medium text-foreground">{GENESIS_CONFIG.distribution.operations}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Disclaimer checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-border"
                        />
                        <span className="text-xs text-muted-foreground leading-relaxed">
                          I understand this is a liquidity contribution to the LiquidClaw protocol. I am not purchasing securities.
                          I am receiving locked governance tokens (veLCLAW) in exchange for providing initial protocol liquidity.
                          These tokens are locked and non-transferable for 2 years. I am not a resident of the United States or any
                          OFAC-sanctioned jurisdiction. I accept all associated risks.
                        </span>
                      </label>

                      {/* Submit button */}
                      <Button
                        disabled={!isActive || !agreed || !amount || parseFloat(amount) < GENESIS_CONFIG.minContribution}
                        className="w-full h-12 rounded-xl text-base font-semibold"
                      >
                        {!isActive ? (
                          <>
                            <Clock className="w-4 h-4 mr-2" />
                            Genesis Event Starting Soon
                          </>
                        ) : (
                          <>
                            <Droplets className="w-4 h-4 mr-2" />
                            Contribute & Receive veLCLAW
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">

              {/* Benefits */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">What You Get</h3>
                  <div className="space-y-4">
                    {benefits.map((b) => (
                      <div key={b.title} className="flex gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <b.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{b.title}</p>
                          <p className="text-xs text-muted-foreground">{b.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Security</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">70% locked as protocol-owned liquidity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">veLCLAW locked for 2 years on-chain</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">Smart contracts verified on BaseScan</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">No admin keys — permissionless protocol</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Distribution visual */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Fund Allocation</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Liquidity</span>
                        <span className="font-medium text-foreground">{GENESIS_CONFIG.distribution.liquidity}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${GENESIS_CONFIG.distribution.liquidity}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Treasury</span>
                        <span className="font-medium text-foreground">{GENESIS_CONFIG.distribution.treasury}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${GENESIS_CONFIG.distribution.treasury}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Operations</span>
                        <span className="font-medium text-foreground">{GENESIS_CONFIG.distribution.operations}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-full bg-secondary rounded-full" style={{ width: `${GENESIS_CONFIG.distribution.operations}%` }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-2">
              {faqs.map((faq, i) => (
                <Card key={i} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFaq === i ? "rotate-90" : ""}`} />
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-16 p-6 bg-muted/50 border border-border rounded-2xl">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-2">Legal Disclaimer</p>
                <p>
                  The Liquidity Genesis Event is a liquidity contribution mechanism, not a token sale, security offering, or investment contract.
                  veLCLAW tokens are non-transferable governance tokens locked for 2 years. They represent voting rights within the LiquidClaw
                  protocol and a proportional claim to protocol fee revenue. This is not available to residents of the United States, its
                  territories, or OFAC-sanctioned jurisdictions. Participation involves risk of total loss. Do your own research.
                  By participating, you acknowledge and accept these terms.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
