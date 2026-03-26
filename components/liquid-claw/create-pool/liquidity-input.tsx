"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

type PoolType = "volatile" | "stable"

interface Token {
  symbol: string
  name: string
  balance: string
}

interface LiquidityInputProps {
  tokenA: Token
  tokenB: Token
  amountA: string
  amountB: string
  poolType: PoolType
  onAmountAChange: (amount: string) => void
  onAmountBChange: (amount: string) => void
}

export function LiquidityInput({
  tokenA,
  tokenB,
  amountA,
  amountB,
  poolType,
  onAmountAChange,
  onAmountBChange,
}: LiquidityInputProps) {
  const balanceA = parseFloat(tokenA.balance.replace(/,/g, ""))
  const balanceB = parseFloat(tokenB.balance.replace(/,/g, ""))

  const exchangeRate = amountA ? (parseFloat(amountA) > 0 ? (parseFloat(amountB) / parseFloat(amountA)).toFixed(6) : "0") : "0"

  return (
    <div className="space-y-6">
      <Alert className="border-accent/30 bg-accent/5">
        <AlertDescription className="text-sm">
          You are setting the initial price. Make sure the ratio reflects the market price.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {/* Token A Input */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">{tokenA.symbol} Amount</label>
            <button
              onClick={() => onAmountAChange(balanceA.toString())}
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              MAX
            </button>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={amountA}
              onChange={(e) => onAmountAChange(e.target.value)}
              className="pr-16 text-lg font-semibold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
              {tokenA.symbol}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Balance: {tokenA.balance}</p>
        </div>

        {/* Token B Input */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">{tokenB.symbol} Amount</label>
            <button
              onClick={() => onAmountBChange(balanceB.toString())}
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              MAX
            </button>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={amountB}
              onChange={(e) => onAmountBChange(e.target.value)}
              className="pr-16 text-lg font-semibold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
              {tokenB.symbol}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Balance: {tokenB.balance}</p>
        </div>
      </div>

      {/* Exchange Rate Preview */}
      {amountA && amountB && parseFloat(amountA) > 0 && parseFloat(amountB) > 0 && (
        <div className="bg-muted/30 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Exchange rate preview:</p>
          <p className="text-lg font-mono font-semibold text-foreground">
            1 {tokenA.symbol} = {exchangeRate} {tokenB.symbol}
          </p>
        </div>
      )}
    </div>
  )
}
