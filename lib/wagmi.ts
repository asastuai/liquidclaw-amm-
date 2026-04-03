"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { bsc, base, baseSepolia } from "wagmi/chains"

export const config = getDefaultConfig({
  appName: "LiquidClaw",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [bsc, base, baseSepolia],
  ssr: true,
})
