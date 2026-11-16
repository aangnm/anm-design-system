import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the List Row component set (Core page, Touch input): a tappable row
// for choosing or opening one item — a 40px icon box (surface/container-high,
// radius/md), title, optional subtitle and a trailing chevron (a check when
// selected). At least 64 high, 12px padding (16px on the right), 12px gap,
// radius/lg, surface/container with a border/subtle edge.
//
// Why (from Figma) — List is a read-only block; Menu Item is a row inside a
// popup. The selectable row is its own piece, the same relationship Menu
// Item has to Menu. Stack rows 8px apart, or inside a Card. The edge is a
// container edge (border/subtle), not a control boundary; the row is
// identified by its text, chevron and icon box. Selected adds a 2px
// interactive/primary edge plus a check (`selected`, reflected in
// aria-pressed). Hover is the state layer; Focus the shared ring.

export interface ListRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  title: ReactNode
  /** Figma's "Subtitle" + "Show subtitle". */
  subtitle?: ReactNode
  /** Figma's "Icon" + "Show icon". */
  icon?: ReactNode
  selected?: boolean
}

export const ListRow = forwardRef<HTMLButtonElement, ListRowProps>(
  ({ title, subtitle, icon, selected, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected ?? undefined}
      className={cn(
        'relative flex min-h-64px w-full items-center gap-12px rounded-lg border bg-surface-container py-12px pl-12px pr-16px text-left outline-none transition-colors',
        'state-layer hover:state-hover active:state-pressed focus-visible:focus-ring',
        'disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-disabled',
        selected ? 'border-2 border-interactive-primary' : 'border-border-subtle',
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex size-40px shrink-0 items-center justify-center rounded-md bg-surface-container-high text-icon-default [&>svg]:size-6">
          {icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn('truncate text-text-base font-medium leading-6', props.disabled ? 'text-text-disabled' : 'text-text-primary')}>{title}</span>
        {subtitle ? <span className="truncate text-text-sm leading-5 text-text-secondary">{subtitle}</span> : null}
      </span>
      {selected ? (
        <Check className="size-6 shrink-0 text-interactive-primary" aria-hidden />
      ) : (
        <ChevronRight className="size-6 shrink-0 text-icon-muted" aria-hidden />
      )}
    </button>
  ),
)
ListRow.displayName = 'ListRow'
