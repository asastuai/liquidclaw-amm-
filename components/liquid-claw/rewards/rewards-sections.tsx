"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ExternalLink, Coins, TrendingUp, Zap } from "lucide-react"

interface RewardItem {
  id: string
  name: string
  badges?: string[]
  tokens: string
  usdValue: number
  claimable: boolean
}

export function RewardsSections() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["fees"])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  // Reward data from Gauge/Bribe contracts (requires gauge deployment)
  const tradingFees: RewardItem[] = []
  const bribes: RewardItem[] = []
  const emissions: RewardItem[] = []
  const rebaseReward = { amount: "0 LCLAW", usdValue: 0 }

  const RewardSection = ({
    title,
    icon: Icon,
    items,
    id,
  }: {
    title: string
    icon: React.ComponentType<{ className?: string }>
    items: RewardItem[]
    id: string
  }) => (
    <Collapsible
      open={expandedSections.includes(id)}
      onOpenChange={() => toggleSection(id)}
    >
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 bg-card border border-border/50 rounded-lg hover:bg-muted/30 transition-colors mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{items.length} pool{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform ${
              expandedSections.includes(id) ? "rotate-180" : ""
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  {item.badges?.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{item.tokens}</p>
              </div>
              <Button variant="outline" size="sm">
                Claim
              </Button>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border/30">
              <span className="text-sm text-muted-foreground">Total Value</span>
              <span className="font-mono font-semibold text-foreground">${item.usdValue}</span>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="p-8 text-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No rewards available yet</p>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Rewards by Source</h2>

      <div className="grid gap-6">
        {/* Trading Fees */}
        <RewardSection
          title="Trading Fees"
          icon={Coins}
          items={tradingFees}
          id="fees"
        />

        {/* Bribes */}
        <RewardSection
          title="Bribes"
          icon={TrendingUp}
          items={bribes}
          id="bribes"
        />

        {/* LCLAW Emissions */}
        <RewardSection
          title="LCLAW Emissions"
          icon={Zap}
          items={emissions}
          id="emissions"
        />

        {/* Rebases */}
        <Collapsible
          open={expandedSections.includes("rebases")}
          onOpenChange={() => toggleSection("rebases")}
        >
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between p-4 bg-card border border-border/50 rounded-lg hover:bg-muted/30 transition-colors mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Rebases</h3>
                  <p className="text-sm text-muted-foreground">Protect voting power</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  expandedSections.includes("rebases") ? "rotate-180" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="p-4 border border-border/50 mb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">veLCLAW Rebase</h4>
                  <p className="text-sm text-muted-foreground">
                    Rebases protect your voting power from dilution as new LCLAW is emitted
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Claim
                </Button>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border/30">
                <span className="text-sm text-muted-foreground">Pending</span>
                <div className="text-right">
                  <p className="font-mono font-semibold text-foreground">{rebaseReward.amount}</p>
                  <p className="text-sm text-muted-foreground">${rebaseReward.usdValue}</p>
                </div>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
