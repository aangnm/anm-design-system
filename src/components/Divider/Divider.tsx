import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Divider component (Core page): Orientation=Horizontal/Vertical.
// Why (from Figma) — orientation is a variant rather than two components,
// because the only difference is which axis spans; the token and weight are
// identical. Bound to border/default; swap `muted` for a subtler rule.

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation
  /** border/default (the Figma default) vs the subtler border/muted. */
  muted?: boolean
}

export function Divider({ orientation = 'horizontal', muted, className, ...props }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        muted ? 'bg-border-muted' : 'bg-border-default',
        orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
        className,
      )}
      {...props}
    />
  )
}
