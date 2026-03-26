"use client"

import { useState, useEffect, useCallback } from "react"
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
} from "wagmi"
import { parseUnits, formatUnits, type Address, maxUint256 } from "viem"
import { getAddresses, type TokenInfo } from "@/lib/contracts/addresses"
import { ROUTER_ABI, ERC20_ABI } from "@/lib/contracts/abis"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address

export type SwapState = "idle" | "quoting" | "needs_approval" | "approving" | "ready" | "swapping" | "success" | "error"

interface UseSwapOptions {
  tokenIn: TokenInfo | null
  tokenOut: TokenInfo | null
  amountIn: string
  slippage: number // percentage, e.g. 0.5 = 0.5%
}

export function useSwap({ tokenIn, tokenOut, amountIn, slippage }: UseSwapOptions) {
  const { address: userAddress } = useAccount()
  const chainId = useChainId()
  const addresses = getAddresses(chainId)
  const [swapState, setSwapState] = useState<SwapState>("idle")
  const [error, setError] = useState<string | null>(null)

  const isNativeIn = tokenIn?.isNative ?? false
  const isNativeOut = tokenOut?.isNative ?? false

  // Resolve WETH for native ETH in route
  const routeTokenIn = isNativeIn ? addresses.weth : (tokenIn?.address ?? ZERO_ADDRESS)
  const routeTokenOut = isNativeOut ? addresses.weth : (tokenOut?.address ?? ZERO_ADDRESS)

  // Parse input amount
  const parsedAmountIn =
    amountIn && tokenIn && parseFloat(amountIn) > 0
      ? parseUnits(amountIn, tokenIn.decimals)
      : 0n

  // Build route
  const routes =
    routeTokenIn !== ZERO_ADDRESS && routeTokenOut !== ZERO_ADDRESS && routeTokenIn !== routeTokenOut
      ? [
          {
            from: routeTokenIn,
            to: routeTokenOut,
            stable: false as const,
            factory: addresses.poolFactory,
          },
        ]
      : []

  // === QUOTE ===
  const {
    data: amountsOut,
    isLoading: isQuoting,
    error: quoteError,
  } = useReadContract({
    address: addresses.router,
    abi: ROUTER_ABI,
    functionName: "getAmountsOut",
    args: [parsedAmountIn, routes],
    query: {
      enabled: parsedAmountIn > 0n && routes.length > 0 && addresses.router !== ZERO_ADDRESS,
      refetchInterval: 10_000,
    },
  })

  const amountOut = amountsOut ? amountsOut[amountsOut.length - 1] : undefined
  const formattedAmountOut =
    amountOut && tokenOut ? formatUnits(amountOut, tokenOut.decimals) : ""

  // Min amount out with slippage
  const amountOutMin = amountOut
    ? (amountOut * BigInt(Math.floor((100 - slippage) * 100))) / 10000n
    : 0n

  // === NATIVE ETH BALANCE ===
  const { data: ethBalance } = useBalance({
    address: userAddress,
    query: { enabled: !!userAddress },
  })

  // === TOKEN IN BALANCE ===
  const { data: tokenInBalance } = useReadContract({
    address: isNativeIn ? undefined : (tokenIn?.address as Address),
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && !!tokenIn && !isNativeIn && tokenIn.address !== ZERO_ADDRESS,
    },
  })

  // === TOKEN OUT BALANCE ===
  const { data: tokenOutBalance } = useReadContract({
    address: isNativeOut ? undefined : (tokenOut?.address as Address),
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && !!tokenOut && !isNativeOut && tokenOut.address !== ZERO_ADDRESS,
    },
  })

  const balanceIn = isNativeIn
    ? ethBalance?.value
    : (tokenInBalance as bigint | undefined)

  const formattedBalanceIn =
    balanceIn !== undefined && tokenIn ? formatUnits(balanceIn, tokenIn.decimals) : "0"

  const balanceOut = isNativeOut
    ? ethBalance?.value
    : (tokenOutBalance as bigint | undefined)

  const formattedBalanceOut =
    balanceOut !== undefined && tokenOut ? formatUnits(balanceOut, tokenOut.decimals) : "0"

  // Sufficient balance check
  const hasSufficientBalance =
    balanceIn !== undefined && parsedAmountIn > 0n && balanceIn >= parsedAmountIn

  // === ALLOWANCE ===
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: isNativeIn ? undefined : (tokenIn?.address as Address),
    abi: ERC20_ABI,
    functionName: "allowance",
    args: userAddress ? [userAddress, addresses.router] : undefined,
    query: {
      enabled:
        !!userAddress && !!tokenIn && !isNativeIn && tokenIn.address !== ZERO_ADDRESS && addresses.router !== ZERO_ADDRESS,
    },
  })

  const needsApproval =
    !isNativeIn && parsedAmountIn > 0n && (allowance as bigint | undefined) !== undefined
      ? (allowance as bigint) < parsedAmountIn
      : false

  // === APPROVE TX ===
  const {
    writeContract: approveWrite,
    data: approveTxHash,
    isPending: isApproving,
    error: approveError,
  } = useWriteContract()

  const { isSuccess: approveConfirmed } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  })

  const approve = useCallback(() => {
    if (!tokenIn || isNativeIn) return
    setSwapState("approving")
    setError(null)
    approveWrite({
      address: tokenIn.address as Address,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [addresses.router, maxUint256],
    })
  }, [tokenIn, isNativeIn, approveWrite, addresses.router])

  // Refetch allowance after approve confirms
  useEffect(() => {
    if (approveConfirmed) {
      refetchAllowance()
      setSwapState("ready")
    }
  }, [approveConfirmed, refetchAllowance])

  // === SWAP TX ===
  const {
    writeContract: swapWrite,
    data: swapTxHash,
    isPending: isSwapping,
    error: swapError,
  } = useWriteContract()

  const { isSuccess: swapConfirmed, isLoading: isSwapConfirming } =
    useWaitForTransactionReceipt({
      hash: swapTxHash,
    })

  const swap = useCallback(() => {
    if (!userAddress || parsedAmountIn === 0n || !amountOutMin) return
    setSwapState("swapping")
    setError(null)

    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200) // 20 minutes

    if (isNativeIn) {
      swapWrite({
        address: addresses.router,
        abi: ROUTER_ABI,
        functionName: "swapExactETHForTokens",
        args: [amountOutMin, routes, userAddress, deadline],
        value: parsedAmountIn,
      })
    } else if (isNativeOut) {
      swapWrite({
        address: addresses.router,
        abi: ROUTER_ABI,
        functionName: "swapExactTokensForETH",
        args: [parsedAmountIn, amountOutMin, routes, userAddress, deadline],
      })
    } else {
      swapWrite({
        address: addresses.router,
        abi: ROUTER_ABI,
        functionName: "swapExactTokensForTokens",
        args: [parsedAmountIn, amountOutMin, routes, userAddress, deadline],
      })
    }
  }, [
    userAddress,
    parsedAmountIn,
    amountOutMin,
    routes,
    isNativeIn,
    isNativeOut,
    addresses.router,
    swapWrite,
  ])

  // === STATE MANAGEMENT ===
  useEffect(() => {
    if (swapConfirmed) setSwapState("success")
  }, [swapConfirmed])

  useEffect(() => {
    if (approveError) {
      setSwapState("error")
      setError("Approval failed")
    }
    if (swapError) {
      setSwapState("error")
      setError("Swap failed")
    }
  }, [approveError, swapError])

  // Compute price impact (simplified)
  const priceImpact =
    parsedAmountIn > 0n && amountOut && tokenIn && tokenOut
      ? null // would need pool reserves for real calculation
      : null

  // Exchange rate
  const exchangeRate =
    formattedAmountOut && amountIn && parseFloat(amountIn) > 0
      ? (parseFloat(formattedAmountOut) / parseFloat(amountIn)).toFixed(6)
      : null

  return {
    // Quote
    amountOut: formattedAmountOut,
    exchangeRate,
    priceImpact,
    isQuoting,
    quoteError: quoteError ? "No liquidity for this pair" : null,

    // Balances
    balanceIn: formattedBalanceIn,
    balanceOut: formattedBalanceOut,
    hasSufficientBalance,

    // Approval
    needsApproval,
    approve,
    isApproving: isApproving || (!!approveTxHash && !approveConfirmed),

    // Swap
    swap,
    isSwapping: isSwapping || isSwapConfirming,
    swapTxHash,
    swapConfirmed,

    // State
    swapState,
    error,
    resetState: () => {
      setSwapState("idle")
      setError(null)
    },
  }
}
