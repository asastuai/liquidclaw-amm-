"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Droplets, ArrowUpRight, Loader2 } from "lucide-react"
import { useAccount } from "wagmi"
import { formatUnits } from "viem"
import { usePoolsList, type PoolData } from "@/hooks/use-pools"
import { AddLiquidityModal } from "./add-liquidity-modal"
import { getTokenIcon } from "@/lib/token-icons"

const PREVIEW_POOLS = [
  {
    pair: ["LCLAW", "WETH"],
    fee: "0.3%",
    hot: true,
  },
  {
    pair: ["VIRTUAL", "WETH"],
    fee: "0.3%",
    hot: true,
  },
  {
    pair: ["VIRTUAL", "USDC"],
    fee: "0.05%",
    hot: false,
  },
  {
    pair: ["LCLAW", "USDC"],
    fee: "0.3%",
    hot: false,
  },
]

function PreviewPoolCard({ pool }: { pool: (typeof PREVIEW_POOLS)[0] }) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2">
            <img
              src={getTokenIcon(pool.pair[0])}
              alt={pool.pair[0]}
              className="w-10 h-10 rounded-full border-2 border-card object-cover bg-muted"
            />
            <img
              src={getTokenIcon(pool.pair[1])}
              alt={pool.pair[1]}
              className="w-10 h-10 rounded-full border-2 border-card object-cover bg-muted"
            />
          </div>
          {pool.hot && (
            <Badge className="bg-primary/10 text-primary border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-bold text-foreground mb-1">
          {pool.pair[0]}/{pool.pair[1]}
        </h3>
        <span className="text-xs text-muted-foreground">{pool.fee} fee</span>

        <div className="space-y-3 mt-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">TVL</span>
            <span className="text-sm font-semibold text-muted-foreground">—</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">APR</span>
            <span className="text-sm font-semibold text-muted-foreground">—</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">24h Volume</span>
            <span className="text-sm font-semibold text-muted-foreground">—</span>
          </div>
        </div>

        <Button className="w-full mt-6 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          Add Liquidity
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

function OnChainPoolCard({
  pool,
  onAddLiquidity,
}: {
  pool: PoolData
  onAddLiquidity: (pool: PoolData) => void
}) {
  const r0 = parseFloat(formatUnits(pool.reserve0, pool.token0Decimals))
  const r1 = parseFloat(formatUnits(pool.reserve1, pool.token1Decimals))

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2">
            <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl border-2 border-card">
              {pool.token0Icon}
            </span>
            <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl border-2 border-card">
              {pool.token1Icon}
            </span>
          </div>
          <Badge
            className={
              pool.stable
                ? "bg-secondary/50 text-secondary-foreground border-0"
                : "bg-primary/10 text-primary border-0"
            }
          >
            {pool.stable ? "Stable" : "Volatile"}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-1">
          {pool.token0Symbol}/{pool.token1Symbol}
        </h3>
        <span className="text-xs text-muted-foreground">{pool.fee} fee</span>

        <div className="space-y-3 mt-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{pool.token0Symbol}</span>
            <span className="text-sm font-semibold text-foreground">
              {r0.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{pool.token1Symbol}</span>
            <span className="text-sm font-semibold text-foreground">
              {r1.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">LP Supply</span>
            <span className="text-sm font-semibold text-foreground">
              {parseFloat(formatUnits(pool.totalSupply, 18)).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <Button
          onClick={() => onAddLiquidity(pool)}
          className="w-full mt-6 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          Add Liquidity
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

export function Pools() {
  const { isConnected } = useAccount()
  const { pools, isLoading, isEmpty } = usePoolsList()
  const [selectedPool, setSelectedPool] = useState<PoolData | null>(null)

  const showOnChain = isConnected && pools.length > 0
  const showPreview = !isConnected || isEmpty

  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4">
              <Droplets className="w-4 h-4" />
              Liquidity Pools
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Earn Yield with <span className="text-primary">Deep Liquidity</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Provide liquidity to earn trading fees. Our pools are optimized for
              low slippage and high capital efficiency.
            </p>
          </div>

          {/* Loading state */}
          {isConnected && isLoading && (
            <div className="flex items-center justify-center gap-3 py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading pools from Base...</span>
            </div>
          )}

          {/* On-chain pools */}
          {showOnChain && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pools.map((pool) => (
                <OnChainPoolCard
                  key={pool.address}
                  pool={pool}
                  onAddLiquidity={setSelectedPool}
                />
              ))}
            </div>
          )}

          {/* Preview pools (before deployment or not connected) */}
          {showPreview && !isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PREVIEW_POOLS.map((pool, i) => (
                <PreviewPoolCard key={i} pool={pool} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              View All Pools
            </Button>
          </div>
        </div>
      </section>

      <AddLiquidityModal
        open={selectedPool !== null}
        onClose={() => setSelectedPool(null)}
        pool={selectedPool}
      />
    </>
  )
}
