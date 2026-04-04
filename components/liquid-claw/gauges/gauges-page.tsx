"use client"

import { useState } from "react"
import { Header } from "../header"
import { GaugeStats } from "./gauge-stats"
import { GaugeFilters } from "./gauge-filters"
import { GaugeList } from "./gauge-list"
import { GaugeEmptyState } from "./gauge-empty-state"
import { useI18n } from "@/lib/i18n"

// Gauge data will be populated when gauges are created via governance
type GaugeData = {
  id: string; pair: string[]; type: "Volatile" | "Stable";
  tvl: number; apr: number; userStake: number; pendingRewards: number;
  userLpBalance: number; stakedLp: number; epochRewards: number;
  userShare: number; nextEpoch: number;
}
const gauges: GaugeData[] = []

export function GaugesPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<"all" | "my-stakes">("all")
  const [sortBy, setSortBy] = useState<"apr" | "tvl" | "stake">("apr")
  const [searchQuery, setSearchQuery] = useState("")

  const totalStakedValue = gauges.reduce((acc, g) => acc + g.tvl, 0)
  const userTotalStaked = gauges.reduce((acc, g) => acc + g.userStake, 0)
  const totalPendingRewards = gauges.reduce((acc, g) => acc + g.pendingRewards, 0)

  const filteredGauges = gauges
    .filter((gauge) => {
      if (activeTab === "my-stakes" && gauge.userStake === 0) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return gauge.pair.some((token) => token.toLowerCase().includes(query))
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "apr":
          return b.apr - a.apr
        case "tvl":
          return b.tvl - a.tvl
        case "stake":
          return b.userStake - a.userStake
        default:
          return 0
      }
    })

  const hasMyStakes = gauges.some((g) => g.userStake > 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Decorative bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-primary/20 float-1" />
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-accent/20 float-3" />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full bg-secondary/30 float-1" />
      <div className="absolute top-60 right-1/3 w-5 h-5 rounded-full bg-primary/15 float-2" />
      </div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Page Header with kawaii touch */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{t("gauges.title")}</h1>
            <img src="/images/lobster-mascot.jpg" alt="LCLAW" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <p className="text-muted-foreground text-lg">
            {t("gauges.subtitle")}
          </p>
        </div>

        {/* Stats */}
        <GaugeStats
          totalStakedValue={totalStakedValue}
          userTotalStaked={userTotalStaked}
          pendingRewards={totalPendingRewards}
        />

        {/* Filters */}
        <GaugeFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Gauge List or Empty State */}
        {activeTab === "my-stakes" && !hasMyStakes ? (
          <GaugeEmptyState />
        ) : filteredGauges.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No gauges found matching your search</p>
          </div>
        ) : (
          <GaugeList gauges={filteredGauges} />
        )}
      </main>
    </div>
  )
}
