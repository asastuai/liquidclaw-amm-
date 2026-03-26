"use client"

import { Header } from "@/components/liquid-claw/header"
import { PortfolioStats } from "./portfolio-stats"
import { LiquidityPositions } from "./liquidity-positions"
import { VeLCLAWLocks } from "./velclaw-locks"
import { RecentActivity } from "./recent-activity"

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">Connected Wallet</span>
              <code className="bg-muted px-3 py-1 rounded-lg font-mono text-foreground">0x1234...5678</code>
              <span className="flex items-center gap-2 text-accent">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Connected to Base
              </span>
            </div>
          </div>

          {/* Portfolio Overview */}
          <PortfolioStats />

          {/* Liquidity Positions */}
          <LiquidityPositions />

          {/* veLCLAW Locks */}
          <VeLCLAWLocks />

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </main>
    </div>
  )
}
