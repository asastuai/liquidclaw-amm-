"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Droplets } from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const navItems = [
  { label: "Swap", href: "/swap" },
  { label: "Pools", href: "/pools" },
  { label: "veLCLAW", href: "/governance" },
  { label: "AI Vault", href: "/ai-vault" },
]

export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Image
                src="/images/lobster-mascot.jpg"
                alt="LiquidClaw Mascot"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-foreground">
              Liquid<span className="text-primary">Claw</span>
            </span>
          </Link>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 rounded-xl p-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-sm">
              <Droplets className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium">Base</span>
            </div>
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus="address"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="mt-4 px-4">
                <ConnectButton
                  chainStatus="icon"
                  showBalance={false}
                  accountStatus="address"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
