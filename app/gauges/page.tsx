import { GaugesPage } from "@/components/liquid-claw/gauges/gauges-page"
import { ComingSoonOverlay } from "@/components/liquid-claw/coming-soon-overlay"

export default function Gauges() {
  return (
    <ComingSoonOverlay
      title="Gauges Coming Soon"
      description="Stake your LP tokens to earn LCLAW rewards. Gauges will activate with the first emission epoch."
    >
      <GaugesPage />
    </ComingSoonOverlay>
  )
}
