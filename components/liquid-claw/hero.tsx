"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Bot, Shield } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { w: 45, h: 32, left: "10%", delay: "0s", duration: "9.5s" },
          { w: 34, h: 50, left: "25%", delay: "1.5s", duration: "11s" },
          { w: 38, h: 28, left: "40%", delay: "3s", duration: "8.2s" },
          { w: 26, h: 55, left: "55%", delay: "4.5s", duration: "10.3s" },
          { w: 42, h: 24, left: "70%", delay: "6s", duration: "10.4s" },
          { w: 53, h: 37, left: "85%", delay: "7.5s", duration: "8.1s" },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/10 animate-bubble"
            style={{
              width: `${b.w}px`,
              height: `${b.h}px`,
              left: b.left,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-6">
              {t("hero.title1")}{" "}
              <span className="text-primary">{t("hero.title2")}</span>{" "}
              {t("hero.title3")}
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-pretty">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-lg h-14 group"
                asChild
              >
                <Link href="/swap">
                  {t("hero.startSwapping")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-lg h-14 border-2"
                asChild
              >
                <Link href="/pools">
                  {t("hero.explorePools")}
                </Link>
              </Button>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                {t("hero.pill1")}
              </div>
              <div className="px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
                {t("hero.pill2")}
              </div>
              <div className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
                {t("hero.pill3")}
              </div>
            </div>
          </div>

          {/* Right Content - Mascot & Cards */}
          <div className="relative flex items-center justify-center">
            {/* Main Mascot */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-3xl" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float">
                <Image
                  src="/images/lobster-mascot.jpg"
                  alt="LiquidClaw - Kawaii Lobster Mascot"
                  fill
                  className="object-contain rounded-3xl"
                  priority
                />
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="absolute -top-4 -right-4 sm:top-0 sm:right-0 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
              <Bot className="w-8 h-8 text-accent mb-2" />
              <div className="text-sm font-semibold text-foreground">{t("hero.agentReady")}</div>
              <div className="text-xs text-muted-foreground">{t("hero.apiFirst")}</div>
            </div>

            <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-0 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
              <Shield className="w-8 h-8 text-primary mb-2" />
              <div className="text-sm font-semibold text-foreground">{t("hero.secure")}</div>
              <div className="text-xs text-muted-foreground">{t("hero.audited")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
