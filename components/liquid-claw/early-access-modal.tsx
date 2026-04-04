"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function EarlyAccessModal() {
  const { locale } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  const zh = locale === "zh"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShow(false)} />

      <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-[420px] w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#F0B90B] via-primary to-accent" />

        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3.5 right-3.5 p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-7 pt-6 pb-7">
          {/* Mascot + Title */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
              <Image src="/images/lobster-mascot.jpg" alt="LiquidClaw" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground leading-tight">
                LiquidClaw Finance
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                ve(3,3) AMM · BNB Chain
              </p>
            </div>
          </div>

          {/* Main message */}
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
            {zh
              ? "LiquidClaw 是一个全新的 ve(3,3) 去中心化交易所，已在 BNB Chain 主网部署了 13 个经过验证的智能合约。协议已就绪，LCLAW 代币的首批供应量尚未铸造 — 目前正在组建早期社区。"
              : "LiquidClaw is a new ve(3,3) decentralized exchange with 13 verified smart contracts live on BNB Chain mainnet. The protocol is ready — LCLAW token's initial supply hasn't been minted yet. We're building the early community now."}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-muted/50 rounded-xl px-3 py-2.5 text-center">
              <div className="text-sm font-bold text-foreground">13</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{zh ? "已验证合约" : "Verified Contracts"}</div>
            </div>
            <div className="bg-muted/50 rounded-xl px-3 py-2.5 text-center">
              <div className="text-sm font-bold text-foreground">2</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{zh ? "链 (BSC+Base)" : "Chains (BSC+Base)"}</div>
            </div>
            <div className="bg-muted/50 rounded-xl px-3 py-2.5 text-center">
              <div className="text-sm font-bold text-[#F0B90B]">0</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{zh ? "代币已铸造" : "Tokens Minted"}</div>
            </div>
          </div>

          {/* Telegram CTA */}
          <a
            href="https://t.me/+M6vEgO1uifA3YjVh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full h-11 bg-[#229ED9] text-white font-medium text-sm rounded-xl hover:bg-[#1a8ac4] transition-colors mb-3"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            {zh ? "加入 Telegram 社区" : "Join the Community on Telegram"}
          </a>

          {/* Explore */}
          <button
            onClick={() => setShow(false)}
            className="w-full h-10 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            {zh ? "先看看协议 →" : "Explore the Protocol →"}
          </button>
        </div>
      </div>
    </div>
  )
}
