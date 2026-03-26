import { LockPage } from "@/components/liquid-claw/lock/lock-page"
import { ComingSoonOverlay } from "@/components/liquid-claw/coming-soon-overlay"

export default function LockRoute() {
  return (
    <ComingSoonOverlay
      title="veLCLAW Coming Soon"
      description="Lock LCLAW to earn voting power, fees, and bribes. This feature will launch once the community is established."
    >
      <LockPage />
    </ComingSoonOverlay>
  )
}
