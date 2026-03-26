"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Droplets, ArrowUpRight, Loader2 } from "lucide-react"
import { useAccount } from "wagmi"
import { formatUnits } from "viem"
import { usePoolsList, type PoolData } from "@/hooks/use-pools"
import type { Address } from "viem"
import { AddLiquidityModal } from "./add-liquidity-modal"
import { getTokenIcon } from "@/lib/token-icons"

const LIVE_POOLS: { pair: [string, string]; fee: string; type: "Stable" | "Volatile"; poolData: PoolData }[] = [
  {
    pair: ["USDC", "USDT"],
    fee: "0.05%",
    type: "Stable",
    poolData: {
      address: "0x94503AEDaA147fe8936dA7Cf82b4A892e2bDafA5" as Address,
      token0: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address,
      token1: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2" as Address,
      token0Symbol: "USDC", token1Symbol: "USDT",
      token0Decimals: 6, token1Decimals: 6,
      token0Icon: "/images/tokens/usdc.png", token1Icon: "/images/tokens/usdt.png",
      stable: true, fee: "0.05%", reserve0: 0n, reserve1: 0n, totalSupply: 0n, tvlUsd: null,
    },
  },
  {
    pair: ["ETH", "USDC"],
    fee: "0.3%",
    type: "Volatile",
    poolData: {
      address: "0xA79C30ac2E7852a53ed000247FDbFCD1010FA29B" as Address,
      token0: "0x4200000000000000000000000000000000000006" as Address,
      token1: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address,
      token0Symbol: "WETH", token1Symbol: "USDC",
      token0Decimals: 18, token1Decimals: 6,
      token0Icon: "/images/tokens/eth.png", token1Icon: "/images/tokens/usdc.png",
      stable: false, fee: "0.3%", reserve0: 0n, reserve1: 0n, totalSupply: 0n, tvlUsd: null,
    },
  },
]

// Legacy preview pools kept for when token launches
const PREVIEW_POOLS = [
  {
    pair: ["LCLAW", "WETH"],
    fee: "0.3%",
    hot: true,
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

          {/* Live pools on mainnet */}
          {!isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LIVE_POOLS.map((pool, i) => (
                <Card key={`live-${i}`} className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer" onClick={() => setSelectedPool(pool.poolData)}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex -space-x-2">
                        <img src={getTokenIcon(pool.pair[0])} alt={pool.pair[0]} className="w-10 h-10 rounded-full border-2 border-card object-cover bg-muted" />
                        <img src={getTokenIcon(pool.pair[1])} alt={pool.pair[1]} className="w-10 h-10 rounded-full border-2 border-card object-cover bg-muted" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {pool.type}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg">{pool.pair.join(" / ")}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Fee: {pool.fee}</p>
                    <Button size="sm" className="w-full mt-4 rounded-full">
                      <Droplets className="w-4 h-4 mr-2" />
                      Add Liquidity
                    </Button>
                    <div className="mt-2 text-center">
                      <a
                        href={`https://basescan.org/address/${pool.poolData.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                      >
                        {pool.poolData.address.slice(0, 6)}...{pool.poolData.address.slice(-4)} ↗
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
