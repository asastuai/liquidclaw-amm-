"use client"

import { AppHeader } from "@/components/liquid-claw/app-header"
import { Pools } from "@/components/liquid-claw/pools"

export default function PoolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <Pools />
    </div>
  )
}
