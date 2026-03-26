"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

interface GaugeFiltersProps {
  activeTab: "all" | "my-stakes"
  onTabChange: (tab: "all" | "my-stakes") => void
  sortBy: "apr" | "tvl" | "stake"
  onSortChange: (sort: "apr" | "tvl" | "stake") => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function GaugeFilters({
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
}: GaugeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as "all" | "my-stakes")}>
        <TabsList className="bg-card/80 border border-border/50">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Gauges
          </TabsTrigger>
          <TabsTrigger 
            value="my-stakes"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            My Stakes
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1" />

      {/* Sort */}
      <Select value={sortBy} onValueChange={(v) => onSortChange(v as "apr" | "tvl" | "stake")}>
        <SelectTrigger className="w-[140px] bg-card/80 border-border/50">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apr">APR</SelectItem>
          <SelectItem value="tvl">TVL</SelectItem>
          <SelectItem value="stake">My Stake</SelectItem>
        </SelectContent>
      </Select>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full sm:w-[200px] bg-card/80 border-border/50"
        />
      </div>
    </div>
  )
}
