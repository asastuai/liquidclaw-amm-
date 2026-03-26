'use client'

import { ReactNode } from 'react'
import { AlertTriangle, Lightbulb, Info, ExternalLink } from 'lucide-react'
import { useDocTheme } from './doc-theme'

interface DocContentProps {
  children: ReactNode
}

export function DocContent({ children }: DocContentProps) {
  const { dark } = useDocTheme()

  const proseClass = dark
    ? 'prose prose-invert max-w-3xl mx-auto prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#00ff41] hover:prose-a:text-white prose-code:text-[#00ff41] prose-code:bg-[#161616] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-[#161616] prose-pre:border prose-pre:border-[#222] prose-blockquote:border-l-[#00ff41] prose-blockquote:text-gray-400 prose-li:text-gray-300'
    : 'prose max-w-3xl mx-auto prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-emerald-600 hover:prose-a:text-emerald-800 prose-code:text-emerald-700 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-blockquote:border-l-emerald-500 prose-blockquote:text-gray-600 prose-li:text-gray-700'

  return (
    <article className={proseClass}>
      {children}

      <style jsx>{`
        :global(.prose h2) {
          scroll-margin-top: 100px;
        }
        :global(.prose h3) {
          scroll-margin-top: 100px;
        }
        :global(.prose table) {
          border-collapse: collapse;
          width: 100%;
          font-size: 14px;
        }
        :global(.prose th) {
          background: ${dark ? '#1a1a1a' : '#f9fafb'};
          color: ${dark ? '#ffffff' : '#111827'};
          font-weight: 600;
          padding: 12px;
          text-align: left;
          border: 1px solid ${dark ? '#222' : '#e5e7eb'};
        }
        :global(.prose td) {
          padding: 12px;
          border: 1px solid ${dark ? '#222' : '#e5e7eb'};
          color: ${dark ? '#d1d5db' : '#374151'};
        }
        :global(.prose tr:hover) {
          background: ${dark ? '#161616' : '#f9fafb'};
        }
      `}</style>
    </article>
  )
}

export function Callout({
  type,
  title,
  children,
}: {
  type: 'tip' | 'warning' | 'info'
  title: string
  children: ReactNode
}) {
  const { dark } = useDocTheme()

  const icons = {
    tip: <Lightbulb className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  }

  const styles = {
    tip: dark
      ? 'border-l-emerald-500 bg-emerald-500/5'
      : 'border-l-emerald-500 bg-emerald-50',
    warning: dark
      ? 'border-l-amber-500 bg-amber-500/5'
      : 'border-l-amber-500 bg-amber-50',
    info: dark
      ? 'border-l-blue-500 bg-blue-500/5'
      : 'border-l-blue-500 bg-blue-50',
  }

  return (
    <div className={`border-l-4 ${styles[type]} p-4 rounded-r-lg my-4`}>
      <div className={`flex items-center gap-2 font-semibold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
        {icons[type]}
        {title}
      </div>
      <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{children}</div>
    </div>
  )
}

export function CodeBlock({
  language,
  children,
}: {
  language: string
  children: string
}) {
  const { dark } = useDocTheme()

  return (
    <pre className={`rounded-lg p-4 overflow-x-auto my-4 border ${dark ? 'bg-[#161616] border-[#222]' : 'bg-gray-50 border-gray-200'}`}>
      <code className={`text-sm font-mono ${dark ? 'text-[#00ff41]' : 'text-emerald-700'}`}>{children}</code>
    </pre>
  )
}

export function ExternalLink_({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const { dark } = useDocTheme()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 transition-colors ${dark ? 'text-[#00ff41] hover:text-white' : 'text-emerald-600 hover:text-emerald-800'}`}
    >
      {children}
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}
