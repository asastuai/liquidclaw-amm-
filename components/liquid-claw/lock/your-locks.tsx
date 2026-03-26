"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Lock, Unlock, Clock, Plus, ArrowRight, Vault } from "lucide-react"

interface LockItem {
  id: number
  amount: number
  power: number
  duration: number
  expired: boolean
  location: "wallet" | "vault"
}

interface YourLocksProps {
  locks: LockItem[]
  setLocks: (locks: LockItem[]) => void
}

export function YourLocks({ locks, setLocks }: YourLocksProps) {
  const [selectedLock, setSelectedLock] = useState<number | null>(null)
  const [newAmount, setNewAmount] = useState("")
  const [newDuration, setNewDuration] = useState(365)

  const handleExtend = (lockId: number) => {
    setLocks(locks.map(lock => 
      lock.id === lockId ? { ...lock, duration: Math.max(lock.duration, newDuration) } : lock
    ))
    setSelectedLock(null)
    setNewAmount("")
    setNewDuration(365)
  }

  const handleIncrease = (lockId: number) => {
    setLocks(locks.map(lock => 
      lock.id === lockId 
        ? { 
            ...lock, 
            amount: lock.amount + parseInt(newAmount || "0"),
            power: lock.power + Math.floor(parseInt(newAmount || "0") * (lock.duration / 730))
          } 
        : lock
    ))
    setSelectedLock(null)
    setNewAmount("")
  }

  const handleUnlock = (lockId: number) => {
    setLocks(locks.filter(lock => lock.id !== lockId))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Your Locks</h2>
      <div className="grid gap-4">
        {locks.length === 0 ? (
          <Card className="p-12 text-center">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No locks yet. Create your first lock to start earning!</p>
          </Card>
        ) : (
          locks.map((lock) => (
            <Card key={lock.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Left - Token ID & Amount */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono">#{lock.id}</Badge>
                    {lock.location === "vault" && (
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                        <Vault className="w-3 h-3 mr-1" />
                        AI Vault
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Locked Amount</p>
                    <p className="text-2xl font-mono font-bold text-foreground">{lock.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">LCLAW</p>
                  </div>
                </div>

                {/* Middle - Power & Decay */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Voting Power</p>
                      <p className="text-sm font-mono font-bold text-accent">{lock.power.toLocaleString()} veLCLAW</p>
                    </div>
                    <Progress 
                      value={Math.min((lock.power / 100000) * 100, 100)} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {((lock.power / 100000) * 100).toFixed(1)}% of max possible
                    </p>
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {lock.expired ? (
                      <Badge variant="destructive" className="text-xs">Expired</Badge>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono text-foreground">
                          {Math.floor(lock.duration / 365)}y {Math.floor((lock.duration % 365) / 30)}m left
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right - Actions */}
                <div className="flex flex-col gap-2 justify-end">
                  {lock.expired ? (
                    <Button 
                      onClick={() => handleUnlock(lock.id)}
                      className="gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      Unlock
                    </Button>
                  ) : (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs">
                            Extend Lock
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Extend Lock #{lock.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm font-medium">New Duration</label>
                              <Slider
                                value={[newDuration]}
                                onValueChange={(val) => setNewDuration(val[0])}
                                min={lock.duration}
                                max={730}
                                step={1}
                                className="mt-2"
                              />
                              <p className="text-xs text-muted-foreground mt-1">{(newDuration / 365).toFixed(2)} years</p>
                            </div>
                            <Button 
                              onClick={() => handleExtend(lock.id)}
                              className="w-full bg-primary"
                            >
                              Confirm Extension
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Plus className="w-3 h-3 mr-1" />
                            Increase Amount
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Increase Lock Amount #{lock.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm font-medium">Additional LCLAW</label>
                              <Input
                                type="number"
                                placeholder="Enter amount..."
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                                className="font-mono mt-2"
                              />
                            </div>
                            <Button 
                              onClick={() => handleIncrease(lock.id)}
                              className="w-full bg-primary"
                            >
                              Increase Amount
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {lock.location === "wallet" ? (
                        <Button variant="outline" size="sm" className="text-xs">
                          <Vault className="w-3 h-3 mr-1" />
                          Deposit to Vault
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          Withdraw from Vault
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
