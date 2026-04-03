"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "en" | "zh"

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.swap": "Swap",
    "nav.pools": "Pools",
    "nav.genesis": "Genesis",
    "nav.dashboard": "Dashboard",
    "nav.roadmap": "Roadmap",
    "nav.docs": "Docs",
    "nav.rewards": "Rewards",
    "nav.aiVault": "AI Vault",
    "nav.veLCLAW": "veLCLAW",
    "nav.vote": "Vote",
    "nav.gauges": "Gauges",
    "nav.lock": "Lock",
    "nav.more": "More",
    // Swap
    "swap.title": "Swap",
    "swap.from": "From",
    "swap.to": "To",
    "swap.balance": "Balance",
    "swap.connectWallet": "Connect Wallet",
    "swap.swapButton": "Swap",
    "swap.slippage": "Slippage Tolerance",
    "swap.rate": "Rate",
    "swap.priceImpact": "Price Impact",
    "swap.enterAmount": "Enter amount",
    "swap.insufficientBalance": "Insufficient balance",
    "swap.selectToken": "Select token",
    // Pools
    "pools.title": "Liquidity Pools",
    "pools.subtitle": "Provide liquidity and earn trading fees + LCLAW rewards",
    "pools.tvl": "TVL",
    "pools.apr": "APR",
    "pools.volume": "Volume (24h)",
    "pools.addLiquidity": "Add Liquidity",
    "pools.removeLiquidity": "Remove Liquidity",
    "pools.myPositions": "My Positions",
    "pools.stable": "Stable",
    "pools.volatile": "Volatile",
    // Genesis
    "genesis.title": "Genesis Event",
    "genesis.subtitle": "Be part of the LiquidClaw origin story",
    "genesis.earlyAccess": "Early Access",
    "genesis.joinWaitlist": "Join Waitlist",
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.totalValue": "Total Value",
    "dashboard.earnings": "Earnings",
    "dashboard.positions": "Positions",
    // Governance
    "gov.title": "Governance",
    "gov.votingPower": "Voting Power",
    "gov.lockLCLAW": "Lock LCLAW",
    "gov.yourLocks": "Your Locks",
    // Common
    "common.connect": "Connect Wallet",
    "common.loading": "Loading...",
    "common.noData": "No data available",
    "common.comingSoon": "Coming Soon",
    "common.network": "Network",
    "common.wrongNetwork": "Wrong network. Please switch to BNB Chain or Base.",
    "common.bnbChain": "BNB Chain",
    "common.base": "Base",
    // Token select
    "token.search": "Search tokens...",
    "token.select": "Select a token",
    // Footer ticker
    "ticker.points": "Points & Rewards system launching May 2026",
    "ticker.mainnet": "Live on BSC Mainnet",
    "ticker.paperTrading": "ve(3,3) tokenomics — lock, vote, earn",
    "ticker.leverage": "AI Vault manages votes automatically",
    "ticker.builtOn": "Multi-chain: BNB Chain + Base L2",
  },
  zh: {
    // Nav
    "nav.swap": "交换",
    "nav.pools": "流动池",
    "nav.genesis": "创世",
    "nav.dashboard": "仪表盘",
    "nav.roadmap": "路线图",
    "nav.docs": "文档",
    "nav.rewards": "奖励",
    "nav.aiVault": "AI金库",
    "nav.veLCLAW": "veLCLAW",
    "nav.vote": "投票",
    "nav.gauges": "量规",
    "nav.lock": "锁仓",
    "nav.more": "更多",
    // Swap
    "swap.title": "交换",
    "swap.from": "从",
    "swap.to": "到",
    "swap.balance": "余额",
    "swap.connectWallet": "连接钱包",
    "swap.swapButton": "交换",
    "swap.slippage": "滑点容忍度",
    "swap.rate": "汇率",
    "swap.priceImpact": "价格影响",
    "swap.enterAmount": "输入金额",
    "swap.insufficientBalance": "余额不足",
    "swap.selectToken": "选择代币",
    // Pools
    "pools.title": "流动性池",
    "pools.subtitle": "提供流动性，赚取交易手续费 + LCLAW 奖励",
    "pools.tvl": "总锁仓量",
    "pools.apr": "年化收益率",
    "pools.volume": "成交量 (24小时)",
    "pools.addLiquidity": "添加流动性",
    "pools.removeLiquidity": "移除流动性",
    "pools.myPositions": "我的仓位",
    "pools.stable": "稳定",
    "pools.volatile": "波动",
    // Genesis
    "genesis.title": "创世活动",
    "genesis.subtitle": "成为 LiquidClaw 起源故事的一部分",
    "genesis.earlyAccess": "抢先体验",
    "genesis.joinWaitlist": "加入候补名单",
    // Dashboard
    "dashboard.title": "仪表盘",
    "dashboard.totalValue": "总价值",
    "dashboard.earnings": "收益",
    "dashboard.positions": "仓位",
    // Governance
    "gov.title": "治理",
    "gov.votingPower": "投票权",
    "gov.lockLCLAW": "锁定 LCLAW",
    "gov.yourLocks": "你的锁仓",
    // Common
    "common.connect": "连接钱包",
    "common.loading": "加载中...",
    "common.noData": "暂无数据",
    "common.comingSoon": "即将推出",
    "common.network": "网络",
    "common.wrongNetwork": "网络错误，请切换到 BNB 链或 Base",
    "common.bnbChain": "BNB 链",
    "common.base": "Base",
    // Token select
    "token.search": "搜索代币...",
    "token.select": "选择代币",
    // Footer ticker
    "ticker.points": "积分和奖励系统将于2026年5月推出",
    "ticker.mainnet": "已在BSC主网上线",
    "ticker.paperTrading": "ve(3,3) 代币经济学 — 锁定、投票、赚取",
    "ticker.leverage": "AI金库自动管理投票",
    "ticker.builtOn": "多链：BNB链 + Base L2",
  },
}

interface I18nContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    if (typeof window !== "undefined") localStorage.setItem("lclaw-locale", l)
  }, [])

  const t = useCallback(
    (key: string) => translations[locale]?.[key] ?? translations.en[key] ?? key,
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export function LanguageToggle() {
  const { locale, setLocale } = useI18n()
  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      title={locale === "en" ? "切换到中文" : "Switch to English"}
    >
      {locale === "en" ? "中文" : "EN"}
    </button>
  )
}
