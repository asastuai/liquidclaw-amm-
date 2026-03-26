"use client"

import { ChevronDown } from "lucide-react"
import { getTokenIcon } from "@/lib/token-icons"

interface Token {
  symbol: string
  name: string
  balance: string
}

interface TokenSelectorProps {
  value: Token | null
  onChange: (token: Token) => void
}

const availableTokens: Token[] = [
  { symbol: "LCLAW", name: "LiquidClaw", balance: "10,000" },
  { symbol: "WETH", name: "Wrapped Ether", balance: "2.451" },
  { symbol: "USDC", name: "USD Coin", balance: "5,234.56" },
  { symbol: "USDT", name: "Tether", balance: "3,500" },
  { symbol: "DAI", name: "Dai Stablecoin", balance: "8,000" },
  { symbol: "VIRTUAL", name: "Virtual", balance: "500" },
]

export function TokenSelector({ value, onChange }: TokenSelectorProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-muted/50 hover:bg-muted rounded-xl p-4 transition-colors border border-border"
      >
        <span className="flex items-center gap-3">
          {value ? (
            <>
              <img src={getTokenIcon(value.symbol)} alt={value.symbol} className="w-8 h-8 rounded-full object-cover bg-muted" />
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">{value.symbol}</div>
                <div className="text-xs text-muted-foreground">{value.name}</div>
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">Select token</span>
          )}
        </span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {availableTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onChange(token)
                  setOpen(false)
                }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <img src={getTokenIcon(token.symbol)} alt={token.symbol} className="w-8 h-8 rounded-full object-cover bg-muted" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-foreground">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="text-sm font-mono text-muted-foreground">{token.balance}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import React from "react"
