"use client"

import { Clock, Lock } from "lucide-react"

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
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}
