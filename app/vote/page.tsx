import { VotePage } from '@/components/liquid-claw/vote/vote-page'
import { Header } from '@/components/liquid-claw/header'
import { ComingSoonOverlay } from '@/components/liquid-claw/coming-soon-overlay'

export default function Vote() {
  return (
    <>
      <Header />
      <ComingSoonOverlay
        title="Voting Coming Soon"
        description="Direct LCLAW emissions to pools and earn fees + bribes. Available after the first emission epoch."
      >
        <VotePage />
      </ComingSoonOverlay>
    </>
  )
}
