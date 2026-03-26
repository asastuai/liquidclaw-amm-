import { RewardsPage } from "@/components/liquid-claw/rewards/rewards-page"
import { ComingSoonOverlay } from "@/components/liquid-claw/coming-soon-overlay"

export default function RewardsRoute() {
  return (
    <ComingSoonOverlay
      title="Rewards Coming Soon"
      description="Claim trading fees, bribes, and emission rewards. Available after gauges are live."
    >
      <RewardsPage />
    </ComingSoonOverlay>
  )
}
