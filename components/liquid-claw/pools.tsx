"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Loader2, LogOut, Percent } from "lucide-react"
import { useAccount, useChainId, useReadContract } from "wagmi"
import { formatUnits } from "viem"
import type { PoolData } from "@/hooks/use-pools"
import type { Address } from "viem"
import { AddLiquidityModal } from "./add-liquidity-modal"
import { getTokenIcon } from "@/lib/token-icons"
import { getAddressUrl } from "@/lib/explorer"
import { ERC20_ABI } from "@/lib/contracts/abis"

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

function UserPosition({ pool }: { pool: (typeof LIVE_POOLS)[0] }) {
  const { address: userAddress } = useAccount()
  const chainId = useChainId()

  const { data: lpBalance, isLoading } = useReadContract({
    address: pool.poolData.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress },
  })

  const userLp = lpBalance as bigint | undefined
  const hasPosition = userLp && userLp > 0n
  const lpDecimals = Math.min(pool.poolData.token0Decimals, pool.poolData.token1Decimals)
  const formattedLp = hasPosition ? parseFloat(formatUnits(userLp, lpDecimals)).toFixed(4) : "0"

  if (!userAddress) return null
  if (isLoading) {
    return (
      <div className="mt-3 py-3 px-3 bg-muted/30 rounded-lg flex items-center justify-center gap-2">
        <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Loading position...</span>
      </div>
    )
  }
  if (!hasPosition) return null

  return (
    <div className="mt-3 py-3 px-3 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-muted-foreground">Your Position</span>
        <a
          href={getAddressUrl(chainId, pool.poolData.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          View ↗
        </a>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <img src={getTokenIcon(pool.pair[0])} alt="" className="w-4 h-4 rounded-full" />
            <img src={getTokenIcon(pool.pair[1])} alt="" className="w-4 h-4 rounded-full" />
          </div>
          <span className="text-sm font-semibold text-foreground">{formattedLp}</span>
        </div>
        <span className="text-xs text-muted-foreground">LP tokens</span>
      </div>
    </div>
  )
}

function LivePoolCard({
  pool,
  onAddLiquidity,
}: {
  pool: (typeof LIVE_POOLS)[0]
  onAddLiquidity: (pool: PoolData) => void
}) {
  const { isConnected } = useAccount()
  const chainId = useChainId()

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <CardContent className="p-6">
        {/* Header */}
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

        {/* APR */}
        <div className="flex items-center justify-between mt-4 py-2 px-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Percent className="w-3.5 h-3.5" />
            APR
          </div>
          <span className="text-sm font-semibold text-muted-foreground">0.00%</span>
        </div>

        {/* User position — loads independently */}
        {isConnected && <UserPosition pool={pool} />}

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            className="flex-1 rounded-full"
            onClick={() => onAddLiquidity(pool.poolData)}
          >
            <Droplets className="w-4 h-4 mr-1.5" />
            Add Liquidity
          </Button>
        </div>

        {/* Pool address */}
        <div className="mt-2 text-center">
          <a
            href={getAddressUrl(chainId, pool.poolData.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            {pool.poolData.address.slice(0, 6)}...{pool.poolData.address.slice(-4)} ↗
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export function Pools() {
  const [selectedPool, setSelectedPool] = useState<PoolData | null>(null)

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
              Provide liquidity to earn trading fees. Stake LP tokens in gauges to earn LCLAW rewards when emissions go live.
            </p>
          </div>

          {/* Live pools — renders instantly, positions load async */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIVE_POOLS.map((pool, i) => (
              <LivePoolCard
                key={`live-${i}`}
                pool={pool}
                onAddLiquidity={setSelectedPool}
              />
            ))}
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
