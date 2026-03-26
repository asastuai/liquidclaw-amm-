"use client"

import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

// Kawaii SVG Icons
function KawaiiSwapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Two cute drops swapping */}
      <path d="M7 8C7 8 5 11 5 13C5 15.2 6.8 17 9 17C11.2 17 13 15.2 13 13C13 11 11 8 11 8" fill="currentColor" fillOpacity="0.3"/>
      <ellipse cx="9" cy="13" rx="3" ry="3.5" fill="currentColor"/>
      {/* Happy face on drop */}
      <circle cx="8" cy="12.5" r="0.5" fill="white"/>
      <circle cx="10" cy="12.5" r="0.5" fill="white"/>
      <path d="M8 14C8.5 14.5 9.5 14.5 10 14" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>
      {/* Swap arrows */}
      <path d="M15 7L18 7M18 7L16 5M18 7L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 17L16 17M16 17L18 15M16 17L18 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function KawaiiStakeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cute lightning bolt with face */}
      <path d="M13 2L4 14H11L10 22L19 10H12L13 2Z" fill="currentColor" fillOpacity="0.3"/>
      <path d="M13 2L4 14H11L10 22L19 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Kawaii face */}
      <circle cx="10" cy="11" r="0.8" fill="currentColor"/>
      <circle cx="13" cy="11" r="0.8" fill="currentColor"/>
      <path d="M10 13.5C10.8 14.3 12.2 14.3 13 13.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
      {/* Sparkles */}
      <circle cx="17" cy="5" r="1" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="20" cy="8" r="0.5" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  )
}

function KawaiiVoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cute ballot box */}
      <rect x="4" y="10" width="16" height="10" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      {/* Slot */}
      <rect x="8" y="10" width="8" height="2" fill="currentColor"/>
      {/* Ballot paper with star */}
      <rect x="9" y="4" width="6" height="8" rx="1" fill="white" stroke="currentColor" strokeWidth="1"/>
      <path d="M12 6L12.5 7.5H14L12.75 8.5L13.25 10L12 9L10.75 10L11.25 8.5L10 7.5H11.5L12 6Z" fill="currentColor"/>
      {/* Kawaii face on box */}
      <circle cx="9" cy="15" r="0.8" fill="currentColor"/>
      <circle cx="15" cy="15" r="0.8" fill="currentColor"/>
      <path d="M10 17C11 18 13 18 14 17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  )
}

function KawaiiClaimIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cute gift box */}
      <rect x="4" y="10" width="16" height="10" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      {/* Ribbon vertical */}
      <rect x="11" y="10" width="2" height="10" fill="currentColor"/>
      {/* Lid */}
      <rect x="3" y="7" width="18" height="4" rx="1" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5"/>
      {/* Bow */}
      <circle cx="12" cy="5" r="2" fill="currentColor"/>
      <ellipse cx="9" cy="6" rx="2" ry="1.5" fill="currentColor" fillOpacity="0.7"/>
      <ellipse cx="15" cy="6" rx="2" ry="1.5" fill="currentColor" fillOpacity="0.7"/>
      {/* Kawaii face on box */}
      <circle cx="7" cy="14" r="0.6" fill="white"/>
      <circle cx="9" cy="14" r="0.6" fill="white"/>
      <path d="M7 15.5C7.5 16 8.5 16 9 15.5" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>
      {/* Sparkles */}
      <circle cx="18" cy="4" r="0.8" fill="currentColor"/>
      <circle cx="20" cy="7" r="0.5" fill="currentColor"/>
      <circle cx="4" cy="5" r="0.5" fill="currentColor"/>
    </svg>
  )
}

// Activity populated from on-chain events (requires indexer)
const activities: {
  id: number; type: string; description: string;
  amount: string; time: string; hash: string;
}[] = []

function getActivityIcon(type: string) {
  switch (type) {
    case "swap":
      return <KawaiiSwapIcon />
    case "stake":
      return <KawaiiStakeIcon />
    case "vote":
      return <KawaiiVoteIcon />
    case "claim":
      return <KawaiiClaimIcon />
    default:
      return null
  }
}

function getActivityBadgeColor(type: string) {
  switch (type) {
    case "swap":
      return "outline"
    case "stake":
      return "default"
    case "vote":
      return "secondary"
    case "claim":
      return "outline"
    default:
      return "outline"
  }
}

export function RecentActivity() {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
      </div>

      <Card className="overflow-hidden">
        {activities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No recent activity yet</p>
          </div>
        ) : (
        <div className="divide-y divide-border">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between p-6 hover:bg-muted/30 transition-colors ${
                index % 2 === 0 ? "bg-muted/10" : ""
              }`}
            >
              {/* Left: Icon + Description */}
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-lg ${
                  activity.type === "swap" ? "bg-blue-100 dark:bg-blue-900/30" :
                  activity.type === "stake" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                  activity.type === "vote" ? "bg-purple-100 dark:bg-purple-900/30" :
                  "bg-green-100 dark:bg-green-900/30"
                }`}>
                  <span className={`block ${
                    activity.type === "swap" ? "text-blue-600 dark:text-blue-400" :
                    activity.type === "stake" ? "text-yellow-600 dark:text-yellow-400" :
                    activity.type === "vote" ? "text-purple-600 dark:text-purple-400" :
                    "text-green-600 dark:text-green-400"
                  }`}>
                    {getActivityIcon(activity.type)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>

              {/* Right: Amount + Hash Link */}
              <div className="flex items-center gap-6 text-right">
                <span className="font-mono font-semibold text-foreground hidden sm:inline-block">
                  {activity.amount}
                </span>
                <a
                  href={`#`}
                  className="text-primary hover:underline flex items-center gap-1"
                  title={activity.hash}
                >
                  <span className="font-mono text-xs">{activity.hash}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        )}
      </Card>
    </div>
  )
}
