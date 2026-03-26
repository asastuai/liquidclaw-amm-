"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Wallet, Gift } from "lucide-react"

interface GaugeStatsProps {
  totalStakedValue: number
  userTotalStaked: number
  pendingRewards: number
}

export function GaugeStats({ totalStakedValue, userTotalStaked, pendingRewards }: GaugeStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Total Staked Value */}
      <Card className="p-5 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Staked Value</p>
            <p className="text-2xl font-bold text-foreground font-mono">
              {formatCurrency(totalStakedValue)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Coins className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
          <span className="text-xs text-muted-foreground">Across all gauges</span>
        </div>
      </Card>

      {/* Your Total Staked */}
      <Card className="p-5 bg-card/80 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-colors group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Your Total Staked</p>
            <p className="text-2xl font-bold text-foreground font-mono">
              {formatCurrency(userTotalStaked)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Wallet className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Active in {3} pools</span>
        </div>
      </Card>

      {/* LCLAW Earned */}
      <Card className="p-5 bg-card/80 backdrop-blur-sm border-border/50 hover:border-chart-3/30 transition-colors group relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">LCLAW Earned</p>
            <p className="text-2xl font-bold text-chart-3 font-mono">
              {formatNumber(pendingRewards)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Gift className="w-5 h-5 text-chart-3" />
          </div>
        </div>
        <div className="mt-3">
          <Button 
            size="sm" 
            className="bg-chart-3 hover:bg-chart-3/90 text-chart-3-foreground rounded-full text-xs px-4"
            disabled={pendingRewards === 0}
          >
            Claim All
          </Button>
        </div>
        {/* Kawaii sparkle */}
        <div className="absolute -top-1 -right-1 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
          ✨
        </div>
      </Card>
    </div>
  )
}
