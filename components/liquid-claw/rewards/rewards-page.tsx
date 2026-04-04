"use client"

import { useState } from "react"
import { Header } from "@/components/liquid-claw/header"
import { RewardsSummary } from "./rewards-summary"
import { RewardsSections } from "./rewards-sections"
import { RewardsHistory } from "./rewards-history"
import { Separator } from "@/components/ui/separator"
import { useI18n } from "@/lib/i18n"

export function RewardsPage() {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Rewards
            </h1>
            <p className="text-lg text-muted-foreground">
              Claim all your earnings in one place
            </p>
          </div>

          {/* Info Banner */}
          {showBanner && (
            <div className="mb-8 p-4 bg-accent/5 border border-accent/20 rounded-lg flex items-start justify-between">
              <div className="flex gap-3">
                <div className="text-accent font-semibold mt-1">ℹ️</div>
                <div>
                  <p className="font-medium text-foreground">
                    Multiple reward types available
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Earn fees from trading volume, bribes from governance votes, LCLAW emissions from staked LP, and rebases to protect your voting power
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* Total Rewards Summary */}
          <RewardsSummary />

          <Separator className="my-12" />

          {/* Rewards by Source */}
          <RewardsSections />

          <Separator className="my-12" />

          {/* Rewards History */}
          <RewardsHistory />
        </div>
      </main>
    </div>
  )
}
