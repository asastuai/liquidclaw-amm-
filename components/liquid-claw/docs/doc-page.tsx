'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { DocSidebar } from './doc-sidebar'
import { DocTOC } from './doc-toc'
import { DocContent } from './doc-content'
import { Header } from '../header'
import { ReactNode } from 'react'
import { DocThemeContext } from './doc-theme'

export function DocPage({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Always use dark=false — the global theme handles light/dark via CSS variables now
  const dark = false

  return (
    <DocThemeContext.Provider value={{ dark }}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* Mobile Docs Nav */}
        <header className="lg:hidden fixed top-16 left-0 right-0 h-12 bg-card border-border border-b flex items-center justify-between px-4 z-30">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg transition-colors hover:bg-muted"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <span className="ml-3 font-semibold text-foreground">Docs</span>
          </div>
        </header>

        <div className="flex">
          <DocSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 xl:mr-56">
            <div className="pt-28 lg:pt-20 px-6 lg:px-12 pb-12 max-w-4xl mx-auto">
              <DocContent>{children}</DocContent>
            </div>
          </main>

          <DocTOC dark={dark} />
        </div>
      </div>
    </DocThemeContext.Provider>
  )
}
