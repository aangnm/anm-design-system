import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Button component set in Iankha-Design-System-New (Core page):
// Type × Size × State, plus the "Leading icon" boolean slot. Hover/Focus/
// Disabled are real browser states here (:hover, :focus-visible, [disabled])
// rather than separate props — only Loading needs one, since there's no
// native HTML state for it.

// Sizes use the Figma spacing tokens directly (px-16px, not px-4 — see the
// note in scripts/transform-tokens.mjs on why our numbered spacing scale
// can't share Tailwind's bare h-*/p-*/gap-* namespace). Height is intrinsic
// (padding + line-height), matching how the Figma component itself is built
// as an auto-layout frame rather than a fixed-height box — SM/MD/LG land at
// 32/36/48px as a result, same as the design.
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring ' +
    'disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-disabled',
  {
    variants: {
      variant: {
        primary:
          'bg-interactive-primary text-interactive-primary-foreground hover:bg-interactive-primary-hover active:bg-interactive-primary-active',
        secondary: 'bg-interactive-default text-text-primary border border-border-default hover:bg-interactive-hover',
        outline: 'bg-transparent text-text-primary border border-border-default hover:bg-interactive-default',
        ghost: 'bg-transparent text-text-primary hover:bg-interactive-default',
      },
      size: {
        sm: 'gap-6px rounded-sm px-12px py-6px text-sm',
        md: 'gap-8px rounded-md px-16px py-8px text-base',
        lg: 'gap-8px rounded-md px-24px py-12px text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renders as its child (Radix Slot) instead of a <button> — e.g. an <a>. */
  asChild?: boolean
  /** Shows a spinner in place of the leading icon and dims the label. */
  loading?: boolean
  /** Icon rendered before the label — maps to Figma's "Leading icon" slot. */
  leadingIcon?: ReactNode
  /**
   * Icon rendered after the label. Figma only models a leading slot, but a
   * trailing affordance is required by real triggers (a dropdown chevron),
   * so this is an additive extension rather than something the design
   * contradicts.
   */
  trailingIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, leadingIcon, trailingIcon, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden />
        ) : (
          leadingIcon
        )}
        <span className={cn(loading && 'opacity-70')}>{children}</span>
        {trailingIcon}
      </Comp>
    )
  },
)
Button.displayName = 'Button'
