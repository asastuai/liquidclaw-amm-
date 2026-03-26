"use client"

import { AppHeader } from "@/components/liquid-claw/app-header"
import { SwapCard } from "@/components/liquid-claw/swap-card"

export default function SwapPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <SwapCard />
    </div>
  )
}
