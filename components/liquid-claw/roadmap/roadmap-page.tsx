"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Header } from "../header"
import { Footer } from "../footer"
import { Sparkles, Target, Users, Zap, Shield, Globe, Heart, Rocket, Anchor } from "lucide-react"

// ========== KAWAII SVG CREATURES ==========

function KawaiiStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9H22L16 14L18.5 22L12 17L5.5 22L8 14L2 9H9.5L12 2Z" />
      <circle cx="10" cy="12" r="1" fill="white" opacity="0.8" />
      <circle cx="14" cy="12" r="1" fill="white" opacity="0.8" />
      <path d="M10 14.5C11 15.5 13 15.5 14 14.5" stroke="white" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function KawaiiFish({ color = "#f97316", size = 40, flip = false }: { color?: string; size?: number; flip?: boolean }) {
  return (
    <svg 
      width={size} 
      height={size * 0.6} 
      viewBox="0 0 50 30" 
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Body */}
      <ellipse cx="22" cy="15" rx="16" ry="10" fill={color} />
      {/* Tail */}
      <path d="M38 15 L50 5 L48 15 L50 25 Z" fill={color} />
      {/* Fins */}
      <ellipse cx="22" cy="6" rx="6" ry="3" fill={color} opacity="0.7" />
      <ellipse cx="22" cy="24" rx="5" ry="2" fill={color} opacity="0.6" />
      {/* Eye */}
      <circle cx="12" cy="12" r="5" fill="white" />
      <circle cx="11" cy="11" r="3" fill="#1a1a2e" />
      <circle cx="10" cy="10" r="1" fill="white" />
      {/* Blush */}
      <ellipse cx="18" cy="16" rx="3" ry="2" fill="#fda4af" opacity="0.5" />
      {/* Smile */}
      <path d="M9 17 Q12 20 15 17" stroke="#1a1a2e" strokeWidth="1" fill="none" />
      {/* Scales pattern */}
      <ellipse cx="26" cy="12" rx="2" ry="3" fill={color} opacity="0.5" stroke="white" strokeWidth="0.5" />
      <ellipse cx="30" cy="15" rx="2" ry="3" fill={color} opacity="0.5" stroke="white" strokeWidth="0.5" />
      <ellipse cx="26" cy="18" rx="2" ry="3" fill={color} opacity="0.5" stroke="white" strokeWidth="0.5" />
    </svg>
  )
}

function KawaiiJellyfish({ color = "#c084fc", size = 50 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56">
      {/* Dome */}
      <ellipse cx="20" cy="16" rx="16" ry="14" fill={color} opacity="0.8" />
      <ellipse cx="20" cy="14" rx="12" ry="10" fill={color} />
      {/* Shine */}
      <ellipse cx="14" cy="12" rx="4" ry="3" fill="white" opacity="0.4" />
      {/* Face */}
      <circle cx="14" cy="16" r="2" fill="#1a1a2e" />
      <circle cx="26" cy="16" r="2" fill="#1a1a2e" />
      <circle cx="13" cy="15" r="0.8" fill="white" />
      <circle cx="25" cy="15" r="0.8" fill="white" />
      <path d="M17 21 Q20 24 23 21" stroke="#1a1a2e" strokeWidth="1" fill="none" />
      {/* Tentacles */}
      <path d="M8 28 Q6 36 10 44 Q8 48 12 56" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M16 28 Q14 38 16 48 Q14 52 18 56" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M24 28 Q26 38 24 48 Q26 52 22 56" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M32 28 Q34 36 30 44 Q32 48 28 56" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
    </svg>
  )
}

function KawaiiOctopus({ color = "#fb7185", size = 60 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Head */}
      <ellipse cx="30" cy="22" rx="18" ry="16" fill={color} />
      {/* Spots */}
      <circle cx="20" cy="16" r="3" fill={color} opacity="0.6" />
      <circle cx="38" cy="14" r="2" fill={color} opacity="0.6" />
      <circle cx="28" cy="10" r="2" fill={color} opacity="0.6" />
      {/* Eyes */}
      <ellipse cx="24" cy="22" rx="4" ry="5" fill="white" />
      <ellipse cx="36" cy="22" rx="4" ry="5" fill="white" />
      <circle cx="24" cy="23" r="2.5" fill="#1a1a2e" />
      <circle cx="36" cy="23" r="2.5" fill="#1a1a2e" />
      <circle cx="23" cy="22" r="1" fill="white" />
      <circle cx="35" cy="22" r="1" fill="white" />
      {/* Blush */}
      <ellipse cx="18" cy="28" rx="3" ry="2" fill="#fda4af" opacity="0.5" />
      <ellipse cx="42" cy="28" rx="3" ry="2" fill="#fda4af" opacity="0.5" />
      {/* Smile */}
      <path d="M26 30 Q30 34 34 30" stroke="#1a1a2e" strokeWidth="1.5" fill="none" />
      {/* Tentacles */}
      <path d="M14 36 Q8 44 14 52 Q10 56 16 58" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M22 38 Q18 46 22 54 Q20 58 24 60" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M30 38 Q30 48 30 58" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M38 38 Q42 46 38 54 Q40 58 36 60" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M46 36 Q52 44 46 52 Q50 56 44 58" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function KawaiiSeahorse({ color = "#fbbf24", size = 50, flip = false }: { color?: string; size?: number; flip?: boolean }) {
  return (
    <svg width={size * 0.6} height={size} viewBox="0 0 30 50" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      {/* Body */}
      <path d="M15 8 Q22 12 20 20 Q22 28 18 36 Q20 42 15 48 Q12 44 14 38 Q10 32 12 24 Q8 18 12 12 Q10 8 15 8" fill={color} />
      {/* Snout */}
      <ellipse cx="8" cy="14" rx="6" ry="3" fill={color} />
      {/* Eye */}
      <circle cx="14" cy="12" r="3" fill="white" />
      <circle cx="14" cy="12" r="1.5" fill="#1a1a2e" />
      <circle cx="13.5" cy="11.5" r="0.5" fill="white" />
      {/* Blush */}
      <ellipse cx="10" cy="16" rx="2" ry="1.5" fill="#fda4af" opacity="0.5" />
      {/* Fin */}
      <ellipse cx="20" cy="20" rx="4" ry="6" fill={color} opacity="0.7" />
      {/* Crown */}
      <path d="M12 6 L14 2 L16 6 L18 3 L17 8" fill={color} />
    </svg>
  )
}

function Seaweed({ className, variant = 1 }: { className?: string; variant?: number }) {
  const colors = variant === 1 ? "#10b981" : variant === 2 ? "#34d399" : "#6ee7b7"
  return (
    <svg className={className} viewBox="0 0 30 100" fill={colors}>
      <path d="M15 100 C15 80, 5 70, 15 50 C25 30, 10 20, 15 0" stroke={colors} strokeWidth="4" fill="none" />
      <ellipse cx="8" cy="30" rx="6" ry="10" opacity="0.5" />
      <ellipse cx="22" cy="50" rx="5" ry="8" opacity="0.5" />
      <ellipse cx="10" cy="70" rx="6" ry="10" opacity="0.5" />
    </svg>
  )
}

function Coral({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 50" fill={color}>
      <ellipse cx="30" cy="45" rx="25" ry="5" opacity="0.3" />
      <path d="M30 45 L30 30 M30 35 L20 25 M30 35 L40 25 M20 25 L15 15 M20 25 L25 18 M40 25 L35 18 M40 25 L45 15" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="15" r="4" />
      <circle cx="25" cy="18" r="3" />
      <circle cx="35" cy="18" r="3" />
      <circle cx="45" cy="15" r="4" />
    </svg>
  )
}

// ========== ANIMATED BUBBLE SYSTEM ==========

interface ScrollBubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<ScrollBubble[]>([])
  const animationRef = useRef<number>(0)
  const lastScrollRef = useRef(0)

  const createBubble = useCallback((x: number, y: number): ScrollBubble => ({
    id: Math.random(),
    x: x + (Math.random() - 0.5) * 100,
    y,
    size: 4 + Math.random() * 12,
    speed: 1 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.4
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Scroll handler to create bubbles
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollDelta = Math.abs(scrollY - lastScrollRef.current)
      
      if (scrollDelta > 5) {
        const numBubbles = Math.min(Math.floor(scrollDelta / 10), 5)
        for (let i = 0; i < numBubbles; i++) {
          const x = Math.random() * window.innerWidth
          const y = window.innerHeight + 20
          bubblesRef.current.push(createBubble(x, y))
        }
      }
      lastScrollRef.current = scrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      bubblesRef.current = bubblesRef.current.filter(bubble => {
        bubble.y -= bubble.speed
        bubble.x += Math.sin(bubble.y * 0.02) * 0.5
        
        if (bubble.y < -50) return false

        // Draw bubble
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.3})`
        ctx.fill()
        ctx.strokeStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()
        
        // Shine
        ctx.beginPath()
        ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.8})`
        ctx.fill()

        return true
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", handleScroll)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [createBubble])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  )
}

// ========== SWIMMING FISH COMPONENT ==========

interface SwimmingFishData {
  id: number
  type: "fish" | "jellyfish" | "seahorse" | "octopus"
  color: string
  size: number
  y: number
  speed: number
  direction: "left" | "right"
  delay: number
}

function SwimmingFish({ fish }: { fish: SwimmingFishData }) {
  const [position, setPosition] = useState(fish.direction === "right" ? -100 : window.innerWidth + 100)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setPosition(prev => {
          const newPos = fish.direction === "right" ? prev + fish.speed : prev - fish.speed
          if (fish.direction === "right" && newPos > window.innerWidth + 100) {
            return -100
          }
          if (fish.direction === "left" && newPos < -100) {
            return window.innerWidth + 100
          }
          return newPos
        })
      }, 16)
      return () => clearInterval(interval)
    }, fish.delay)
    
    return () => clearTimeout(timeout)
  }, [fish])

  const renderCreature = () => {
    switch (fish.type) {
      case "fish":
        return <KawaiiFish color={fish.color} size={fish.size} flip={fish.direction === "right"} />
      case "jellyfish":
        return <KawaiiJellyfish color={fish.color} size={fish.size} />
      case "seahorse":
        return <KawaiiSeahorse color={fish.color} size={fish.size} flip={fish.direction === "right"} />
      case "octopus":
        return <KawaiiOctopus color={fish.color} size={fish.size} />
      default:
        return null
    }
  }

  return (
    <div 
      className="fixed pointer-events-none z-5"
      style={{ 
        left: position,
        top: `${fish.y}%`,
        transition: "none",
        animation: fish.type === "jellyfish" ? "wave 3s ease-in-out infinite" : undefined
      }}
    >
      {renderCreature()}
    </div>
  )
}

// ========== FLOATING PARTICLES ==========

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Light particles / plankton */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${2 + (i % 3) * 2}px`,
            height: `${2 + (i % 3) * 2}px`,
            left: `${(i * 5) % 100}%`,
            top: `${(i * 7) % 100}%`,
            animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  )
}

// ========== WAVE LAYER ==========

function WaveLayer() {
  return (
    <div className="fixed inset-x-0 top-0 h-40 pointer-events-none z-0 overflow-hidden">
      <svg viewBox="0 0 1440 320" className="absolute top-0 w-full wave-1" preserveAspectRatio="none">
        <path fill="hsl(var(--accent))" fillOpacity="0.1" d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
      <svg viewBox="0 0 1440 320" className="absolute top-4 w-full wave-2" preserveAspectRatio="none">
        <path fill="hsl(var(--primary))" fillOpacity="0.08" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,165.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
    </div>
  )
}

// ========== DATA ==========

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

const swimmingFish: SwimmingFishData[] = [
  { id: 1, type: "fish", color: "#f97316", size: 50, y: 15, speed: 1.2, direction: "right", delay: 0 },
  { id: 2, type: "fish", color: "#3b82f6", size: 35, y: 30, speed: 0.8, direction: "left", delay: 2000 },
  { id: 3, type: "jellyfish", color: "#c084fc", size: 45, y: 45, speed: 0.5, direction: "right", delay: 4000 },
  { id: 4, type: "fish", color: "#10b981", size: 40, y: 60, speed: 1.5, direction: "left", delay: 1000 },
  { id: 5, type: "seahorse", color: "#fbbf24", size: 55, y: 75, speed: 0.6, direction: "right", delay: 3000 },
  { id: 6, type: "fish", color: "#fb7185", size: 30, y: 85, speed: 1.0, direction: "left", delay: 5000 },
  { id: 7, type: "octopus", color: "#f472b6", size: 50, y: 50, speed: 0.4, direction: "right", delay: 6000 },
]

// ========== MAIN COMPONENT ==========

export function RoadmapPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setMounted(true)
    
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
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-primary/10 overflow-hidden relative">
      {/* Background layers */}
      <WaveLayer />
      
      {/* Swimming creatures */}
      {mounted && swimmingFish.map(fish => (
        <SwimmingFish key={fish.id} fish={fish} />
      ))}
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Scroll-triggered bubbles */}
      {mounted && <BubbleCanvas />}
      
      {/* Static decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Seaweed forest */}
        <div className="absolute bottom-0 left-[3%]"><Seaweed className="w-10 h-32 seaweed" variant={1} /></div>
        <div className="absolute bottom-0 left-[8%]"><Seaweed className="w-8 h-28 seaweed-2" variant={2} /></div>
        <div className="absolute bottom-0 left-[15%]"><Seaweed className="w-6 h-24 seaweed-3" variant={3} /></div>
        <div className="absolute bottom-0 right-[5%]"><Seaweed className="w-12 h-36 seaweed" variant={1} /></div>
        <div className="absolute bottom-0 right-[12%]"><Seaweed className="w-8 h-28 seaweed-2" variant={2} /></div>
        <div className="absolute bottom-0 right-[18%]"><Seaweed className="w-7 h-24 seaweed-3" variant={3} /></div>
        
        {/* Coral reef */}
        <Coral className="absolute bottom-0 left-[25%] w-20 h-16 text-primary/50" />
        <Coral className="absolute bottom-0 left-[35%] w-14 h-12 text-pink-400/40" color="#f472b6" />
        <Coral className="absolute bottom-0 right-[28%] w-16 h-14 text-orange-400/40" color="#fb923c" />
        <Coral className="absolute bottom-0 right-[40%] w-12 h-10 text-purple-400/40" color="#a78bfa" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 z-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Mascot */}
          <div className="relative inline-block mb-8">
            <div className="relative w-44 h-44 mx-auto swim">
              <Image
                src="/images/lobster-mascot.jpg"
                alt="LiquidClaw Mascot"
                fill
                loading="eager"
                priority
                className="object-contain rounded-full border-4 border-primary/30 shadow-2xl"
              />
              <KawaiiStar className="absolute -top-3 -right-3 w-8 h-8 text-yellow-400 float-1" />
              <KawaiiStar className="absolute -bottom-2 -left-4 w-6 h-6 text-yellow-300 float-2" />
              <KawaiiStar className="absolute top-1/2 -right-6 w-5 h-5 text-pink-400 float-3" />
              <div className="absolute top-2 right-10 w-3 h-3 rounded-full bg-white/30 border border-white/40 float-1" />
              <div className="absolute bottom-6 -right-2 w-4 h-4 rounded-full bg-white/20 border border-white/30 float-2" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="text-foreground">From AMM</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse">
              To DeFi Hub
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty">
            Spot trading live on Base. Perpetual DEX coming. AI-powered strategies ahead. This is just the beginning.
          </p>

          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to dive deeper</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section 
        id="vision" 
        data-animate
        className={`relative py-24 px-4 z-20 transition-all duration-1000 ${visibleSections.has("vision") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Our Vision
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Building for Tomorrow
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionPillars.map((pillar, index) => (
              <div 
                key={pillar.title}
                className="group relative bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-white/30 border border-white/40 float-1" />
                
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <pillar.icon className="w-7 h-7 text-primary" />
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
        className={`relative py-24 px-4 z-20 transition-all duration-1000 ${visibleSections.has("roadmap") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Roadmap
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Journey Through The Depths
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full transform md:-translate-x-1/2" />
            
            {roadmapPhases.map((phase, index) => (
              <div 
                key={phase.phase}
                className={`relative flex items-start gap-8 mb-20 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all
                    ${phase.status === "completed" ? "bg-green-500 border-green-400 text-white" : ""}
                    ${phase.status === "current" ? "bg-primary border-primary/50 text-primary-foreground animate-pulse" : ""}
                    ${phase.status === "upcoming" ? "bg-accent/20 border-accent/50 text-accent" : ""}
                    ${phase.status === "future" ? "bg-muted border-border text-muted-foreground" : ""}
                  `}>
                    <phase.icon className="w-7 h-7" />
                  </div>
                  {phase.status === "current" && (
                    <>
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/30 border border-white/40 float-1" />
                      <KawaiiStar className="absolute -bottom-2 -left-2 w-5 h-5 text-yellow-400 float-2" />
                    </>
                  )}
                </div>

                <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className={`bg-card/60 backdrop-blur-md border rounded-2xl p-6 hover:shadow-xl transition-all
                    ${phase.status === "current" ? "border-primary/50 shadow-primary/10" : "border-border"}
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
                      {phase.status === "current" && <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">In Progress</span>}
                      {phase.status === "completed" && <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded-full">Complete</span>}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">{phase.title}</h3>
                    
                    <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {phase.items.map((item, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${phase.status === "completed" ? "bg-green-500" : "bg-primary/50"}`} />
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
        className={`relative py-24 px-4 z-20 transition-all duration-1000 ${visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-3xl p-8 md:p-12 border border-primary/20 overflow-hidden backdrop-blur-md">
            <KawaiiStar className="absolute top-4 right-4 w-8 h-8 text-yellow-400/60 float-1" />
            <KawaiiStar className="absolute bottom-8 left-8 w-6 h-6 text-pink-400/50 float-2" />
            <div className="absolute top-1/2 right-12 w-4 h-4 rounded-full bg-white/20 border border-white/30 float-3" />
            
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto mb-6 swim">
                <Image src="/images/lobster-mascot.jpg" alt="LiquidClaw" width={96} height={96} loading="eager" className="object-contain rounded-full w-24 h-24" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join the Journey</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Be part of building the future of decentralized liquidity. Connect with our community and start your voyage today.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/#swap" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105">
                  Start Trading
                </a>
                <a href="/docs" className="px-8 py-3 bg-card border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-all hover:scale-105">
                  Read Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
