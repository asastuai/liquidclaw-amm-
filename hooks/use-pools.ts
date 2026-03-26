"use client"

import { useReadContract, useReadContracts, useChainId } from "wagmi"
import { formatUnits, type Address } from "viem"
import { getAddresses } from "@/lib/contracts/addresses"
import { POOL_ABI, POOL_FACTORY_ABI, ERC20_ABI, GAUGE_ABI } from "@/lib/contracts/abis"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address

// Known token symbols for display
const KNOWN_SYMBOLS: Record<string, string> = {
  "0x4200000000000000000000000000000000000006": "WETH",
  "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913": "USDC",
  "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b": "VIRTUAL",
}

const KNOWN_ICONS: Record<string, string> = {
  WETH: "⟠",
  ETH: "⟠",
  USDC: "◉",
  VIRTUAL: "🟣",
  LCLAW: "🦞",
}

export interface PoolData {
  address: Address
  token0: Address
  token1: Address
  token0Symbol: string
  token1Symbol: string
  token0Decimals: number
  token1Decimals: number
  token0Icon: string
  token1Icon: string
  stable: boolean
  reserve0: bigint
  reserve1: bigint
  totalSupply: bigint
  // Computed
  tvlUsd: number | null
  fee: string
}

export function usePoolsLength() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  return useReadContract({
    address: addresses.poolFactory,
    abi: POOL_FACTORY_ABI,
    functionName: "allPoolsLength",
    query: {
      enabled: addresses.poolFactory !== ZERO_ADDRESS,
    },
  })
}

export function usePoolsList() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  // Get all pool addresses
  const { data: allPools, isLoading: isLoadingPools } = useReadContract({
    address: addresses.poolFactory,
    abi: POOL_FACTORY_ABI,
    functionName: "allPools",
    query: {
      enabled: addresses.poolFactory !== ZERO_ADDRESS,
    },
  })

  const poolAddresses = (allPools as Address[] | undefined) ?? []

  // For each pool, read metadata
  const metadataCalls = poolAddresses.map((poolAddr) => ({
    address: poolAddr,
    abi: POOL_ABI,
    functionName: "metadata" as const,
  }))

  const { data: metadataResults, isLoading: isLoadingMetadata } = useReadContracts({
    contracts: metadataCalls,
    query: {
      enabled: poolAddresses.length > 0,
    },
  })

  // Read total supply for each pool
  const supplyCalls = poolAddresses.map((poolAddr) => ({
    address: poolAddr,
    abi: POOL_ABI,
    functionName: "totalSupply" as const,
  }))

  const { data: supplyResults } = useReadContracts({
    contracts: supplyCalls,
    query: {
      enabled: poolAddresses.length > 0,
    },
  })

  // Read token symbols for display
  const symbolCalls: { address: Address; abi: typeof ERC20_ABI; functionName: "symbol" }[] = []
  const decimalsCalls: { address: Address; abi: typeof ERC20_ABI; functionName: "decimals" }[] = []

  if (metadataResults) {
    for (const result of metadataResults) {
      if (result.status === "success") {
        const [, , , , , t0, t1] = result.result as [bigint, bigint, bigint, bigint, boolean, Address, Address]
        symbolCalls.push(
          { address: t0, abi: ERC20_ABI, functionName: "symbol" },
          { address: t1, abi: ERC20_ABI, functionName: "symbol" }
        )
        decimalsCalls.push(
          { address: t0, abi: ERC20_ABI, functionName: "decimals" },
          { address: t1, abi: ERC20_ABI, functionName: "decimals" }
        )
      }
    }
  }

  const { data: symbolResults } = useReadContracts({
    contracts: symbolCalls,
    query: { enabled: symbolCalls.length > 0 },
  })

  const { data: decimalsResults } = useReadContracts({
    contracts: decimalsCalls,
    query: { enabled: decimalsCalls.length > 0 },
  })

  // Build pool data
  const pools: PoolData[] = []

  if (metadataResults) {
    let symbolIdx = 0
    metadataResults.forEach((result, i) => {
      if (result.status !== "success") {
        symbolIdx += 2
        return
      }

      const [dec0, dec1, r0, r1, st, t0, t1] = result.result as [
        bigint, bigint, bigint, bigint, boolean, Address, Address
      ]

      const token0Symbol =
        symbolResults?.[symbolIdx]?.status === "success"
          ? (symbolResults[symbolIdx].result as string)
          : KNOWN_SYMBOLS[t0.toLowerCase()] ?? "???"

      const token1Symbol =
        symbolResults?.[symbolIdx + 1]?.status === "success"
          ? (symbolResults[symbolIdx + 1].result as string)
          : KNOWN_SYMBOLS[t1.toLowerCase()] ?? "???"

      const token0Decimals =
        decimalsResults?.[symbolIdx]?.status === "success"
          ? Number(decimalsResults[symbolIdx].result)
          : Number(dec0.toString().length > 2 ? 18 : dec0)

      const token1Decimals =
        decimalsResults?.[symbolIdx + 1]?.status === "success"
          ? Number(decimalsResults[symbolIdx + 1].result)
          : Number(dec1.toString().length > 2 ? 18 : dec1)

      symbolIdx += 2

      const totalSupply =
        supplyResults?.[i]?.status === "success"
          ? (supplyResults[i].result as bigint)
          : 0n

      pools.push({
        address: poolAddresses[i],
        token0: t0,
        token1: t1,
        token0Symbol,
        token1Symbol,
        token0Decimals,
        token1Decimals,
        token0Icon: KNOWN_ICONS[token0Symbol] ?? "🪙",
        token1Icon: KNOWN_ICONS[token1Symbol] ?? "🪙",
        stable: st,
        reserve0: r0,
        reserve1: r1,
        totalSupply,
        tvlUsd: null, // needs price oracle for real USD value
        fee: st ? "0.05%" : "0.3%",
      })
    })
  }

  return {
    pools,
    isLoading: isLoadingPools || isLoadingMetadata,
    isEmpty: !isLoadingPools && !isLoadingMetadata && pools.length === 0,
  }
}
