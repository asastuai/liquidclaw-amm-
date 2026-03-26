"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Copy, ExternalLink } from "lucide-react"
import { TokenSelector } from "./token-selector"
import { PoolTypeSelector } from "./pool-type-selector"
import { LiquidityInput } from "./liquidity-input"

type PoolType = "volatile" | "stable"

interface PoolState {
  tokenA: { symbol: string; name: string; balance: string } | null
  tokenB: { symbol: string; name: string; balance: string } | null
  poolType: PoolType
  amountA: string
  amountB: string
  created: boolean
  poolAddress?: string
}

export function CreatePoolPage() {
  const [state, setState] = useState<PoolState>({
    tokenA: null,
    tokenB: null,
    poolType: "volatile",
    amountA: "",
    amountB: "",
    created: false,
  })

  const [copied, setCopied] = useState(false)

  const handleTokenASelect = (token: { symbol: string; name: string; balance: string }) => {
    if (token.symbol === state.tokenB?.symbol) {
      alert("Cannot select the same token for both positions")
      return
    }
    setState({ ...state, tokenA: token })
  }

  const handleTokenBSelect = (token: { symbol: string; name: string; balance: string }) => {
    if (token.symbol === state.tokenA?.symbol) {
      alert("Cannot select the same token for both positions")
      return
    }
    setState({ ...state, tokenB: token })
  }

  const handleSwapTokens = () => {
    setState({
      ...state,
      tokenA: state.tokenB,
      tokenB: state.tokenA,
      amountA: state.amountB,
      amountB: state.amountA,
    })
  }

  const handleCreatePool = () => {
    setState({
      ...state,
      created: true,
      poolAddress: "0x" + Math.random().toString(16).slice(2, 42),
    })
  }

  const handleCopyAddress = () => {
    if (state.poolAddress) {
      navigator.clipboard.writeText(state.poolAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const canCreatePool = state.tokenA && state.tokenB && state.amountA && state.amountB

  if (state.created && state.poolAddress) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Create Pool</h1>
            <p className="text-muted-foreground">Deploy a new liquidity pool — no permission needed</p>
          </div>

          <Card className="border-border">
            <CardContent className="pt-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Pool Created Successfully!</h2>
                <p className="text-muted-foreground mb-6">Your {state.poolType === "volatile" ? "Volatile" : "Stable"} pool is now live.</p>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Pool Address</p>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-sm bg-background px-3 py-2 rounded-lg flex-1 break-all">
                    {state.poolAddress}
                  </code>
                  <button
                    onClick={handleCopyAddress}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </div>
              </div>

              <Alert className="mb-6 border-accent/50 bg-accent/5">
                <AlertDescription className="text-sm">
                  To enable LCLAW emission rewards for this pool, a Gauge must be created through governance.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Pool
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => setState({ tokenA: null, tokenB: null, poolType: "volatile", amountA: "", amountB: "", created: false })}
                >
                  Create Another Pool
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create Pool</h1>
          <p className="text-muted-foreground">Deploy a new liquidity pool — no permission needed</p>
        </div>

        <Card className="border-border">
          <CardContent className="pt-8 space-y-6">
            {/* Token Selection */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Token A</label>
                <TokenSelector value={state.tokenA} onChange={handleTokenASelect} />
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <button
                  onClick={handleSwapTokens}
                  className="bg-secondary hover:bg-secondary/80 p-3 rounded-xl border-4 border-background transition-colors"
                  disabled={!state.tokenA || !state.tokenB}
                >
                  <svg className="w-5 h-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Token B</label>
                <TokenSelector value={state.tokenB} onChange={handleTokenBSelect} />
              </div>

              {state.tokenA && state.tokenB && state.tokenA.symbol === state.tokenB.symbol && (
                <Alert className="border-destructive/50 bg-destructive/5">
                  <AlertDescription className="text-sm text-destructive">
                    Please select different tokens
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Pool Type Selector */}
            {state.tokenA && state.tokenB && (
              <PoolTypeSelector 
                selected={state.poolType}
                onChange={(type) => setState({ ...state, poolType: type })}
              />
            )}

            {/* Liquidity Input */}
            {state.tokenA && state.tokenB && (
              <LiquidityInput
                tokenA={state.tokenA}
                tokenB={state.tokenB}
                amountA={state.amountA}
                amountB={state.amountB}
                poolType={state.poolType}
                onAmountAChange={(amount) => {
                  setState({ ...state, amountA: amount })
                  // Simulate price calculation
                  const ratio = state.poolType === "volatile" ? 0.065 : 0.95
                  setState(prev => ({ ...prev, amountB: (parseFloat(amount) * ratio).toFixed(4) || "" }))
                }}
                onAmountBChange={(amount) => setState({ ...state, amountB: amount })}
              />
            )}

            {/* Summary */}
            {state.tokenA && state.tokenB && state.amountA && state.amountB && (
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pool</span>
                  <span className="font-semibold text-foreground">
                    {state.tokenA.symbol} / {state.tokenB.symbol} ({state.poolType === "volatile" ? "Volatile" : "Stable"})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Initial Liquidity</span>
                  <span className="font-semibold text-foreground">
                    {state.amountA} {state.tokenA.symbol} + {state.amountB} {state.tokenB.symbol}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Trading Fee</span>
                  <span className="font-semibold text-foreground">{state.poolType === "volatile" ? "0.30%" : "0.05%"}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-sm">
                  <span className="text-muted-foreground">You will receive</span>
                  <span className="font-semibold text-primary">{(parseFloat(state.amountA) * 100).toFixed(2)} LP tokens</span>
                </div>
              </div>
            )}

            {/* Create Pool Button */}
            <Button
              onClick={handleCreatePool}
              disabled={!canCreatePool}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Pool
            </Button>

            {state.amountA && (parseFloat(state.amountA) < 0.001 || parseFloat(state.amountB) < 0.001) && (
              <Alert className="border-orange-500/50 bg-orange-500/5">
                <AlertDescription className="text-sm text-orange-600">
                  ⚠️ Very small amounts may result in poor price discovery
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
