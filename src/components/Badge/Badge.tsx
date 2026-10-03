import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Mirrors the Badge component set (Core page): Color. A small solid-fill
// pill, typically a count — unlike Tag, colored variants always use white
// text regardless of theme (the Figma component uses the raw white
// primitive here, not a semantic token, since it's pinned against a
// saturated fill rather than following the page background). Warning is the
// exception: near-black, because white on the amber fill is only 3.3:1.
// 20 high, 11/16 Medium.

const badgeVariants = cva('inline-flex h-20px min-w-20px items-center justify-center rounded-pill px-6px text-text-xxs font-medium leading-4', {
  variants: {
    color: {
      neutral: 'bg-surface-emphasis text-text-primary',
      success: 'bg-semantic-success text-white',
      warning: 'bg-semantic-warning text-black',
      error: 'bg-semantic-error text-white',
      info: 'bg-semantic-info text-white',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
})

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode
  className?: string
}

export function Badge({ children, className, color }: BadgeProps) {
  return <span className={cn(badgeVariants({ color }), className)}>{children}</span>
}
