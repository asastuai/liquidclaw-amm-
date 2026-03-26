"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/liquid-claw/header"
import { Footer } from "@/components/liquid-claw/footer"
import { CreateLockCard } from "./create-lock-card"
import { YourLocks } from "./your-locks"
import { VotingPowerOverview } from "./voting-power-overview"
import { LockInfoCallout } from "./lock-info-callout"

export function LockPage() {
  // TODO: Replace with real lock data from VotingEscrow
  const [locks, setLocks] = useState<{ id: number; amount: number; power: number; duration: number; expired: boolean; location: string }[]>([])

  const totalLocked = locks.reduce((sum, lock) => sum + lock.amount, 0)
  const totalPower = locks.reduce((sum, lock) => sum + (lock.expired ? 0 : lock.power), 0)
  const activeLocks = locks.filter(lock => !lock.expired)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">veLCLAW</h1>
            <p className="text-lg text-muted-foreground">
              Lock LCLAW to earn voting power, fees, and bribes
            </p>
          </div>

          {/* Create New Lock */}
          <div className="mb-12">
            <CreateLockCard />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Your Locks & Voting Power */}
            <div className="lg:col-span-2 space-y-8">
              <YourLocks locks={locks} setLocks={setLocks} />
              <VotingPowerOverview locks={activeLocks} totalLocked={totalLocked} totalPower={totalPower} />
            </div>

            {/* Right Column - Info */}
            <div className="lg:col-span-1">
              <LockInfoCallout />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
