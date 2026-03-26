"use client"

import { AppHeader } from "@/components/liquid-claw/app-header"
import { AIVault } from "@/components/liquid-claw/ai-vault"

export default function AIVaultPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <AIVault />
    </div>
  )
}
