"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Droplet } from "lucide-react"

// Positions populated when user adds liquidity to pools
const positions: {
  id: number; pair: string; tokens: string[]; type: string;
  share: string; value: string; status: string; apr: string | null;
}[] = []

export function LiquidityPositions() {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Your Liquidity Positions</h2>
      </div>

      {positions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <Card key={position.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{position.pair}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{position.share} of pool</p>
                </div>
                <Badge variant={position.type === "Volatile" ? "default" : "secondary"}>
                  {position.type}
                </Badge>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Value</span>
                  <span className="font-semibold text-foreground">{position.value}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={position.status === "Staked" ? "outline" : "secondary"}>
                    {position.status}
                  </Badge>
                </div>
                {position.apr && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">APR</span>
                    <span className="font-semibold text-primary flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {position.apr}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {position.status === "Unstaked" ? (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      Stake
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      Unstake
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Droplet className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No liquidity positions. Add liquidity to start earning.</p>
        </Card>
      )}
    </div>
  )
}
