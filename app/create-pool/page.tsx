import { CreatePoolPage } from "@/components/liquid-claw/create-pool/create-pool-page"
import { Header } from "@/components/liquid-claw/header"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <CreatePoolPage />
      </div>
    </div>
  )
}
