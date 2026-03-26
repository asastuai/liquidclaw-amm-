"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Code2, Zap, Shield, Cpu, Webhook } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "Agent-First Design",
    description: "Built from the ground up for autonomous agents. Simple API, predictable execution, no surprises.",
  },
  {
    icon: Code2,
    title: "SDK & Libraries",
    description: "TypeScript, Python, and Rust SDKs. Integrate LiquidClaw into your agent in minutes.",
  },
  {
    icon: Zap,
    title: "Low Latency",
    description: "Optimized for speed. Sub-100ms quote responses and efficient on-chain execution.",
  },
  {
    icon: Shield,
    title: "MEV Protection",
    description: "Built-in MEV protection keeps your agents safe from front-running and sandwich attacks.",
  },
  {
    icon: Cpu,
    title: "Simulation Mode",
    description: "Test your strategies without spending gas. Full simulation environment included.",
  },
  {
    icon: Webhook,
    title: "Webhooks & Events",
    description: "Real-time notifications for swaps, pool events, and price movements.",
  },
]

export function AgentsSection() {
  return (
    <section id="agents" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              For Autonomous Agents
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Your Agents Deserve{" "}
              <span className="text-primary">Better Liquidity</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              LiquidClaw is the AMM that understands agents. We built everything 
              your autonomous systems need: reliable quotes, predictable execution, 
              and developer-friendly APIs.
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
                  <span className="text-green-500">{'"ETH"'}</span>
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
                <Link href="/docs/for-builders#contract-addresses">Get Contract Addresses</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/docs/for-builders">Read the Docs</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-accent/50 transition-colors group"
              >
                <CardContent className="p-5">
                  <feature.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
