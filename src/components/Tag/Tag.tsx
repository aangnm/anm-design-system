import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Tag component set (Core page): Color, plus the component-set-
// level "Dismissible" boolean (a close icon whose visibility is driven by
// the prop, same pattern as Figma's componentPropertyReferences wiring).

const tagVariants = cva('inline-flex items-center gap-6px rounded-sm px-10px py-4px text-sm', {
  variants: {
    color: {
      neutral: 'bg-surface-emphasis text-text-secondary',
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
          className="rounded-xs opacity-80 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-focus-ring"
          aria-label="Quitar"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
