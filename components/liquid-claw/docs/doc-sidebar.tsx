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

  const bg = dark ? 'bg-[#0f0f0f]' : 'bg-gray-50'
  const border = dark ? 'border-[#222]' : 'border-gray-200'
  const textPrimary = dark ? 'text-white' : 'text-gray-900'
  const textSecondary = dark ? 'text-gray-400' : 'text-gray-500'
  const hoverBg = dark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-100'
  const accent = dark ? 'text-[#00ff41]' : 'text-emerald-600'
  const accentBorder = dark ? 'border-l-[#00ff41]' : 'border-l-emerald-500'

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col w-64 fixed left-0 top-0 h-screen ${bg} border-r ${border} overflow-hidden`}>
        <div className={`p-6 border-b ${border}`}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold">
              LC
            </div>
            <span className={`${textPrimary} font-bold text-lg`}>LiquidClaw</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {navSections.map((section) => (
              <Collapsible
                key={section.title}
                open={openSections.includes(section.title)}
                onOpenChange={() => toggleSection(section.title)}
              >
                <CollapsibleTrigger asChild>
                  <button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${hoverBg} ${textSecondary} hover:${textPrimary} transition-colors`}>
                    <span className="flex items-center gap-2 font-medium text-sm">
                      {section.icon && <section.icon className="w-4 h-4" />}
                      {section.title}
                    </span>
                    <ChevronDown
                      className="w-4 h-4 transition-transform"
                      style={{
                        transform: openSections.includes(section.title) ? 'rotate(0deg)' : 'rotate(-90deg)',
                      }}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-6 py-2 rounded-lg text-sm ${textSecondary} hover:${accent} ${hoverBg} transition-colors border-l-2 border-transparent hover:${accentBorder}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className={`absolute left-0 top-0 h-screen w-64 ${bg} border-r ${border} shadow-lg`}>
            <div className={`p-4 flex items-center justify-between border-b ${border}`}>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                  LC
                </div>
                <span className={`${textPrimary} font-bold`}>LiquidClaw</span>
              </Link>
              <button onClick={onClose} className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
                <X className={`w-5 h-5 ${textPrimary}`} />
              </button>
            </div>

            <ScrollArea className="h-[calc(100vh-80px)] p-4">
              <nav className="space-y-2">
                {navSections.map((section) => (
                  <Collapsible
                    key={section.title}
                    open={openSections.includes(section.title)}
                    onOpenChange={() => toggleSection(section.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${hoverBg} ${textSecondary} transition-colors`}>
                        <span className="flex items-center gap-2 font-medium text-sm">
                          {section.icon && <section.icon className="w-4 h-4" />}
                          {section.title}
                        </span>
                        <ChevronDown
                          className="w-4 h-4 transition-transform"
                          style={{
                            transform: openSections.includes(section.title) ? 'rotate(0deg)' : 'rotate(-90deg)',
                          }}
                        />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mt-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-6 py-2 rounded-lg text-sm ${textSecondary} ${hoverBg} transition-colors border-l-2 border-transparent`}
                          onClick={onClose}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </nav>
            </ScrollArea>
          </aside>
        </div>
      )}
    </>
  )
}
