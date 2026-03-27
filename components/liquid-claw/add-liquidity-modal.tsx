"use client"

import { useState, useEffect, useCallback } from "react"
import { getTxUrl } from "@/lib/explorer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Check, AlertTriangle, Plus } from "lucide-react"
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
} from "wagmi"
import { parseUnits, formatUnits, maxUint256, type Address } from "viem"
import { getAddresses } from "@/lib/contracts/addresses"
import { ROUTER_ABI, ERC20_ABI } from "@/lib/contracts/abis"
import type { PoolData } from "@/hooks/use-pools"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address
const WETH = "0x4200000000000000000000000000000000000006" as Address

interface AddLiquidityModalProps {
  open: boolean
  onClose: () => void
  pool: PoolData | null
}

export function AddLiquidityModal({ open, onClose, pool }: AddLiquidityModalProps) {
  const { address: userAddress } = useAccount()
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  const [amount0, setAmount0] = useState("")
  const [amount1, setAmount1] = useState("")
  const [step, setStep] = useState<"input" | "approve0" | "approve1" | "add" | "done">("input")

  const isToken0Weth = pool?.token0.toLowerCase() === WETH.toLowerCase()
  const isToken1Weth = pool?.token1.toLowerCase() === WETH.toLowerCase()
  const hasWeth = isToken0Weth || isToken1Weth

  const parsed0 = amount0 && pool ? parseUnits(amount0, pool.token0Decimals) : 0n
  const parsed1 = amount1 && pool ? parseUnits(amount1, pool.token1Decimals) : 0n

  // User's LP token balance
  const { data: lpBalance, refetch: refetchLp } = useReadContract({
    address: pool?.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && !!pool },
  })
  const userLpBalance = lpBalance as bigint | undefined

  // Quote
  const { data: quoteResult } = useReadContract({
    address: addresses.router,
    abi: ROUTER_ABI,
    functionName: "quoteAddLiquidity",
    args: pool
      ? [pool.token0, pool.token1, pool.stable, addresses.poolFactory, parsed0, parsed1]
      : undefined,
    query: {
      enabled: !!pool && parsed0 > 0n && parsed1 > 0n && addresses.router !== ZERO_ADDRESS,
    },
  })

  const quotedLiquidity = quoteResult
    ? (quoteResult as [bigint, bigint, bigint])[2]
    : undefined

  // Balances
  const { data: ethBalance } = useBalance({
    address: userAddress,
    query: { enabled: !!userAddress },
  })

  const { data: balance0 } = useReadContract({
    address: isToken0Weth ? undefined : pool?.token0,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && !!pool && !isToken0Weth },
  })

  const { data: balance1 } = useReadContract({
    address: isToken1Weth ? undefined : pool?.token1,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && !!pool && !isToken1Weth },
  })

  const formattedBalance0 = pool
    ? isToken0Weth
      ? formatUnits(ethBalance?.value ?? 0n, 18)
      : formatUnits((balance0 as bigint) ?? 0n, pool.token0Decimals)
    : "0"

  const formattedBalance1 = pool
    ? isToken1Weth
      ? formatUnits(ethBalance?.value ?? 0n, 18)
      : formatUnits((balance1 as bigint) ?? 0n, pool.token1Decimals)
    : "0"

  // Allowances
  const { data: allowance0, refetch: refetchAllowance0 } = useReadContract({
    address: isToken0Weth ? undefined : pool?.token0,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: userAddress ? [userAddress, addresses.router] : undefined,
    query: { enabled: !!userAddress && !!pool && !isToken0Weth },
  })

  const { data: allowance1, refetch: refetchAllowance1 } = useReadContract({
    address: isToken1Weth ? undefined : pool?.token1,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: userAddress ? [userAddress, addresses.router] : undefined,
    query: { enabled: !!userAddress && !!pool && !isToken1Weth },
  })

  const needs0Approval = !isToken0Weth && parsed0 > 0n && ((allowance0 as bigint) ?? 0n) < parsed0
  const needs1Approval = !isToken1Weth && parsed1 > 0n && ((allowance1 as bigint) ?? 0n) < parsed1

  // Write contracts
  const {
    writeContract: approve0Write,
    data: approve0Hash,
    isPending: isApproving0,
  } = useWriteContract()

  const { isSuccess: approve0Confirmed } = useWaitForTransactionReceipt({ hash: approve0Hash })

  const {
    writeContract: approve1Write,
    data: approve1Hash,
    isPending: isApproving1,
  } = useWriteContract()

  const { isSuccess: approve1Confirmed } = useWaitForTransactionReceipt({ hash: approve1Hash })

  const {
    writeContract: addLiqWrite,
    data: addLiqHash,
    isPending: isAdding,
    error: addLiqError,
  } = useWriteContract()

  const { isSuccess: addLiqConfirmed, isLoading: addLiqConfirming } =
    useWaitForTransactionReceipt({ hash: addLiqHash })

  // Approve handlers
  const approveToken0 = useCallback(() => {
    if (!pool) return
    setStep("approve0")
    approve0Write({
      address: pool.token0,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [addresses.router, maxUint256],
    })
  }, [pool, approve0Write, addresses.router])

  const approveToken1 = useCallback(() => {
    if (!pool) return
    setStep("approve1")
    approve1Write({
      address: pool.token1,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [addresses.router, maxUint256],
    })
  }, [pool, approve1Write, addresses.router])

  // Refetch allowances after approvals
  useEffect(() => {
    if (approve0Confirmed) refetchAllowance0()
  }, [approve0Confirmed, refetchAllowance0])

  useEffect(() => {
    if (approve1Confirmed) refetchAllowance1()
  }, [approve1Confirmed, refetchAllowance1])

  // Add liquidity
  const addLiquidity = useCallback(() => {
    if (!pool || !userAddress || parsed0 === 0n || parsed1 === 0n) return
    setStep("add")

    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200)
    // 1% slippage on minimums
    const min0 = (parsed0 * 99n) / 100n
    const min1 = (parsed1 * 99n) / 100n

    if (hasWeth) {
      const ethToken = isToken0Weth ? pool.token1 : pool.token0
      const tokenAmount = isToken0Weth ? parsed1 : parsed0
      const tokenMin = isToken0Weth ? min1 : min0
      const ethAmount = isToken0Weth ? parsed0 : parsed1
      const ethMin = isToken0Weth ? min0 : min1

      addLiqWrite({
        address: addresses.router,
        abi: ROUTER_ABI,
        functionName: "addLiquidityETH",
        args: [ethToken, pool.stable, tokenAmount, tokenMin, ethMin, userAddress, deadline],
        value: ethAmount,
      })
    } else {
      addLiqWrite({
        address: addresses.router,
        abi: ROUTER_ABI,
        functionName: "addLiquidity",
        args: [
          pool.token0,
          pool.token1,
          pool.stable,
          parsed0,
          parsed1,
          min0,
          min1,
          userAddress,
          deadline,
        ],
      })
    }
  }, [pool, userAddress, parsed0, parsed1, hasWeth, isToken0Weth, addresses.router, addLiqWrite])

  useEffect(() => {
    if (addLiqConfirmed) {
      setStep("done")
      refetchLp()
    }
  }, [addLiqConfirmed, refetchLp])

  // Reset on close
  const handleClose = () => {
    setAmount0("")
    setAmount1("")
    setStep("input")
    onClose()
  }

  if (!pool) return null

  const canAdd = parsed0 > 0n && parsed1 > 0n && !needs0Approval && !needs1Approval

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add Liquidity — {pool.token0Symbol}/{pool.token1Symbol}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Token 0 Input */}
          <div className="bg-muted/50 rounded-2xl p-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{pool.token0Symbol}</span>
              <span>Balance: {parseFloat(formattedBalance0).toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                placeholder="0.0"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
                className="border-0 bg-transparent text-xl font-semibold p-0 focus-visible:ring-0"
              />
              <span className="flex items-center gap-2 bg-background rounded-full px-4 py-2 shrink-0">
                <img src={pool.token0Icon} alt={pool.token0Symbol} className="w-6 h-6 rounded-full object-cover" />
                <span className="font-semibold text-sm">{pool.token0Symbol}</span>
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-secondary p-2 rounded-lg">
              <Plus className="w-4 h-4 text-secondary-foreground" />
            </div>
          </div>

          {/* Token 1 Input */}
          <div className="bg-muted/50 rounded-2xl p-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{pool.token1Symbol}</span>
              <span>Balance: {parseFloat(formattedBalance1).toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                placeholder="0.0"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
                className="border-0 bg-transparent text-xl font-semibold p-0 focus-visible:ring-0"
              />
              <span className="flex items-center gap-2 bg-background rounded-full px-4 py-2 shrink-0">
                <img src={pool.token1Icon} alt={pool.token1Symbol} className="w-6 h-6 rounded-full object-cover" />
                <span className="font-semibold text-sm">{pool.token1Symbol}</span>
              </span>
            </div>
          </div>

          {/* Info */}
          {quotedLiquidity && quotedLiquidity > 0n && (
            <div className="bg-accent/5 rounded-xl p-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>LP tokens received</span>
                <span>{parseFloat(formatUnits(quotedLiquidity, Math.min(pool.token0Decimals, pool.token1Decimals))).toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground mt-1">
                <span>Pool type</span>
                <span>{pool.stable ? "Stable" : "Volatile"}</span>
              </div>
              <div className="flex justify-between text-muted-foreground mt-1">
                <span>Fee</span>
                <span className="text-primary">{pool.fee}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {needs0Approval && (
            <Button
              onClick={approveToken0}
              disabled={isApproving0 || (!!approve0Hash && !approve0Confirmed)}
              className="w-full rounded-xl h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {(isApproving0 || (!!approve0Hash && !approve0Confirmed)) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Approve {pool.token0Symbol}
            </Button>
          )}

          {needs1Approval && (
            <Button
              onClick={approveToken1}
              disabled={isApproving1 || (!!approve1Hash && !approve1Confirmed)}
              className="w-full rounded-xl h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {(isApproving1 || (!!approve1Hash && !approve1Confirmed)) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Approve {pool.token1Symbol}
            </Button>
          )}

          {step === "done" ? (
            <Button
              disabled
              className="w-full rounded-xl h-12 bg-green-600 hover:bg-green-600 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Liquidity Added!
            </Button>
          ) : (
            <Button
              onClick={addLiquidity}
              disabled={!canAdd || isAdding || addLiqConfirming}
              className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {(isAdding || addLiqConfirming) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {addLiqError && <AlertTriangle className="w-4 h-4 mr-2" />}
              {isAdding || addLiqConfirming ? "Adding Liquidity..." : "Add Liquidity"}
            </Button>
          )}

          {addLiqHash && (
            <div className="text-center">
              <a
                href={getTxUrl(chainId, addLiqHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                View on BaseScan
              </a>
            </div>
          )}

          {/* Your Position */}
          {userLpBalance && userLpBalance > 0n && pool && (
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Your Position</h4>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <img src={pool.token0Icon} alt={pool.token0Symbol} className="w-5 h-5 rounded-full" />
                    <img src={pool.token1Icon} alt={pool.token1Symbol} className="w-5 h-5 rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">{pool.token0Symbol}/{pool.token1Symbol} LP</span>
                </div>
                <span className="text-sm font-mono font-semibold text-foreground">
                  {parseFloat(formatUnits(userLpBalance, Math.min(pool.token0Decimals, pool.token1Decimals))).toFixed(4)}
                </span>
              </div>
              <a
                href={`https://basescan.org/address/${pool.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View pool on BaseScan ↗
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
