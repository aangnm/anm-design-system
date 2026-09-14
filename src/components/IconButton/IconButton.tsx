import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Mirrors the Icon Button component set (Core page): Type x Size x State.
// Why (from Figma) — State mirrors Button exactly so the two never drift
// (Hover shifts fill, Focus adds a focus-ring stroke over the default fill,
// Disabled uses interactive/disabled). The disabled icon uses text/disabled
// rather than icon/muted: in Dark Mode text/disabled is the dimmer value
// against the disabled fill, where icon/muted would read as still-enabled.

const iconButtonVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-md transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring ' +
    'disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-disabled',
  {
    variants: {
      variant: {
        primary:
          'bg-interactive-primary text-interactive-primary-foreground hover:bg-interactive-primary-hover active:bg-interactive-primary-active',
        secondary: 'border border-border-default bg-interactive-default text-text-primary hover:bg-interactive-hover',
        ghost: 'bg-transparent text-text-primary hover:bg-interactive-default',
      },
      size: {
        sm: 'size-32px [&>svg]:size-4',
        md: 'size-36px [&>svg]:size-4',
        lg: 'size-48px [&>svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Icon glyph — swap for any Lucide icon. */
  icon: ReactNode
  /** Required — an icon-only control has no visible label. */
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, ...props }, ref) => (
    <button ref={ref} type="button" className={cn(iconButtonVariants({ variant, size }), className)} {...props}>
      {icon}
    </button>
  ),
)
IconButton.displayName = 'IconButton'
