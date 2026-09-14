import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Popover component (Feedback & Overlays page): a static body only,
// no arrow. Why (from Figma) — static like Tooltip: no anchoring or collision
// logic in the Figma component itself; real placement (anchored to a trigger,
// viewport-aware) is code's responsibility and deliberate future work.

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
}

export function Popover({ title, children, className, ...props }: PopoverProps) {
  return (
    <div
      className={cn('flex w-[260px] flex-col items-start gap-8px rounded-md bg-surface-emphasis p-16px shadow-lg', className)}
      {...props}
    >
      <p className="w-full text-sm font-semibold text-text-primary">{title}</p>
      <p className="w-full text-[13px] text-text-secondary">{children}</p>
    </div>
  )
}
