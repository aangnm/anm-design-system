import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Divider component (Core page): Orientation=Horizontal/Vertical.
// Why (from Figma) — orientation is a variant rather than two components,
// because the only difference is which axis spans; the token and weight are
// identical. Bound to border/subtle (a decorative rule — control edges use
// border/default). The old `muted` prop is gone: the default is now the
// subtlest token the system uses for rules.

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation
}

export function Divider({ orientation = 'horizontal', className, ...props }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-border-subtle',
        orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
        className,
      )}
      {...props}
    />
  )
}
