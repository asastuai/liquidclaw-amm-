"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface HistoryEntry {
  id: string
  date: string
  type: "Fee" | "Bribe" | "Emission" | "Rebase"
  source: string
  amount: string
  token: string
  usdValue: number
  txHash: string
}

export function RewardsHistory() {
  const [filter, setFilter] = useState<string>("all")

  // Reward history from on-chain events (requires indexer)
  const history: HistoryEntry[] = []

  const typeColors: Record<string, string> = {
    Fee: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Bribe: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Emission: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Rebase: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  }

  const filtered = filter === "all" ? history : history.filter((h) => h.type === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <h2 className="text-3xl font-bold text-foreground">Rewards History</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {["Fee", "Bribe", "Emission", "Rebase"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Source</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">USD Value</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Tx Hash</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-4 text-foreground">{entry.date}</td>
                <td className="py-4 px-4">
                  <Badge
                    className={`${typeColors[entry.type]}`}
                    variant="secondary"
                  >
                    {entry.type}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-foreground">{entry.source}</td>
                <td className="py-4 px-4 text-foreground font-mono">
                  {entry.amount} {entry.token}
                </td>
                <td className="py-4 px-4 text-foreground font-semibold">${entry.usdValue}</td>
                <td className="py-4 px-4">
                  <a
                    href="#"
                    className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    {entry.txHash}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((entry) => (
          <Card key={entry.id} className="p-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{entry.date}</p>
              <Badge className={`${typeColors[entry.type]}`} variant="secondary">
                {entry.type}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span className="font-medium text-foreground">{entry.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-mono font-medium text-foreground">
                  {entry.amount} {entry.token}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border/30">
                <span className="text-muted-foreground">USD Value</span>
                <span className="font-semibold text-foreground">${entry.usdValue}</span>
              </div>
            </div>
            <a
              href="#"
              className="mt-3 flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
            >
              View Tx {entry.txHash}
              <ExternalLink className="w-3 h-3" />
            </a>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 border border-border/50 text-center">
          <div className="text-muted-foreground">
            <p className="text-lg font-medium mb-2">No rewards to claim yet</p>
            <p className="text-sm">
              Start earning by staking LP tokens in Gauges or voting with veLCLAW
            </p>
          </div>
        </Card>
      )}

      {/* Load More */}
      {filtered.length > 0 && (
        <div className="flex justify-center pt-6">
          <Button variant="outline" className="px-8">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
