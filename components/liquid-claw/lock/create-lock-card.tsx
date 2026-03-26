"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Lock, Info } from "lucide-react"

const PRESETS = [
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
  { label: "6 months", days: 180 },
  { label: "1 year", days: 365 },
  { label: "2 years", days: 730 },
]

export function CreateLockCard() {
  const [amount, setAmount] = useState("")
  const [duration, setDuration] = useState(365)
  
  const maxPower = 100000
  const powerRatio = duration / 730
  const predictedPower = amount ? Math.floor(parseInt(amount) * powerRatio) : 0
  const expiryDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Create New Lock</h2>
      </div>

      <div className="space-y-6">
        {/* Amount Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">LCLAW Amount</label>
            <span className="text-xs text-muted-foreground">Balance: 500,000 LCLAW</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="font-mono text-lg"
            />
            <Button variant="outline" className="px-4">MAX</Button>
          </div>
        </div>

        {/* Duration Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">Lock Duration</label>
            <span className="text-sm font-mono text-accent">{(duration / 365).toFixed(2)} years</span>
          </div>
          <Slider
            value={[duration]}
            onValueChange={(val) => setDuration(val[0])}
            min={30}
            max={730}
            step={1}
            className="mb-2"
          />
          <div className="flex gap-2 flex-wrap">
            {PRESETS.map((preset) => (
              <Button
                key={preset.days}
                variant={duration === preset.days ? "default" : "outline"}
                size="sm"
                onClick={() => setDuration(preset.days)}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">You will receive:</span>
            <span className="font-mono font-bold text-foreground text-lg">{predictedPower.toLocaleString()} veLCLAW</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Lock expires:</span>
            <span className="font-mono text-foreground">{expiryDate}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Power vs Max Possible</span>
              <span>{((predictedPower / maxPower) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={Math.min((predictedPower / maxPower) * 100, 100)} className="h-2" />
          </div>
        </div>

        {/* Info Text */}
        <div className="flex gap-2 text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>Longer locks = more voting power. Max 2 years = 1:1 ratio.</p>
        </div>

        {/* CTA */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold">
          Lock LCLAW
        </Button>
      </div>
    </Card>
  )
}
