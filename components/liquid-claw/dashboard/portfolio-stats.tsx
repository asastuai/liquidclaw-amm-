"use client"

import { Card } from "@/components/ui/card"
import { Wallet, Coins, Vote, AlertCircle } from "lucide-react"

export function PortfolioStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Total Value */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Value</p>
            <p className="text-3xl font-bold text-foreground mt-2">$0.00</p>
          </div>
          <div className="p-2 bg-accent/10 rounded-lg">
            <Wallet className="w-5 h-5 text-accent" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">— (24h)</p>
      </Card>

      {/* LCLAW Balance */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">LCLAW Balance</p>
            <p className="text-3xl font-bold text-foreground mt-2">0</p>
            <p className="text-xs text-muted-foreground mt-1">≈ $0 USD</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Coins className="w-5 h-5 text-primary" />
          </div>
        </div>
      </Card>

      {/* veLCLAW Power */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">veLCLAW Power</p>
            <p className="text-3xl font-bold text-foreground mt-2">0</p>
          </div>
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Vote className="w-5 h-5 text-secondary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">0 active locks</p>
      </Card>

      {/* Unclaimed Rewards */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Unclaimed Rewards</p>
            <p className="text-3xl font-bold text-primary mt-2">$0.00</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
        </div>
        <button className="text-xs text-primary hover:underline font-semibold mt-2">
          Claim All →
        </button>
      </Card>
    </div>
  )
}
