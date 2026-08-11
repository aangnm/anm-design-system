import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Mirrors the Badge component set (Core page): Color. A small solid-fill
// pill, typically a count — unlike Tag, colored variants always use white
// text regardless of theme (the Figma component uses the raw white
// primitive here, not a semantic token, since it's pinned against a
// saturated fill rather than following the page background).

const badgeVariants = cva('inline-flex min-w-[20px] items-center justify-center rounded-pill px-6px py-2px text-sm', {
  variants: {
    color: {
      neutral: 'bg-surface-emphasis text-text-primary',
      success: 'bg-semantic-success text-white',
      warning: 'bg-semantic-warning text-white',
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
