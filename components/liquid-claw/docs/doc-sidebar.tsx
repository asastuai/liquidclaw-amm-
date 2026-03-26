'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Book, Code, Shield, X } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

const navSections = [
  {
    title: 'Overview',
    defaultOpen: true,
    icon: Book,
    items: [
      { label: 'Welcome', href: '/docs' },
      { label: 'Getting Started', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Protocol',
    defaultOpen: false,
    icon: Shield,
    items: [
      { label: 'Governance (veLCLAW)', href: '/docs/governance' },
      { label: 'AI Vault', href: '/docs/ai-vault' },
      { label: 'Tokenomics', href: '/docs/tokenomics' },
    ],
  },
  {
    title: 'Build',
    defaultOpen: false,
    icon: Code,
    items: [
      { label: 'For Builders & Agents', href: '/docs/for-builders' },
    ],
  },
]

export function DocSidebar({ isOpen, onClose, dark }: { isOpen: boolean; onClose: () => void; dark: boolean }) {
  const [openSections, setOpenSections] = useState<string[]>(['Overview'])

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const sidebarContent = (
    <nav className="space-y-2">
      {navSections.map((section) => (
        <Collapsible
          key={section.title}
          open={openSections.includes(section.title)}
          onOpenChange={() => toggleSection(section.title)}
        >
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <span className="flex items-center gap-2 font-medium text-sm">
                {section.icon && <section.icon className="w-4 h-4" />}
                {section.title}
              </span>
              <ChevronDown
                className="w-4 h-4 transition-transform"
                style={{ transform: openSections.includes(section.title) ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-6 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors border-l-2 border-transparent hover:border-l-primary"
              >
                {item.label}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-screen bg-card border-r border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-xs">
              LC
            </div>
            <span className="text-foreground font-bold text-lg">LiquidClaw</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 p-4">
          {sidebarContent}
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-lg">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-xs">
                  LC
                </div>
                <span className="text-foreground font-bold">LiquidClaw</span>
              </Link>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <ScrollArea className="h-[calc(100vh-80px)] p-4">
              {sidebarContent}
            </ScrollArea>
          </aside>
        </div>
      )}
    </>
  )
}
