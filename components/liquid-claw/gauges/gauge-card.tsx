"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Zap, TrendingUp, Clock } from "lucide-react"
import { getTokenIcon } from "@/lib/token-icons"
import type { Gauge } from "./gauge-list"

interface GaugeCardProps {
  gauge: Gauge
}

export function GaugeCard({ gauge }: GaugeCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("")
  const [mode, setMode] = useState<"stake" | "unstake">("stake")

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(2)}`
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${mins}m`
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all overflow-hidden">
        <CollapsibleTrigger asChild>
          <div className="p-4 sm:p-5 cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Pool Info */}
              <div className="flex items-center gap-3 sm:min-w-[200px]">
                {/* Token Avatars */}
                <div className="relative flex -space-x-2">
                  <img src={getTokenIcon(gauge.pair[0])} alt={gauge.pair[0]} className="w-9 h-9 rounded-full ring-2 ring-card z-10 object-cover bg-muted" />
                  <img src={getTokenIcon(gauge.pair[1])} alt={gauge.pair[1]} className="w-9 h-9 rounded-full ring-2 ring-card object-cover bg-muted" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {gauge.pair[0]} / {gauge.pair[1]}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        gauge.type === "Stable" 
                          ? "border-chart-3 text-chart-3" 
                          : "border-chart-4 text-chart-4"
                      }`}
                    >
                      {gauge.type}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">TVL</p>
                  <p className="font-semibold text-foreground font-mono">{formatCurrency(gauge.tvl)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">APR</p>
                  <p className="font-bold text-chart-3 font-mono text-lg">{gauge.apr.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Your Stake</p>
                  <p className="font-semibold text-foreground font-mono">
                    {gauge.userStake > 0 ? formatCurrency(gauge.userStake) : "—"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMode("stake")
                    setIsOpen(true)
                  }}
                >
                  Stake
                </Button>
                {gauge.userStake > 0 && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="rounded-full px-3 border-border/50"
                      onClick={(e) => {
                        e.stopPropagation()
                        setMode("unstake")
                        setIsOpen(true)
                      }}
                    >
                      Unstake
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="rounded-full px-3 border-chart-3/50 text-chart-3 hover:bg-chart-3/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Zap className="w-3.5 h-3.5 mr-1" />
                      {formatNumber(gauge.pendingRewards)}
                    </Button>
                  </>
                )}
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-border/30">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Left: Stake/Unstake Form */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={mode === "stake" ? "default" : "outline"}
                    className={mode === "stake" ? "bg-primary" : ""}
                    onClick={() => setMode("stake")}
                  >
                    Stake
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === "unstake" ? "default" : "outline"}
                    className={mode === "unstake" ? "bg-primary" : ""}
                    onClick={() => setMode("unstake")}
                  >
                    Unstake
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {mode === "stake" ? "Available LP" : "Staked LP"}
                    </span>
                    <span className="font-mono text-foreground">
                      {formatNumber(mode === "stake" ? gauge.userLpBalance : gauge.stakedLp)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="font-mono bg-background/50"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setStakeAmount(
                        String(mode === "stake" ? gauge.userLpBalance : gauge.stakedLp)
                      )}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-full">
                    Approve
                  </Button>
                  <Button className="flex-1 bg-accent hover:bg-accent/90 rounded-full" disabled>
                    {mode === "stake" ? "Stake LP" : "Unstake LP"}
                  </Button>
                </div>
              </div>

              {/* Right: Reward Details */}
              <div className="space-y-3 p-4 rounded-xl bg-background/50 border border-border/30">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-chart-3" />
                  Reward Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LCLAW per epoch</span>
                    <span className="font-mono text-foreground">{formatNumber(gauge.epochRewards)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your share</span>
                    <span className="font-mono text-chart-3">{(gauge.userShare * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Next epoch
                    </span>
                    <span className="font-mono text-foreground">{formatTime(gauge.nextEpoch)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border/30">
                    <span className="text-muted-foreground">Pending rewards</span>
                    <span className="font-mono font-semibold text-chart-3">{formatNumber(gauge.pendingRewards)} LCLAW</span>
                  </div>
                </div>
                {/* Kawaii decoration */}
                <div className="text-right text-xs text-muted-foreground">
                  Keep staking for more rewards!
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
