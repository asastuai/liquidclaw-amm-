"use client"

import { useAccount, useChainId, useSwitchChain } from "wagmi"
import { bsc, base, baseSepolia } from "wagmi/chains"
import { AlertTriangle } from "lucide-react"

const SUPPORTED_CHAIN_IDS: readonly number[] = [bsc.id, base.id, baseSepolia.id]

export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()

  if (!isConnected || SUPPORTED_CHAIN_IDS.includes(chainId)) {
    return <>{children}</>
  }

  return (
    <>
      <div className="fixed top-16 left-0 right-0 z-40 bg-destructive/95 text-destructive-foreground px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Wrong network. Please switch to BNB Chain or Base.</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => switchChain({ chainId: bsc.id })}
              disabled={isPending}
              className="px-4 py-1.5 text-xs font-medium rounded-full bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 transition-colors disabled:opacity-50"
            >
              {isPending ? "Switching..." : "BNB Chain"}
            </button>
            <button
              onClick={() => switchChain({ chainId: base.id })}
              disabled={isPending}
              className="px-4 py-1.5 text-xs font-medium rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
            >
              Base
            </button>
          </div>
        </div>
      </div>
      <div className="pt-12">{children}</div>
    </>
  )
}
