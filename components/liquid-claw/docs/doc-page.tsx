'use client'

import { useState } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'
import { DocSidebar } from './doc-sidebar'
import { DocTOC } from './doc-toc'
import { DocContent } from './doc-content'
import { Header } from '../header'
import { ReactNode } from 'react'
import { DocThemeContext } from './doc-theme'

export function DocPage({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dark, setDark] = useState(false)

  return (
    <DocThemeContext.Provider value={{ dark }}>
      <div className={`min-h-screen ${dark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <Header />

        {/* Mobile Docs Nav + Theme Toggle */}
        <header className={`lg:hidden fixed top-16 left-0 right-0 h-12 ${dark ? 'bg-[#0f0f0f] border-[#222]' : 'bg-gray-50 border-gray-200'} border-b flex items-center justify-between px-4 z-30`}>
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${dark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-200'}`}
            >
              <Menu className={`w-5 h-5 ${dark ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <span className={`ml-3 font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Docs</span>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg transition-colors ${dark ? 'hover:bg-[#1a1a1a] text-yellow-400' : 'hover:bg-gray-200 text-gray-600'}`}
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <div className="flex">
          <DocSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 xl:mr-56">
            {/* Desktop theme toggle */}
            <div className="hidden lg:flex justify-end pt-20 pr-6">
              <button
                onClick={() => setDark(!dark)}
                className={`p-2 rounded-lg transition-colors ${dark ? 'hover:bg-[#1a1a1a] text-yellow-400' : 'hover:bg-gray-100 text-gray-600'}`}
                title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <div className="pt-28 lg:pt-4 px-6 lg:px-12 pb-12 max-w-4xl mx-auto">
              <DocContent>{children}</DocContent>
            </div>
          </main>

          <DocTOC dark={dark} />
        </div>
      </div>
    </DocThemeContext.Provider>
  )
}
