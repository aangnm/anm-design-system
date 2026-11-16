import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Select component (Core page): Size (SM 32 / MD 36 / LG 48) x
// State (Default / Hover / Focus / Disabled / Error / Focus + Error). Same
// padding, radius and text as Input (13/20, 14/20, 16/24). Hover, Focus and
// Disabled are real browser states; Error is a prop (also aria-invalid);
// Focus + Error is the error border plus an outer 2px focus ring.
// Why (Figma) — a native <select> with an overlaid chevron, so no open-list
// state exists here. A searchable or multi-value picker is a separate
// component (Multi-select), never a variant of this one.
// Width is up to the caller (Figma shows 260 / 280 / 300).

const selectVariants = cva(
  'w-full appearance-none border bg-surface-container text-text-primary outline-none transition-colors ' +
    'disabled:cursor-not-allowed disabled:bg-interactive-disabled disabled:text-text-disabled disabled:border-border-subtle disabled:hover:border-border-subtle',
  {
    variants: {
      size: {
        sm: 'h-control-sm rounded-sm pl-10px pr-32px text-text-xs leading-5',
        md: 'h-control-md rounded-md pl-12px pr-32px text-sm',
        lg: 'h-control-lg rounded-md pl-16px pr-40px text-base',
      },
      error: {
        true: 'border-semantic-error focus-visible:focus-ring',
        false: 'border-border-default hover:border-border-emphasis focus-visible:focus-ring',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  },
)

const chevronPosition = {
  sm: 'right-10px',
  md: 'right-12px',
  lg: 'right-16px',
} as const

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, error, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(selectVariants({ size, error }), className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className={cn(
          'pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-icon-muted',
          chevronPosition[size ?? 'md'],
        )}
        aria-hidden
      />
    </div>
  ),
)
Select.displayName = 'Select'
