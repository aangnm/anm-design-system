import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Hit area: the visual is 32/36/48 square (always >= 24); on a coarse pointer
// a pseudo-element extends the target to 48x48 without changing the visual.
// Mirrors the Icon Button component set (Core page): Type x Size x State.
// Why (from Figma) — State mirrors Button exactly so the two never drift
// (Hover adds the 8% state layer in the icon colour, Focus adds a focus-ring stroke over the default fill,
// Disabled uses interactive/disabled). The disabled icon uses text/disabled
// rather than icon/muted: in Dark Mode text/disabled is the dimmer value
// against the disabled fill, where icon/muted would read as still-enabled.

const iconButtonVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center rounded-md transition-colors ' +
    'state-layer hover:state-hover active:state-pressed ' +
    'pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:size-full pointer-coarse:after:min-h-48px pointer-coarse:after:min-w-48px pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2 ' +
    'focus-visible:focus-ring ' +
    'disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-disabled',
  {
    variants: {
      variant: {
        primary:
          'bg-interactive-primary text-interactive-primary-foreground',
        secondary: 'border border-border-default bg-interactive-default text-text-primary',
        ghost: 'bg-transparent text-text-primary',
      },
      size: {
        sm: 'size-control-sm [&>svg]:size-4',
        md: 'size-control-md [&>svg]:size-4',
        lg: 'size-control-lg [&>svg]:size-5',
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
