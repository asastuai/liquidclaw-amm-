"use client"

import { useState, useEffect } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { X, Sparkles, Check, Wallet, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const SIGNED_KEY = "lclaw_whitelist_signed"
const DISMISSED_KEY = "lclaw_whitelist_dismissed"

export function EarlyAccessModal() {
  const [show, setShow] = useState(false)
  const [signed, setSigned] = useState(false)
  const { address, isConnected } = useAccount()
  const { signMessage, isPending, isSuccess, isError } = useSignMessage()

  useEffect(() => {
    // Don't show if already signed
    if (localStorage.getItem(SIGNED_KEY)) {
      setSigned(true)
      return
    }
    // If dismissed, show again after 24 hours
    const dismissed = localStorage.getItem(DISMISSED_KEY)
    if (dismissed) {
      const dismissedAt = new Date(dismissed).getTime()
      const hoursAgo = (Date.now() - dismissedAt) / (1000 * 60 * 60)
      if (hoursAgo < 24) return
    }
    // Show after 1.5s delay
    const timer = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isSuccess && address) {
      localStorage.setItem(SIGNED_KEY, JSON.stringify({
        address,
        timestamp: new Date().toISOString(),
      }))
      setSigned(true)
    }
  }, [isSuccess, address])

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, new Date().toISOString())
    setShow(false)
  }

  const handleSign = () => {
    signMessage({
      message: `I'm reserving my spot for the LiquidClaw Finance Genesis Event.\n\nWallet: ${address}\nDate: ${new Date().toISOString().split("T")[0]}\n\nThis signature does not trigger a transaction or cost any gas.`,
    })
  }

  if (!show || signed) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Super Early
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-foreground text-center mb-3">
          You&apos;re Early
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6 leading-relaxed">
          The Liquidity Genesis Event hasn&apos;t started yet. Reserve your spot on the whitelist
          by signing with your wallet. No gas fees. No commitment. Just priority access.
        </p>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">First access when Genesis Event opens</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">Early supporter recognition on-chain</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">Zero cost — just a signature, no transaction</span>
          </div>
        </div>

        {/* Action */}
        {!isConnected ? (
          <div className="flex flex-col items-center gap-3">
            <ConnectButton />
            {typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && !(window as any).ethereum && (
              <div className="text-center mt-2 space-y-2">
                <p className="text-xs text-muted-foreground">No wallet detected? Open this page in your wallet app:</p>
                <a
                  href={`https://metamask.app.link/dapp/${typeof window !== "undefined" ? window.location.host : "liquidclawfinance.com"}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500/10 text-orange-600 rounded-full text-xs font-medium hover:bg-orange-500/20 transition-colors"
                >
                  Open in MetaMask
                </a>
              </div>
            )}
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm font-semibold text-foreground">You&apos;re on the list!</p>
            <p className="text-xs text-muted-foreground">{address?.slice(0, 6)}...{address?.slice(-4)} reserved</p>
            <Button onClick={() => setShow(false)} variant="outline" className="rounded-full mt-2">
              Continue to App
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={handleSign}
              disabled={isPending}
              className="w-full h-12 rounded-xl text-base font-semibold"
            >
              {isPending ? (
                "Check your wallet..."
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Sign to Reserve Your Spot
                </>
              )}
            </Button>
            {isError && (
              <p className="text-xs text-destructive text-center">Signature rejected. Try again or close this dialog.</p>
            )}
            <p className="text-xs text-muted-foreground text-center">
              This is a free signature — no gas, no transaction, no cost.
            </p>
          </div>
        )}

        {/* Wallet count */}
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Join the early supporters building DeFi on Base
          </p>
        </div>
      </div>
    </div>
  )
}
