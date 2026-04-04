"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Rocket, Coins, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function EarlyAccessModal() {
  const { locale } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Always show after 1s delay on homepage
    const timer = setTimeout(() => setShow(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F0B90B]/10 rounded-full text-[#F0B90B] text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            {locale === "zh" ? "超级早期" : "Super Early"}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground text-center mb-3">
          {locale === "zh" ? "你来得很早！" : "You're Early!"}
        </h2>

        {/* Description */}
        <p className="text-center text-muted-foreground text-sm mb-6 leading-relaxed">
          {locale === "zh"
            ? "LiquidClaw 是 BNB Chain 上的 ve(3,3) AMM DEX。13个智能合约已部署在 BSC 主网并通过 BscScan 验证。LCLAW 代币已创建但尚未铸造首批供应量 — 你现在进入比所有人都早。"
            : "LiquidClaw is a ve(3,3) AMM DEX on BNB Chain. 13 smart contracts deployed on BSC mainnet, verified on BscScan. The LCLAW token is created but the first supply hasn't been minted yet — you're earlier than everyone."}
        </p>

        {/* Info Cards */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[#F0B90B]/10 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4 text-[#F0B90B]" />
            </div>
            <span className="text-muted-foreground">
              {locale === "zh"
                ? "LCLAW 代币供应量: 0 — 铸造尚未开始"
                : "LCLAW token supply: 0 — minting hasn't started yet"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[#F0B90B]/10 flex items-center justify-center shrink-0">
              <Rocket className="w-4 h-4 text-[#F0B90B]" />
            </div>
            <span className="text-muted-foreground">
              {locale === "zh"
                ? "13个合约已在 BSC 主网验证 — 协议已就绪"
                : "13 contracts verified on BSC mainnet — protocol is ready"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[#F0B90B]/10 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-[#F0B90B]" />
            </div>
            <span className="text-muted-foreground">
              {locale === "zh"
                ? "加入社区，成为第一批参与者"
                : "Join the community, be among the first participants"}
            </span>
          </div>
        </div>

        {/* Telegram CTA */}
        <a
          href="https://t.me/+M6vEgO1uifA3YjVh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-12 bg-[#229ED9] text-white font-semibold text-base rounded-xl hover:bg-[#1a8ac4] transition-colors mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          {locale === "zh" ? "加入 Telegram 社区" : "Join Telegram Community"}
        </a>

        {/* Secondary CTA */}
        <Button
          onClick={() => setShow(false)}
          variant="outline"
          className="w-full h-10 rounded-xl text-sm"
        >
          {locale === "zh" ? "浏览应用" : "Explore App"}
        </Button>

        {/* Bottom text */}
        <div className="mt-5 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            {locale === "zh"
              ? "ve(3,3) 模型 · AI 金库 · 多链部署 · BSC + Base"
              : "ve(3,3) Model · AI Vault · Multi-chain · BSC + Base"}
          </p>
        </div>
      </div>
    </div>
  )
}
