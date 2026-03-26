'use client'

import { ReactNode } from 'react'
import { AlertTriangle, Lightbulb, Info, ExternalLink } from 'lucide-react'

interface DocContentProps {
  children: ReactNode
}

export function DocContent({ children }: DocContentProps) {
  return (
    <article className="prose max-w-3xl mx-auto prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-li:text-muted-foreground dark:prose-invert">
      {children}

      <style jsx>{`
        :global(.prose h2) { scroll-margin-top: 100px; }
        :global(.prose h3) { scroll-margin-top: 100px; }
        :global(.prose table) { border-collapse: collapse; width: 100%; font-size: 14px; }
        :global(.prose th) {
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
          font-weight: 600;
          padding: 12px;
          text-align: left;
          border: 1px solid hsl(var(--border));
        }
        :global(.prose td) {
          padding: 12px;
          border: 1px solid hsl(var(--border));
          color: hsl(var(--muted-foreground));
        }
        :global(.prose tr:hover) {
          background: hsl(var(--muted));
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
  const icons = {
    tip: <Lightbulb className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  }

  const styles = {
    tip: 'border-l-emerald-500 bg-emerald-500/10',
    warning: 'border-l-amber-500 bg-amber-500/10',
    info: 'border-l-blue-500 bg-blue-500/10',
  }

  return (
    <div className={`border-l-4 ${styles[type]} p-4 rounded-r-lg my-4`}>
      <div className="flex items-center gap-2 font-semibold mb-2 text-foreground">
        {icons[type]}
        {title}
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
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
  return (
    <pre className="rounded-lg p-4 overflow-x-auto my-4 border bg-muted border-border">
      <code className="text-sm font-mono text-primary">{children}</code>
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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
    >
      {children}
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}
