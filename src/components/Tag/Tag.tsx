import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Tag component set (Core page): Color, plus the component-set-
// level "Dismissible" boolean (a close icon whose visibility is driven by
// the prop, same pattern as Figma's componentPropertyReferences wiring).
// 24 high, 11/16 Medium text. The dismiss × is a 12px visual with a 24x24
// target (WCAG 2.5.8), extended by a pseudo-element rather than a bigger icon.

const tagVariants = cva('inline-flex h-24px items-center gap-6px rounded-sm px-10px text-text-xxs font-medium leading-4', {
  variants: {
    color: {
      neutral: 'bg-surface-container-high text-text-secondary',
      success: 'bg-semantic-success-surface text-semantic-success-foreground',
      warning: 'bg-semantic-warning-surface text-semantic-warning-foreground',
      error: 'bg-semantic-error-surface text-semantic-error-foreground',
      info: 'bg-semantic-info-surface text-semantic-info-foreground',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
})

export interface TagProps extends VariantProps<typeof tagVariants> {
  children: ReactNode
  className?: string
  /** Shows a close icon — maps to Figma's "Dismissible" boolean prop. */
  dismissible?: boolean
  onDismiss?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export function Tag({ children, className, color, dismissible, onDismiss }: TagProps) {
  return (
    <span className={cn(tagVariants({ color }), className)}>
      {children}
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          className="relative inline-flex rounded-xs opacity-80 outline-none after:absolute after:left-1/2 after:top-1/2 after:size-24px after:-translate-x-1/2 after:-translate-y-1/2 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:focus-ring"
          aria-label="Remove"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
