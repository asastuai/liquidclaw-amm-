"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, Clock } from "lucide-react"

// TODO: Replace with real lock data from VotingEscrow
const locks: {
  id: number; amount: string; votingPower: number; maxPower: number;
  timeRemaining: string; location: string; expired: boolean;
}[] = []

export function VeLCLAWLocks() {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Your veLCLAW Locks</h2>
      </div>

      {locks.length === 0 ? (
        <Card className="p-12 text-center">
          <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No veLCLAW locks yet. Lock LCLAW to earn voting power.</p>
        </Card>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locks.map((lock) => (
          <Card key={lock.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">#{lock.id}</h3>
                <p className="text-sm text-muted-foreground mt-1 font-mono">{lock.amount}</p>
              </div>
              <Badge variant="outline">{lock.location}</Badge>
            </div>

            {/* Voting Power */}
            <div className="mb-4 pb-4 border-b border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Voting Power</span>
                <span className="font-mono text-sm text-foreground">
                  {lock.votingPower.toLocaleString()} / {lock.maxPower.toLocaleString()}
                </span>
              </div>
              <Progress value={(lock.votingPower / lock.maxPower) * 100} className="h-2" />
            </div>

            {/* Time Remaining */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              {lock.expired ? (
                <>
                  <span className="text-muted-foreground">Expired</span>
                  <Badge variant="secondary">Expired</Badge>
                </>
              ) : (
                <span className="text-muted-foreground">{lock.timeRemaining} remaining</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                {lock.expired ? "Withdraw" : "Vote"}
              </Button>
              {!lock.expired && (
                <>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Extend
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Increase
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
      )}
    </div>
  )
}
