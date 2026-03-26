'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TOCItem {
  id: string
  title: string
  level: number
}

export function DocTOC({ dark }: { dark: boolean }) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3')).map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      title: el.textContent || '',
      level: parseInt(el.tagName[1]),
    }))

    headings.forEach((item) => {
      const el = document.getElementById(item.id)
      if (!el) {
        const heading = Array.from(document.querySelectorAll('h2, h3')).find(
          (h) => h.textContent === item.title
        )
        if (heading && !heading.id) heading.id = item.id
      }
    })

    setToc(headings)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <aside className="hidden xl:flex flex-col w-56 fixed right-0 top-0 h-screen bg-card border-l border-border overflow-hidden">
      <ScrollArea className="flex-1 p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">On this page</h3>
          <nav className="space-y-2">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-sm transition-colors ${
                  activeId === item.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-border">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <ChevronUp className="w-4 h-4" />
          Back to top
        </button>
      </div>
    </aside>
  )
}
