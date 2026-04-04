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
    // Hero
    "hero.badge": "Built for Autonomous Agents on BNB Chain",
    "hero.title1": "The Friendliest",
    "hero.title2": "AMM",
    "hero.title3": "in the Ocean",
    "hero.subtitle": "LiquidClaw brings effortless swaps and deep liquidity pools to BNB Chain. Designed from the ground up for AI agents, bots, and DeFi integrators who need reliable, permissionless liquidity.",
    "hero.startSwapping": "Start Swapping",
    "hero.explorePools": "Explore Pools",
    "hero.pill1": "ve(3,3) Model",
    "hero.pill2": "AI-Powered Voting",
    "hero.pill3": "Built on BNB Chain",
    "hero.agentReady": "Agent Ready",
    "hero.apiFirst": "API-first design",
    "hero.secure": "Secure",
    "hero.audited": "Audited contracts",
    // Agents section
    "agents.badge": "For Autonomous Agents",
    "agents.title": "Your Agents Deserve",
    "agents.titleHighlight": "Better Liquidity",
    "agents.subtitle": "LiquidClaw is the AMM that understands agents. We built everything your autonomous systems need: reliable quotes, predictable execution, and developer-friendly APIs.",
    "agents.getAddresses": "Get Contract Addresses",
    "agents.readDocs": "Read the Docs",
    "agents.feat1.title": "Agent-First Design",
    "agents.feat1.desc": "Built from the ground up for autonomous agents. Simple API, predictable execution, no surprises.",
    "agents.feat2.title": "SDK & Libraries",
    "agents.feat2.desc": "TypeScript, Python, and Rust SDKs. Integrate LiquidClaw into your agent in minutes.",
    "agents.feat3.title": "Low Latency",
    "agents.feat3.desc": "Optimized for speed. Sub-100ms quote responses and efficient on-chain execution.",
    "agents.feat4.title": "MEV Protection",
    "agents.feat4.desc": "Built-in MEV protection keeps your agents safe from front-running and sandwich attacks.",
    "agents.feat5.title": "Simulation Mode",
    "agents.feat5.desc": "Test your strategies without spending gas. Full simulation environment included.",
    "agents.feat6.title": "Webhooks & Events",
    "agents.feat6.desc": "Real-time notifications for swaps, pool events, and price movements.",
    // Footer
    "footer.description": "The friendliest AMM in the ocean. Built for autonomous agents on BNB Chain.",
    "footer.protocol": "Protocol",
    "footer.community": "Community",
    "footer.resources": "Resources",
    "footer.tagline": "The friendliest AMM on BNB Chain. Built for autonomous agents and the next generation of on-chain liquidity.",
    "footer.copyright": "© 2026 LiquidClaw. Built on BNB Chain.",
    "footer.operational": "All systems operational",
    "footer.governance": "Governance",
    "footer.developers": "Developers",
    "footer.documentation": "Documentation",
    "footer.forBuilders": "For Builders",
    "footer.tokenomics": "Tokenomics",
    // Pools page
    "pools.title2": "Liquidity Pools",
    "pools.subtitle2": "Earn Yield with Deep Liquidity",
    "pools.desc": "Provide liquidity to earn trading fees. Stake LP tokens in gauges to earn LCLAW rewards when emissions go live.",
    "pools.yourPosition": "Your Position",
    // Swap extra
    "swap.instant": "Instant",
    "swap.youPay": "You pay",
    "swap.youReceive": "You receive",
    "swap.agentMode": "Agent Mode Available",
    "swap.maxSlippage": "Max Slippage",
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
    // Hero
    "hero.badge": "为BNB链上的自主代理而生",
    "hero.title1": "海洋中最友好的",
    "hero.title2": "AMM",
    "hero.title3": "去中心化交易所",
    "hero.subtitle": "LiquidClaw 为BNB链带来轻松的代币交换和深度流动性池。专为需要可靠、无许可流动性的AI代理、机器人和DeFi集成商而设计。",
    "hero.startSwapping": "开始交换",
    "hero.explorePools": "探索流动池",
    "hero.pill1": "ve(3,3) 模型",
    "hero.pill2": "AI驱动投票",
    "hero.pill3": "基于BNB链",
    "hero.agentReady": "代理就绪",
    "hero.apiFirst": "API优先设计",
    "hero.secure": "安全可靠",
    "hero.audited": "已审计合约",
    // Agents section
    "agents.badge": "为自主代理而生",
    "agents.title": "您的代理值得拥有",
    "agents.titleHighlight": "更好的流动性",
    "agents.subtitle": "LiquidClaw 是最懂代理的AMM。我们为您的自主系统构建了一切所需：可靠的报价、可预测的执行和开发者友好的API。",
    "agents.getAddresses": "获取合约地址",
    "agents.readDocs": "阅读文档",
    "agents.feat1.title": "代理优先设计",
    "agents.feat1.desc": "从零开始为自主代理构建。简单的API，可预测的执行，无意外。",
    "agents.feat2.title": "SDK和库",
    "agents.feat2.desc": "TypeScript、Python和Rust SDK。几分钟内将LiquidClaw集成到您的代理中。",
    "agents.feat3.title": "低延迟",
    "agents.feat3.desc": "为速度优化。亚100毫秒报价响应和高效链上执行。",
    "agents.feat4.title": "MEV保护",
    "agents.feat4.desc": "内置MEV保护，保护您的代理免受抢跑和三明治攻击。",
    "agents.feat5.title": "模拟模式",
    "agents.feat5.desc": "无需消耗Gas即可测试策略。包含完整的模拟环境。",
    "agents.feat6.title": "Webhooks和事件",
    "agents.feat6.desc": "实时通知交换、池事件和价格变动。",
    // Footer
    "footer.description": "海洋中最友好的AMM。为BNB链上的自主代理而生。",
    "footer.protocol": "协议",
    "footer.community": "社区",
    "footer.resources": "资源",
    "footer.tagline": "BNB链上最友好的AMM。为自主代理和下一代链上流动性而生。",
    "footer.copyright": "© 2026 LiquidClaw. 建于BNB链。",
    "footer.operational": "所有系统正常运行",
    "footer.governance": "治理",
    "footer.developers": "开发者",
    "footer.documentation": "文档",
    "footer.forBuilders": "开发者指南",
    "footer.tokenomics": "代币经济学",
    // Pools page
    "pools.title2": "流动性池",
    "pools.subtitle2": "通过深度流动性赚取收益",
    "pools.desc": "提供流动性赚取交易手续费。质押LP代币赚取LCLAW奖励。",
    "pools.yourPosition": "您的仓位",
    // Swap extra
    "swap.instant": "即时",
    "swap.youPay": "您支付",
    "swap.youReceive": "您收到",
    "swap.agentMode": "代理模式可用",
    "swap.maxSlippage": "最大滑点",
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
