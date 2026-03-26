"use client"

import { AppHeader } from "@/components/liquid-claw/app-header"
import { Governance } from "@/components/liquid-claw/governance"

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <Governance />
    </div>
  )
}
