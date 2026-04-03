"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Code2, Zap, Shield, Cpu, Webhook } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const featureKeys = [
  { icon: Bot, titleKey: "agents.feat1.title", descKey: "agents.feat1.desc" },
  { icon: Code2, titleKey: "agents.feat2.title", descKey: "agents.feat2.desc" },
  { icon: Zap, titleKey: "agents.feat3.title", descKey: "agents.feat3.desc" },
  { icon: Shield, titleKey: "agents.feat4.title", descKey: "agents.feat4.desc" },
  { icon: Cpu, titleKey: "agents.feat5.title", descKey: "agents.feat5.desc" },
  { icon: Webhook, titleKey: "agents.feat6.title", descKey: "agents.feat6.desc" },
]

export function AgentsSection() {
  const { t } = useI18n()

  return (
    <section id="agents" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              {t("agents.badge")}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              {t("agents.title")}{" "}
              <span className="text-primary">{t("agents.titleHighlight")}</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              {t("agents.subtitle")}
            </p>

            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <div className="font-mono text-sm">
                <div className="text-muted-foreground">{"// Swap with LiquidClaw SDK"}</div>
                <div className="mt-2">
                  <span className="text-accent">const</span>{" "}
                  <span className="text-foreground">result</span>{" "}
                  <span className="text-muted-foreground">=</span>{" "}
                  <span className="text-accent">await</span>{" "}
                  <span className="text-primary">liquidClaw</span>
                  <span className="text-foreground">.swap</span>
                  <span className="text-muted-foreground">{"({"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-foreground">tokenIn</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-green-500">{'"BNB"'}</span>
                  <span className="text-muted-foreground">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-foreground">tokenOut</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-green-500">{'"USDC"'}</span>
                  <span className="text-muted-foreground">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-foreground">amount</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-orange-400">{"parseEther('1.0')"}</span>
                </div>
                <div className="text-muted-foreground">{"})"}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                <Link href="/docs/for-builders#contract-addresses">{t("agents.getAddresses")}</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/docs/for-builders">{t("agents.readDocs")}</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {featureKeys.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-accent/50 transition-colors group"
              >
                <CardContent className="p-5">
                  <feature.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
