"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets } from "lucide-react"
import Link from "next/link"

export function GaugeEmptyState() {
  return (
    <Card className="p-12 bg-card/80 backdrop-blur-sm border-border/50 text-center">
      <div className="max-w-md mx-auto">
        {/* Kawaii illustration */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-primary/20 flex items-center justify-center">
            <Droplets className="w-10 h-10 text-primary" />
          </div>
          {/* Decorative bubbles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent/30 float-1" />
          <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-secondary/40 float-2" />
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          No stakes yet!
        </h3>
        <p className="text-muted-foreground mb-6">
          You haven&apos;t staked any LP tokens yet. Provide liquidity to a pool and stake here to start earning LCLAW rewards.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-6">
            <Link href="/#pools">
              View Pools
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-border/50">
            <Link href="/#swap">
              Get LCLAW
            </Link>
          </Button>
        </div>

        {/* Kawaii message */}
        <p className="mt-8 text-sm text-muted-foreground">
          Start earning LCLAW rewards today!
        </p>
      </div>
    </Card>
  )
}
