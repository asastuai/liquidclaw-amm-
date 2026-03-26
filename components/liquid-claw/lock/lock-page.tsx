"use client"

import { useMemo } from "react"
import { formatEther } from "viem"
import { Header } from "@/components/liquid-claw/header"
import { Footer } from "@/components/liquid-claw/footer"
import { CreateLockCard } from "./create-lock-card"
import { YourLocks } from "./your-locks"
import { VotingPowerOverview } from "./voting-power-overview"
import { LockInfoCallout } from "./lock-info-callout"
import { useUserVeNFTs } from "@/hooks/use-voting-escrow"

export function LockPage() {
  const { veNFTs, isLoading } = useUserVeNFTs()

  const locks = useMemo(() => {
    const now = BigInt(Math.floor(Date.now() / 1000))
    return veNFTs.map((nft) => ({
      id: Number(nft.tokenId),
      amount: parseFloat(formatEther(nft.lockedAmount)),
      power: parseFloat(formatEther(nft.votingPower)),
      duration: nft.isPermanent ? 730 : Math.max(0, Number(nft.lockEnd - now) / 86400),
      expired: !nft.isPermanent && nft.lockEnd < now,
      location: "wallet" as const,
    }))
  }, [veNFTs])

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
              <YourLocks locks={locks} />
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
