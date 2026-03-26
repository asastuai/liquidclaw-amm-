"use client"

import { Zap, TrendingDown } from "lucide-react"

type PoolType = "volatile" | "stable"

interface PoolTypeSelectorProps {
  selected: PoolType
  onChange: (type: PoolType) => void
}

export function PoolTypeSelector({ selected, onChange }: PoolTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground block">Pool Type</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onChange("volatile")}
          className={`p-4 rounded-xl border-2 transition-all ${
            selected === "volatile"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-border/80 bg-muted/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Volatile</span>
          </div>
          <p className="text-xs text-muted-foreground">
            For uncorrelated pairs (LCLAW/WETH). Uses x*y=k curve. Default fee: 0.30%
          </p>
        </button>

        <button
          onClick={() => onChange("stable")}
          className={`p-4 rounded-xl border-2 transition-all ${
            selected === "stable"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-border/80 bg-muted/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Stable</span>
          </div>
          <p className="text-xs text-muted-foreground">
            For correlated pairs (USDC/USDT, stETH/ETH). Uses stable curve. Default fee: 0.05%
          </p>
        </button>
      </div>
    </div>
  )
}
