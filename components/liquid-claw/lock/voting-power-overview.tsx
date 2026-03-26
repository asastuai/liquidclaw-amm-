"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

interface Lock {
  id: number
  amount: number
  power: number
}

interface VotingPowerOverviewProps {
  locks: Lock[]
  totalLocked: number
  totalPower: number
}

export function VotingPowerOverview({ locks, totalLocked, totalPower }: VotingPowerOverviewProps) {
  const chartData = locks.map((lock) => ({
    name: `Lock #${lock.id}`,
    value: lock.power,
  }))

  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/20 rounded-lg">
          <TrendingUp className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Voting Power Overview</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="flex items-center justify-center">
          {locks.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value.toLocaleString()} veLCLAW`}
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-muted-foreground">No locks to display</div>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Locked</p>
            <p className="text-3xl font-mono font-bold text-foreground">{totalLocked.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">LCLAW</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Power</p>
            <p className="text-3xl font-mono font-bold text-accent">{totalPower.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">veLCLAW</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Active Locks</p>
            <p className="text-3xl font-mono font-bold text-foreground">{locks.length}</p>
            <p className="text-xs text-muted-foreground">Positions</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
