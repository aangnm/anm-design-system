import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Popover component (Feedback & Overlays page): a static body only,
// no arrow. Why (from Figma) — static like Tooltip: no anchoring or collision
// logic in the Figma component itself; real placement (anchored to a trigger,
// viewport-aware) is code's responsibility and deliberate future work. Verified
// against Figma: body only, no arrow, 260 wide, 16 padding, surface/emphasis.

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
      <p className="w-full text-sm font-semibold leading-5 text-text-primary">{title}</p>
      <p className="w-full text-text-xs leading-5 text-text-secondary">{children}</p>
    </div>
  )
}
