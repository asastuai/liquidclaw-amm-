"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowDownUp,
  ChevronDown,
  Settings,
  Zap,
  Loader2,
  Check,
  AlertTriangle,
  X,
} from "lucide-react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useSwap } from "@/hooks/use-swap"
import { TokenSelectModal } from "./token-select-modal"
import { BASE_TOKENS, type TokenInfo } from "@/lib/contracts/addresses"

const DEFAULT_SLIPPAGE = 0.5

export function SwapCard() {
  const { isConnected } = useAccount()

  const [tokenIn, setTokenIn] = useState<TokenInfo>(BASE_TOKENS[0]) // ETH
  const [tokenOut, setTokenOut] = useState<TokenInfo>(BASE_TOKENS[4]) // LCLAW
  const [amountIn, setAmountIn] = useState("")
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE)
  const [showSettings, setShowSettings] = useState(false)
  const [selectingFor, setSelectingFor] = useState<"in" | "out" | null>(null)

  const {
    amountOut,
    exchangeRate,
    isQuoting,
    quoteError,
    balanceIn,
    balanceOut,
    hasSufficientBalance,
    needsApproval,
    approve,
    isApproving,
    swap,
    isSwapping,
    swapTxHash,
    swapConfirmed,
    swapState,
    error,
    resetState,
  } = useSwap({ tokenIn, tokenOut, amountIn, slippage })

  const handleSwapTokens = useCallback(() => {
    const tmpToken = tokenIn
    setTokenIn(tokenOut)
    setTokenOut(tmpToken)
    setAmountIn(amountOut || "")
    resetState()
  }, [tokenIn, tokenOut, amountOut, resetState])

  const handleTokenSelect = useCallback(
    (token: TokenInfo) => {
      if (selectingFor === "in") {
        if (token.symbol === tokenOut.symbol) {
          setTokenOut(tokenIn)
        }
        setTokenIn(token)
      } else {
        if (token.symbol === tokenIn.symbol) {
          setTokenIn(tokenOut)
        }
        setTokenOut(token)
      }
      setAmountIn("")
      resetState()
    },
    [selectingFor, tokenIn, tokenOut, resetState]
  )

  const handleMaxClick = useCallback(() => {
    if (balanceIn && parseFloat(balanceIn) > 0) {
      // Leave a small amount for gas if native
      const max = tokenIn.isNative
        ? Math.max(0, parseFloat(balanceIn) - 0.005).toString()
        : balanceIn
      setAmountIn(max)
    }
  }, [balanceIn, tokenIn])

  // Button state logic
  const getButtonConfig = () => {
    if (!isConnected) return { label: "Connect Wallet", action: undefined, disabled: true, showConnect: true }
    if (!amountIn || parseFloat(amountIn) === 0) return { label: "Enter amount", action: undefined, disabled: true }
    if (isQuoting) return { label: "Fetching quote...", action: undefined, disabled: true, loading: true }
    if (quoteError) return { label: "No liquidity", action: undefined, disabled: true }
    if (!hasSufficientBalance) return { label: "Insufficient balance", action: undefined, disabled: true }
    if (needsApproval && !isApproving) return { label: `Approve ${tokenIn.symbol}`, action: approve, disabled: false }
    if (isApproving) return { label: "Approving...", action: undefined, disabled: true, loading: true }
    if (isSwapping) return { label: "Swapping...", action: undefined, disabled: true, loading: true }
    if (swapConfirmed) return { label: "Swap Successful!", action: undefined, disabled: true, success: true }
    if (error) return { label: error, action: undefined, disabled: true, isError: true }
    return { label: "Swap", action: swap, disabled: false }
  }

  const btnConfig = getButtonConfig()

  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Instant <span className="text-primary">Swaps</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trade any token on Base with deep liquidity and minimal slippage.
              Perfect for agents that need reliable execution.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Swap</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Slippage Settings */}
                {showSettings && (
                  <div className="bg-muted/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Max Slippage
                      </span>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {[0.1, 0.5, 1.0].map((val) => (
                        <button
                          key={val}
                          onClick={() => setSlippage(val)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            slippage === val
                              ? "bg-primary text-primary-foreground"
                              : "bg-background hover:bg-background/80 text-muted-foreground"
                          }`}
                        >
                          {val}%
                        </button>
                      ))}
                      <div className="flex items-center gap-1 bg-background rounded-lg px-2">
                        <input
                          type="number"
                          value={slippage}
                          onChange={(e) =>
                            setSlippage(
                              Math.min(50, Math.max(0.01, parseFloat(e.target.value) || 0.5))
                            )
                          }
                          className="w-12 bg-transparent text-sm text-foreground focus:outline-none text-right"
                          step="0.1"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* From Token */}
                <div className="bg-muted/50 rounded-2xl p-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>You pay</span>
                    <button
                      onClick={handleMaxClick}
                      className="hover:text-foreground transition-colors"
                    >
                      Balance:{" "}
                      {isConnected
                        ? parseFloat(balanceIn).toFixed(4)
                        : "-"}
                      {isConnected && (
                        <span className="ml-1 text-primary font-medium">MAX</span>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={amountIn}
                      onChange={(e) => {
                        setAmountIn(e.target.value)
                        resetState()
                      }}
                      className="border-0 bg-transparent text-2xl font-semibold p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    />
                    <button
                      onClick={() => setSelectingFor("in")}
                      className="flex items-center gap-2 bg-background rounded-full px-4 py-2 hover:bg-background/80 transition-colors shrink-0"
                    >
                      <img src={tokenIn.logo} alt={tokenIn.symbol} className="w-6 h-6 rounded-full" />
                      <span className="font-semibold">{tokenIn.symbol}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Swap Direction Button */}
                <div className="flex justify-center -my-2 relative z-10">
                  <button
                    onClick={handleSwapTokens}
                    className="bg-secondary hover:bg-secondary/80 p-3 rounded-xl border-4 border-background transition-colors group"
                  >
                    <ArrowDownUp className="w-5 h-5 text-secondary-foreground group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>

                {/* To Token */}
                <div className="bg-muted/50 rounded-2xl p-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>You receive</span>
                    <span>
                      Balance:{" "}
                      {isConnected
                        ? parseFloat(balanceOut).toFixed(4)
                        : "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={amountOut}
                      readOnly
                      className="border-0 bg-transparent text-2xl font-semibold p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    />
                    <button
                      onClick={() => setSelectingFor("out")}
                      className="flex items-center gap-2 bg-background rounded-full px-4 py-2 hover:bg-background/80 transition-colors shrink-0"
                    >
                      <img src={tokenOut.logo} alt={tokenOut.symbol} className="w-6 h-6 rounded-full" />
                      <span className="font-semibold">{tokenOut.symbol}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Price Info */}
                {amountIn && parseFloat(amountIn) > 0 && amountOut && (
                  <div className="bg-accent/5 rounded-xl p-3 text-sm space-y-1">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Rate</span>
                      <span>
                        1 {tokenIn.symbol} = {exchangeRate} {tokenOut.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Slippage tolerance</span>
                      <span>{slippage}%</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Fee</span>
                      <span className="text-primary">0.3%</span>
                    </div>
                  </div>
                )}

                {/* Quote loading indicator */}
                {isQuoting && amountIn && parseFloat(amountIn) > 0 && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Fetching best price...
                  </div>
                )}

                {/* Action Button */}
                {btnConfig.showConnect ? (
                  <div className="w-full [&>div]:w-full [&>div>button]:w-full [&>div>button]:h-14 [&>div>button]:rounded-xl [&>div>button]:text-lg [&>div>button]:font-semibold">
                    <ConnectButton />
                  </div>
                ) : (
                  <Button
                    size="lg"
                    onClick={btnConfig.action}
                    disabled={btnConfig.disabled}
                    className={`w-full rounded-xl h-14 text-lg font-semibold ${
                      btnConfig.success
                        ? "bg-green-600 hover:bg-green-600"
                        : btnConfig.isError
                        ? "bg-destructive hover:bg-destructive"
                        : needsApproval && !isApproving
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    {btnConfig.loading && (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    )}
                    {btnConfig.success && <Check className="w-5 h-5 mr-2" />}
                    {btnConfig.isError && (
                      <AlertTriangle className="w-5 h-5 mr-2" />
                    )}
                    {!btnConfig.loading && !btnConfig.success && !btnConfig.isError && (
                      <Zap className="w-5 h-5 mr-2" />
                    )}
                    {btnConfig.label}
                  </Button>
                )}

                {/* Tx hash link */}
                {swapTxHash && (
                  <div className="text-center">
                    <a
                      href={`https://sepolia.basescan.org/tx/${swapTxHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline"
                    >
                      View on BaseScan
                    </a>
                  </div>
                )}

                {/* Agent Mode */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Agent Mode Available
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Token Select Modal */}
      <TokenSelectModal
        open={selectingFor !== null}
        onClose={() => setSelectingFor(null)}
        onSelect={handleTokenSelect}
        selectedToken={selectingFor === "in" ? tokenOut : tokenIn}
      />
    </>
  )
}
