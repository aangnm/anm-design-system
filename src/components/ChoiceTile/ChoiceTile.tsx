import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Badge } from '@/components/Badge'
import { cn } from '@/lib/utils'

// Mirrors the Choice Tile component set (Core page, Touch input): Size x
// Align x State. A selectable tile for picking one option from a short set,
// hit fast with a thumb. MD 48 / LG 56 high, 16px side padding, radius/lg,
// Title Default Medium label.
//
// Why (from Figma) — a choice needs its own selected state, and that state
// is a fill, not a border: Selected is a solid interactive/primary fill.
// Default and Hover carry a soft border/subtle edge (a tile is identified by
// its label, not by a 3:1 outline). Done is surface/highlight with a check
// and a count Badge (this one already holds a value); Counted is the same
// tint and Badge without the check and with 12px side padding, for
// two-column grids where the check would squeeze the label.
//
// Hover is the 8% state layer and Focus the shared focus ring (real
// :hover / :focus-visible); Disabled is `disabled`. Selected / Done / Counted
// are the `state` prop. `aria-pressed` reflects Selected.

const tileVariants = cva(
  'relative inline-flex min-w-0 items-center gap-8px rounded-lg border px-16px text-text-base font-medium leading-6 outline-none transition-colors ' +
    'focus-visible:focus-ring disabled:pointer-events-none disabled:border-transparent disabled:bg-interactive-disabled disabled:text-text-disabled',
  {
    variants: {
      size: { md: 'h-48px', lg: 'h-56px' },
      align: { center: 'justify-center text-center', left: 'justify-start text-left' },
      state: {
        default: 'border-border-subtle bg-surface-container text-text-primary state-layer hover:state-hover active:state-pressed',
        selected:
          'border-transparent bg-interactive-primary text-interactive-primary-foreground state-layer hover:state-hover active:state-pressed',
        done: 'border-semantic-info bg-surface-highlight text-text-primary state-layer hover:state-hover',
        counted: 'border-semantic-info bg-surface-highlight px-12px text-text-primary state-layer hover:state-hover',
      },
    },
    defaultVariants: { size: 'md', align: 'center', state: 'default' },
  },
)

export interface ChoiceTileProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof tileVariants> {
  label: ReactNode
  /** Figma's "Leading icon" swap. Hidden in Done / Counted, where the check and count take the space. */
  icon?: ReactNode
  /** Count shown in the Badge for Done / Counted. */
  count?: number
}

export const ChoiceTile = forwardRef<HTMLButtonElement, ChoiceTileProps>(
  ({ label, icon, count, size, align, state = 'default', className, ...props }, ref) => {
    const holdsValue = state === 'done' || state === 'counted'
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={state === 'selected'}
        className={cn(tileVariants({ size, align, state }), '[&>svg]:size-5 [&>svg]:shrink-0', className)}
        {...props}
      >
        {state === 'done' ? <Check className="text-semantic-info" aria-hidden /> : null}
        {!holdsValue && icon ? icon : null}
        <span className="truncate">{label}</span>
        {holdsValue && count !== undefined ? <Badge color="info">{count}</Badge> : null}
      </button>
    )
  },
)
ChoiceTile.displayName = 'ChoiceTile'
