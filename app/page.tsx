import { Header } from "@/components/liquid-claw/header"
import { Hero } from "@/components/liquid-claw/hero"
import { AgentsSection } from "@/components/liquid-claw/agents-section"
import { Footer } from "@/components/liquid-claw/footer"
import { EarlyAccessModal } from "@/components/liquid-claw/early-access-modal"

export default function LiquidClawPage() {
  return (
    <main className="min-h-screen bg-background">
      <EarlyAccessModal />
      <Header />
      <Hero />
      <AgentsSection />
      <Footer />
    </main>
  )
}
