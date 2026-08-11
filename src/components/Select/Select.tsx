import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Select component (Core page): State only, one size (36px).
// A native <select> + appearance-none + overlaid chevron — simplest fully
// accessible pattern for a single-size, no-search dropdown. If a future
// Figma revision adds a searchable/multi-select variant, that's a Radix
// Select port instead, not an extension of this one.

const selectVariants = cva(
  'w-full appearance-none rounded-md border bg-surface-subtle py-8px pl-12px pr-32px text-base text-text-primary outline-none transition-colors ' +
    'focus-visible:border-focus-ring ' +
    'disabled:cursor-not-allowed disabled:bg-interactive-disabled disabled:text-text-disabled disabled:border-border-subtle',
  {
    variants: {
      error: {
        true: 'border-semantic-error',
        false: 'border-border-default',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, error, children, ...props }, ref) => (
  <div className="relative w-full">
    <select ref={ref} className={cn(selectVariants({ error }), className)} {...props}>
      {children}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-12px top-1/2 size-4 -translate-y-1/2 text-icon-muted"
      aria-hidden
    />
  </div>
))
Select.displayName = 'Select'
