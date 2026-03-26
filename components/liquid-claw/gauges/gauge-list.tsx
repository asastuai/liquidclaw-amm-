"use client"

import { GaugeCard } from "./gauge-card"

export interface Gauge {
  id: string
  pair: string[]
  type: "Volatile" | "Stable"
  tvl: number
  apr: number
  userStake: number
  pendingRewards: number
  userLpBalance: number
  stakedLp: number
  epochRewards: number
  userShare: number
  nextEpoch: number
}

interface GaugeListProps {
  gauges: Gauge[]
}

export function GaugeList({ gauges }: GaugeListProps) {
  return (
    <div className="space-y-4">
      {gauges.map((gauge) => (
        <GaugeCard key={gauge.id} gauge={gauge} />
      ))}
    </div>
  )
}
