"use client"

import { AppHeader } from "@/components/liquid-claw/app-header"
import { Governance } from "@/components/liquid-claw/governance"
import { ComingSoonOverlay } from "@/components/liquid-claw/coming-soon-overlay"

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <ComingSoonOverlay
        title="Governance Coming Soon"
        description="Create locks, manage your veLCLAW, and participate in governance. Launching soon."
      >
        <Governance />
      </ComingSoonOverlay>
    </div>
  )
}
