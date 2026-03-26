"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Header } from "../header"
import { Footer } from "../footer"
import { Sparkles, Target, Users, Zap, Shield, Globe, Heart, Rocket, Anchor } from "lucide-react"

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Genesis",
    status: "completed",
    icon: Anchor,
    items: [
      "13 smart contracts deployed on Base mainnet",
      "USDC/USDT and ETH/USDC pools live",
      "Full frontend with 93 automated tests",
      "Security hardening: error boundaries, CSP headers, input validation",
      "WalletConnect integration + wrong network detection",
      "Tokenomics defined: ve(3,3) emission model with 2-year roadmap"
    ]
  },
  {
    phase: "Phase 2",
    title: "Ignition",
    status: "current",
    icon: Zap,
    items: [
      "veLCLAW governance system activation (coming days)",
      "LCLAW token minting + first emission epoch",
      "Gauge voting for pool emission allocation",
      "Bribe marketplace for projects to attract liquidity",
      "New pool pairs: LCLAW/WETH, LCLAW/USDC, VIRTUAL/WETH",
      "Partnership program launch (24-month vesting or veLCLAW commit)"
    ]
  },
  {
    phase: "Phase 3",
    title: "Expansion",
    status: "upcoming",
    icon: Target,
    items: [
      "AI Vault strategies go live: Yield Maximizer, Liquidity Deepener, Bribe Hunter",
      "AI Agent SDK for autonomous on-chain trading",
      "Perpetual DEX integration — SUR Protocol merge (25,000+ lines of battle-tested code)",
      "Leverage trading up to 20x on BTC, ETH, and more",
      "Advanced analytics dashboard with real-time P&L tracking",
      "Developer grants program for ecosystem builders"
    ]
  },
  {
    phase: "Phase 4",
    title: "Convergence",
    status: "future",
    icon: Rocket,
    items: [
      "LiquidClaw becomes the unified DeFi hub: spot + perps + lending",
      "Full DAO governance — protocol owned by the community",
      "Cross-chain deployment (Arbitrum, Optimism, more L2s)",
      "Institutional-grade APIs for market makers and funds",
      "Mobile app for trading on the go",
      "$100M+ TVL target with sustainable real yield"
    ]
  }
]

const visionPillars = [
  { icon: Users, title: "Community First", description: "Every feature driven by our community. 83% of emissions go directly to LPs and voters." },
  { icon: Shield, title: "Battle-Tested", description: "93 automated tests, security headers, input validation, and transparent on-chain contracts." },
  { icon: Zap, title: "Agent Native", description: "Built for autonomous agents. AI Vault manages veLCLAW positions with optimized strategies." },
  { icon: Globe, title: "The DeFi Hub", description: "Spot AMM today. Perpetual DEX tomorrow. One platform for all of DeFi on Base." }
]

// ========== BUBBLES ==========

interface ScrollBubble {
  id: number; x: number; y: number; size: number; speed: number; opacity: number
}

function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<ScrollBubble[]>([])
  const animationRef = useRef<number>(0)
  const lastScrollRef = useRef(0)

  const createBubble = useCallback((x: number, y: number): ScrollBubble => ({
    id: Math.random(), x: x + (Math.random() - 0.5) * 100, y,
    size: 4 + Math.random() * 10, speed: 0.4 + Math.random() * 1.2,
    opacity: 0.3 + Math.random() * 0.4
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    // Seed a few bubbles on load
    for (let i = 0; i < 8; i++) {
      bubblesRef.current.push(createBubble(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      ))
    }

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollRef.current)
      if (delta > 5) {
        const count = Math.min(Math.floor(delta / 10), 4)
        for (let i = 0; i < count; i++) {
          bubblesRef.current.push(createBubble(Math.random() * window.innerWidth, window.innerHeight + 10))
        }
      }
      lastScrollRef.current = window.scrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      bubblesRef.current = bubblesRef.current.filter(b => {
        b.y -= b.speed
        b.x += Math.sin(b.y * 0.012) * 0.4
        if (b.y < -30) return false
        // Bubble fill
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,220,255,${b.opacity * 0.15})`
        ctx.fill()
        // Bubble border
        ctx.strokeStyle = `rgba(200,220,255,${b.opacity * 0.4})`
        ctx.lineWidth = 0.8
        ctx.stroke()
        // Shine dot
        ctx.beginPath()
        ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.15, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.6})`
        ctx.fill()
        return true
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationRef.current)
    }
  }, [createBubble])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}

// ========== 1 FISH + 1 JELLYFISH (subtle) ==========

function SwimmingFish() {
  const [pos, setPos] = useState(-60)
  useEffect(() => {
    const interval = setInterval(() => {
      setPos(p => p > (typeof window !== "undefined" ? window.innerWidth + 60 : 1500) ? -60 : p + 0.4)
    }, 16)
    return () => clearInterval(interval)
  }, [])
  return (
    <svg className="fixed pointer-events-none z-[5] opacity-40" style={{ left: pos, top: "22%" }} width="40" height="24" viewBox="0 0 50 30">
      <ellipse cx="22" cy="15" rx="16" ry="10" fill="#3b82f6" />
      <path d="M38 15 L50 5 L48 15 L50 25 Z" fill="#3b82f6" />
      <circle cx="12" cy="12" r="4" fill="white" />
      <circle cx="11" cy="11" r="2.5" fill="#1a1a2e" />
      <circle cx="10" cy="10" r="0.8" fill="white" />
      <path d="M9 17 Q12 20 15 17" stroke="#1a1a2e" strokeWidth="1" fill="none" />
    </svg>
  )
}

function FloatingJellyfish() {
  const [pos, setPos] = useState({ x: typeof window !== "undefined" ? window.innerWidth + 50 : 1500, y: 55 })
  useEffect(() => {
    const interval = setInterval(() => {
      setPos(p => ({
        x: p.x < -50 ? (typeof window !== "undefined" ? window.innerWidth + 50 : 1500) : p.x - 0.3,
        y: 55 + Math.sin(Date.now() * 0.001) * 3
      }))
    }, 16)
    return () => clearInterval(interval)
  }, [])
  return (
    <svg className="fixed pointer-events-none z-[5] opacity-30" style={{ left: pos.x, top: `${pos.y}%` }} width="35" height="50" viewBox="0 0 40 56">
      <ellipse cx="20" cy="14" rx="12" ry="10" fill="#a78bfa" />
      <ellipse cx="14" cy="12" rx="4" ry="3" fill="white" opacity="0.3" />
      <circle cx="14" cy="16" r="1.5" fill="#1a1a2e" />
      <circle cx="26" cy="16" r="1.5" fill="#1a1a2e" />
      <path d="M17 20 Q20 23 23 20" stroke="#1a1a2e" strokeWidth="0.8" fill="none" />
      <path d="M12 28 Q10 36 14 44" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M20 28 Q18 38 20 48" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M28 28 Q30 36 26 44" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  )
}

export function RoadmapPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {mounted && <BubbleCanvas />}
      {mounted && <SwimmingFish />}
      {mounted && <FloatingJellyfish />}
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <Image
              src="/images/lobster-mascot.jpg"
              alt="LiquidClaw"
              fill
              priority
              className="object-contain rounded-full border-2 border-primary/20 shadow-xl"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">From AMM</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              To DeFi Hub
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Spot trading live on Base. Perpetual DEX coming. AI-powered strategies ahead. This is just the beginning.
          </p>

          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section
        id="vision"
        data-animate
        className={`relative py-24 px-4 transition-all duration-700 ${visibleSections.has("vision") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Our Vision
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Building for Tomorrow
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section
        id="roadmap"
        data-animate
        className={`relative py-24 px-4 transition-all duration-700 ${visibleSections.has("roadmap") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Roadmap
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              The Road Ahead
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-muted transform md:-translate-x-1/2" />

            {roadmapPhases.map((phase, index) => (
              <div
                key={phase.phase}
                className={`relative flex items-start gap-8 mb-20 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all
                    ${phase.status === "completed" ? "bg-green-500/10 border-green-500 text-green-500" : ""}
                    ${phase.status === "current" ? "bg-primary/10 border-primary text-primary" : ""}
                    ${phase.status === "upcoming" ? "bg-accent/10 border-accent/50 text-accent" : ""}
                    ${phase.status === "future" ? "bg-muted border-border text-muted-foreground" : ""}
                  `}>
                    <phase.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className={`bg-card/60 backdrop-blur-sm border rounded-2xl p-6 transition-all hover:shadow-lg
                    ${phase.status === "current" ? "border-primary/30" : "border-border"}
                  `}>
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className={`text-xs font-bold uppercase tracking-wider
                        ${phase.status === "completed" ? "text-green-500" : ""}
                        ${phase.status === "current" ? "text-primary" : ""}
                        ${phase.status === "upcoming" ? "text-accent" : ""}
                        ${phase.status === "future" ? "text-muted-foreground" : ""}
                      `}>
                        {phase.phase}
                      </span>
                      {phase.status === "current" && <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">In Progress</span>}
                      {phase.status === "completed" && <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">Complete</span>}
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-4">{phase.title}</h3>

                    <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {phase.items.map((item, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${phase.status === "completed" ? "bg-green-500" : "bg-primary/40"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        data-animate
        className={`relative py-24 px-4 transition-all duration-700 ${visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6">
              <Image src="/images/lobster-mascot.jpg" alt="LiquidClaw" width={80} height={80} className="rounded-full w-20 h-20 object-cover" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join the Journey</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Be part of building the future of decentralized liquidity on Base.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="/swap" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all">
                Start Trading
              </a>
              <a href="/docs" className="px-8 py-3 bg-card border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-all">
                Read Docs
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
