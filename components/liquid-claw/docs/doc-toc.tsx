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
        if (heading && !heading.id) {
          heading.id = item.id
        }
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const bg = dark ? 'bg-[#0a0a0a]' : 'bg-white'
  const border = dark ? 'border-[#222]' : 'border-gray-200'
  const textPrimary = dark ? 'text-white' : 'text-gray-900'
  const textSecondary = dark ? 'text-gray-400' : 'text-gray-500'
  const accent = dark ? 'text-[#00ff41]' : 'text-emerald-600'
  const btnBg = dark ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a]' : 'bg-gray-100 hover:bg-gray-200'

  return (
    <aside className={`hidden xl:flex flex-col w-56 fixed right-0 top-0 h-screen ${bg} border-l ${border} overflow-hidden`}>
      <ScrollArea className="flex-1 p-6">
        <div className="mb-6">
          <h3 className={`text-sm font-semibold ${textPrimary} mb-4`}>On this page</h3>
          <nav className="space-y-2">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-sm transition-colors ${
                  activeId === item.id
                    ? `${accent} font-medium`
                    : `${textSecondary} hover:${textPrimary}`
                }`}
                style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(item.id)
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </ScrollArea>

      <div className={`p-6 border-t ${border}`}>
        <button
          onClick={scrollToTop}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${btnBg} ${textSecondary} hover:${textPrimary} transition-colors text-sm font-medium`}
        >
          <ChevronUp className="w-4 h-4" />
          Back to top
        </button>
      </div>
    </aside>
  )
}
