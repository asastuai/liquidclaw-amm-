"use client"

import { useReadContract, useWriteContract, useAccount, useChainId } from "wagmi"
import { parseEther, formatEther, formatUnits, parseUnits, type Address } from "viem"
import { getAddresses, type TokenInfo } from "@/lib/contracts/addresses"
import { ERC20_ABI, ROUTER_ABI, POOL_FACTORY_ABI, POOL_ABI } from "@/lib/contracts/abis"

export function useAddresses() {
  const chainId = useChainId()
  return getAddresses(chainId)
}

export function useTokenBalance(tokenAddress: Address | undefined) {
  const { address } = useAccount()

  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!tokenAddress && tokenAddress !== "0x0000000000000000000000000000000000000000",
    },
  })
}

export function useTokenAllowance(tokenAddress: Address | undefined, spenderAddress: Address | undefined) {
  const { address } = useAccount()

  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address && spenderAddress ? [address, spenderAddress] : undefined,
    query: {
      enabled: !!address && !!tokenAddress && !!spenderAddress,
    },
  })
}

export function useApproveToken() {
  return useWriteContract()
}

export function useSwap() {
  return useWriteContract()
}

export function useGetAmountsOut(
  amountIn: bigint | undefined,
  routes: { from: Address; to: Address; stable: boolean; factory: Address }[]
) {
  const addresses = useAddresses()

  return useReadContract({
    address: addresses.router,
    abi: ROUTER_ABI,
    functionName: "getAmountsOut",
    args: amountIn ? [amountIn, routes] : undefined,
    query: {
      enabled: !!amountIn && amountIn > 0n && routes.length > 0,
    },
  })
}

export function usePoolReserves(poolAddress: Address | undefined) {
  return useReadContract({
    address: poolAddress,
    abi: POOL_ABI,
    functionName: "getReserves",
    query: {
      enabled: !!poolAddress && poolAddress !== "0x0000000000000000000000000000000000000000",
    },
  })
}

export function useAllPoolsLength() {
  const addresses = useAddresses()

  return useReadContract({
    address: addresses.poolFactory,
    abi: POOL_FACTORY_ABI,
    functionName: "allPoolsLength",
  })
}

// Helpers
export { parseEther, formatEther, formatUnits, parseUnits }
