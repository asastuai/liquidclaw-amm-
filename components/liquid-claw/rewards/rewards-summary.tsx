"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift } from "lucide-react"

interface RewardBreakdown {
  label: string
  value: string
  icon: string
}

export function RewardsSummary() {
  // TODO: Replace with real reward data from contracts
  const totalClaimable = 0
  const breakdown: RewardBreakdown[] = [
    { label: "Fees", value: "$0", icon: "fees" },
    { label: "Bribes", value: "$0", icon: "bribes" },
    { label: "Emissions", value: "$0", icon: "emissions" },
    { label: "Rebases", value: "$0", icon: "rebases" },
  ]

  return (
    <Card className="bg-card border border-border/50 p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-accent/5 rounded-full blur-3xl -ml-16 -mb-16" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-8 flex-col md:flex-row">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold text-muted-foreground">Total Claimable</h2>
            </div>
            <p className="text-5xl md:text-6xl font-bold text-primary mb-8">
              ${totalClaimable.toFixed(2)}
            </p>

            {/* Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {breakdown.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold text-foreground font-mono">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Claim All Button */}
          <div className="flex items-center md:h-full md:py-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-10 py-8 text-lg font-semibold h-auto"
            >
              <Gift className="w-6 h-6 mr-2" />
              Claim All
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
