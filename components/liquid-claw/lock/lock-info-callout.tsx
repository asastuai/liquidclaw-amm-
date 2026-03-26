"use client"

import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function LockInfoCallout() {
  return (
    <Alert className="border-accent/20 bg-accent/5">
      <Info className="h-4 w-4 text-accent" />
      <AlertDescription className="text-sm leading-relaxed text-foreground">
        <p className="font-semibold mb-2">How veLCLAW Works</p>
        <p className="text-xs text-muted-foreground mb-3">
          veLCLAW voting power decays linearly over time. Lock your LCLAW to earn:
        </p>
        <ul className="text-xs space-y-2 text-muted-foreground">
          <li>• <strong>Voting power</strong> - Govern protocol decisions</li>
          <li>• <strong>Protocol fees</strong> - Share in trading fees</li>
          <li>• <strong>Bribe rewards</strong> - Earn from pool incentives</li>
          <li>• <strong>Emission rebates</strong> - Receive LCLAW rebates</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          <strong>Power ratio:</strong> 2-year lock = 1:1 | 1-year lock = 0.5:1 | 1-month lock = 0.08:1
        </p>
        <p className="text-xs text-accent mt-3">
          Extend your lock anytime to refresh your power.
        </p>
      </AlertDescription>
    </Alert>
  )
}
