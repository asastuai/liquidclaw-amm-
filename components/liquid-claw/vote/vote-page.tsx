'use client'

import { useState, useMemo } from 'react'
import { formatEther } from 'viem'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Vote, Timer, TrendingUp, AlertCircle, ChevronDown, X, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { getTokenIcon } from '@/lib/token-icons'
import { useUserVeNFTs } from '@/hooks/use-voting-escrow'
import { useI18n } from "@/lib/i18n"

interface Pool {
  id: string
  name: string
  tokens: string[]
  type: 'volatile' | 'stable'
  totalVotes: number
  bribes: { token: string; value: string }[]
  feesAPR: number
  bribesAPR: number
  userVote?: number
}

// Pools will come from Voter contract once gauges are created
const initialPools: Pool[] = []

export function VotePage() {
  const { veNFTs } = useUserVeNFTs()
  const [pools, setPools] = useState<Pool[]>(initialPools)
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(0)
  const [sortBy, setSortBy] = useState<'apr' | 'bribes' | 'votes' | 'fees'>('apr')
  const [searchTerm, setSearchTerm] = useState('')
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [dismissedBanner, setDismissedBanner] = useState(false)

  const selectedNFT = veNFTs[selectedNFTIndex]
  const userVotingPower = selectedNFT ? parseFloat(formatEther(selectedNFT.votingPower)) : 0
  const allocatedVotes = pools.reduce((sum, p) => sum + (p.userVote || 0), 0)
  const unallocatedVotes = 100 - allocatedVotes

  const updatePoolVote = (poolId: string, vote: number) => {
    const totalOtherVotes = pools.reduce((sum, p) => sum + (p.userVote || 0) - (p.id === poolId ? p.userVote || 0 : 0), 0)
    const maxVote = Math.min(100, Math.max(0, 100 - totalOtherVotes + (pools.find(p => p.id === poolId)?.userVote || 0)))
    
    setPools(pools.map(p =>
      p.id === poolId ? { ...p, userVote: Math.min(vote, maxVote) } : p
    ))
  }

  const resetVotes = () => {
    setPools(pools.map(p => ({ ...p, userVote: 0 })))
  }

  const sortedPools = [...pools]
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aTotal = a.feesAPR + a.bribesAPR
      const bTotal = b.feesAPR + b.bribesAPR
      
      switch (sortBy) {
        case 'apr':
          return bTotal - aTotal
        case 'bribes':
          return (b.bribes.length) - (a.bribes.length)
        case 'votes':
          return b.totalVotes - a.totalVotes
        case 'fees':
          return b.feesAPR - a.feesAPR
        default:
          return 0
      }
    })

  const allocatedPoolsList = pools.filter(p => p.userVote && p.userVote > 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-16 z-40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-2">
                <Vote className="w-8 h-8 text-primary" />
                Vote
              </h1>
              <p className="text-muted-foreground mt-1">
                Direct LCLAW emissions to pools and earn fees + bribes
              </p>
            </div>
          </div>

          {/* Epoch Info & Voting Power */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Epoch Countdown */}
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Timer className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Epoch 4 ends in</p>
                    <p className="text-xl font-bold text-foreground">3d 14h 22m</p>
                  </div>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">72% of epoch elapsed</p>
              </CardContent>
            </Card>

            {/* Voting Power */}
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Voting Power</p>
                    <p className="text-2xl font-bold text-foreground">{userVotingPower.toLocaleString()} veLCLAW</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Image src="/images/lobster-mascot.jpg" alt="NFT" width={20} height={20} className="rounded-full" />
                        NFT #1
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-muted-foreground">No veNFTs found</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      {!dismissedBanner && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <Alert className="border-accent/50 bg-accent/5">
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription className="text-foreground">
              Voting earns you 100% of trading fees from pools you vote for, plus any bribes offered. Vote wisely — your rewards depend on it.
            </AlertDescription>
            <button
              onClick={() => setDismissedBanner(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </button>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Input
              placeholder="Search by token name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Sort by
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('apr')}>Total APR</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('bribes')}>Bribes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('votes')}>Total Votes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('fees')}>Fees APR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Pools List */}
          <div className="space-y-4">
            {sortedPools.map((pool) => {
              const totalAPR = pool.feesAPR + pool.bribesAPR
              return (
                <Card key={pool.id} className="border border-border overflow-hidden hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-6 gap-6 items-center">
                      {/* Pool Info */}
                      <div className="md:col-span-1">
                        <div className="flex items-center gap-3">
                          <div className="relative flex -space-x-1">
                            <img src={getTokenIcon(pool.tokens[0])} alt={pool.tokens[0]} className="w-7 h-7 rounded-full ring-2 ring-card z-10 object-cover bg-muted" />
                            <img src={getTokenIcon(pool.tokens[1])} alt={pool.tokens[1]} className="w-7 h-7 rounded-full ring-2 ring-card object-cover bg-muted" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{pool.name}</p>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {pool.type === 'volatile' ? 'Volatile' : 'Stable'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Total Votes */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Votes</p>
                        <p className="font-semibold text-foreground">{pool.totalVotes}%</p>
                      </div>

                      {/* Bribes */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Bribes</p>
                        <div className="space-y-0.5">
                          {pool.bribes.slice(0, 2).map((bribe, i) => (
                            <p key={i} className="text-xs font-mono text-foreground">{bribe.value}</p>
                          ))}
                        </div>
                      </div>

                      {/* APRs */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Fees APR</p>
                        <p className="font-semibold text-foreground">{pool.feesAPR}%</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Bribe APR</p>
                        <p className="font-semibold text-foreground">{pool.bribesAPR}%</p>
                      </div>

                      {/* Total APR */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total APR</p>
                        <p className="text-lg font-bold text-primary">{totalAPR}%</p>
                      </div>

                      {/* Vote Input */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Your Vote</p>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={pool.userVote || 0}
                            onChange={(e) => updatePoolVote(pool.id, parseFloat(e.target.value) || 0)}
                            className="w-20 text-center font-mono"
                          />
                          <span className="text-sm font-mono text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <VoteSummaryCard
            pools={allocatedPoolsList}
            allocatedVotes={allocatedVotes}
            unallocatedVotes={unallocatedVotes}
            onReset={resetVotes}
          />
        </div>

        {/* Sidebar - Mobile */}
        <Button
          className="lg:hidden fixed bottom-6 right-6 rounded-full shadow-lg gap-2"
          size="lg"
          onClick={() => setShowMobileSidebar(true)}
        >
          <Vote className="w-5 h-5" />
          View Summary
        </Button>

        <Sheet open={showMobileSidebar} onOpenChange={setShowMobileSidebar}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Vote Summary</SheetTitle>
            </SheetHeader>
            <VoteSummaryCard
              pools={allocatedPoolsList}
              allocatedVotes={allocatedVotes}
              unallocatedVotes={unallocatedVotes}
              onReset={resetVotes}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

interface VoteSummaryCardProps {
  pools: Pool[]
  allocatedVotes: number
  unallocatedVotes: number
  onReset: () => void
}

function VoteSummaryCard({ pools, allocatedVotes, unallocatedVotes, onReset }: VoteSummaryCardProps) {
  return (
    <Card className="border border-border sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Your Vote Allocation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Allocated Pools */}
        {pools.length > 0 ? (
          <div className="space-y-3">
            {pools.map((pool) => (
              <div key={pool.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{pool.name}</span>
                <span className="font-mono text-accent font-semibold">{pool.userVote}%</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No votes allocated yet</p>
        )}

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Allocated</span>
            <span className="font-mono font-semibold text-foreground">{allocatedVotes}%</span>
          </div>
          <Progress value={allocatedVotes} className="h-3" />
        </div>

        {/* Warning if not 100% */}
        {unallocatedVotes > 0 && (
          <Alert className="border-accent/50 bg-accent/5">
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription className="text-sm text-foreground">
              You have {unallocatedVotes}% unallocated voting power
            </AlertDescription>
          </Alert>
        )}

        {/* Cast Vote Button */}
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg mt-6"
          disabled={allocatedVotes === 0}
        >
          Cast Vote
        </Button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full text-sm text-muted-foreground hover:text-foreground py-2 flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Votes
        </button>
      </CardContent>
    </Card>
  )
}
