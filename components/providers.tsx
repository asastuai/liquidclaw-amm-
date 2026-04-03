"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { ThemeProvider } from "@/components/theme-provider"
import { config } from "@/lib/wagmi"
import { useState } from "react"

import { NetworkGuard } from "@/components/liquid-claw/network-guard"
import { I18nProvider } from "@/lib/i18n"

import "@rainbow-me/rainbowkit/styles.css"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <I18nProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "oklch(0.65 0.2 25)",
                accentColorForeground: "white",
                borderRadius: "large",
                fontStack: "system",
              })}
            >
              <NetworkGuard>{children}</NetworkGuard>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
