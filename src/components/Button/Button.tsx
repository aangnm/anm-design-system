import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Button component set in the anm Design System Figma file (Core page):
// Type × Size × State, plus the "Leading icon" boolean slot. Hover/Focus/
// Disabled are real browser states here (:hover, :focus-visible, [disabled])
// rather than separate props — only Loading needs one, since there's no
// native HTML state for it. Hover and pressed are state layers (see
// `state-layer` in styles.css): the label colour at 8% / 12% over the fill,
// the same for every Type — there are no hover colour tokens.

// Sizes use the Figma spacing tokens directly (px-16px, not px-4 — see the
// note in scripts/transform-tokens.mjs on why our numbered spacing scale
// can’t share Tailwind's bare h-*/p-*/gap-* namespace). Height is
// fixed per size (border-box) so the 1px border on Secondary/Outline sits
// inside the height, as the Figma stroke does — SM/MD/LG are 32/36/52px for
// every Type. Label text is 13/20, 14/20 and 18/28 (SM/MD/LG), icons 16/16/20.
// LG is the touch size (Figma v0.78: reads at arm's length); 52 has no spacing
// token, so it is the one arbitrary height here.
const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors ' +
    'state-layer hover:state-hover active:state-pressed ' +
    'pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:size-full pointer-coarse:after:min-h-48px pointer-coarse:after:min-w-48px pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2 ' +
    'focus-visible:focus-ring ' +
    'disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-disabled',
  {
    variants: {
      variant: {
        primary:
          'bg-interactive-primary text-interactive-primary-foreground',
        secondary: 'bg-interactive-default text-text-primary border border-border-default',
        outline: 'bg-transparent text-text-primary border border-border-default',
        ghost: 'bg-transparent text-text-primary',
      },
      size: {
        sm: 'gap-6px h-control-sm rounded-sm px-12px text-text-xs leading-5 [&_svg]:size-4',
        md: 'gap-8px h-control-md rounded-md px-16px text-text-sm leading-5 [&_svg]:size-4',
        lg: 'gap-8px h-control-button-lg rounded-md px-24px text-text-lg leading-7 [&_svg]:size-5',
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
    const classes = cn(buttonVariants({ variant, size }), className)
    const leading = loading ? <LoaderCircle className="animate-spin" aria-hidden /> : leadingIcon
    if (asChild) {
      // Slot needs exactly one element to merge onto: the child (e.g. an <a>)
      // is marked with Slottable and the icons render inside it.
      return (
        <Slot ref={ref} className={classes} {...props}>
          {leading}
          <Slottable>{children}</Slottable>
          {trailingIcon}
        </Slot>
      )
    }
    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {leading}
        <span className={cn(loading && 'opacity-loading')}>{children}</span>
        {trailingIcon}
      </button>
    )
  },
)
Button.displayName = 'Button'
