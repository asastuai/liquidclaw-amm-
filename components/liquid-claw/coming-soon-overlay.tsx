"use client"

import { useRouter } from "next/navigation"
import { Clock, ArrowLeft } from "lucide-react"

interface ComingSoonOverlayProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

export function ComingSoonOverlay({
  title = "Coming Soon",
  description = "This feature is not yet available. Stay tuned!",
  children,
}: ComingSoonOverlayProps) {
  const router = useRouter()

  return (
    <div className="relative">
      {/* Blurred content behind */}
      <div className="pointer-events-none select-none opacity-30 blur-[2px]">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-2xl p-8 max-w-md text-center shadow-2xl">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Clock className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-6">{description}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
