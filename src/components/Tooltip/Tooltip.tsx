import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Tooltip component (Core page): a static body + downward arrow.
// The Figma component itself has no positioning concept (no trigger, no
// collision detection) — it's a presentational box. Wiring it to a trigger
// with real viewport-aware placement is a Radix/Floating UI job for later;
// this matches what's actually in Figma today, not a guess at what it
// might grow into.

export interface TooltipProps {
  children: ReactNode
  className?: string
}

export function Tooltip({ children, className }: TooltipProps) {
  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <div className="rounded-md bg-surface-emphasis px-12px py-6px text-xs text-text-primary">{children}</div>
      <svg width="12" height="6" viewBox="0 0 12 6" fill="none" aria-hidden className="text-surface-emphasis">
        <path d="M0 0L6 6L12 0H0Z" fill="currentColor" />
      </svg>
    </div>
  )
}
