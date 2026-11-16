import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Topbar / Alt component (Navigation page): breadcrumbs on the
// left, a Date Indicator in the centre and actions (search, alerts) on the
// right, 56 high on surface/container over a border/subtle hairline, 24px
// side padding. Why (from Figma) — a composition of parts that already exist,
// kept as a component so the arrangement is documented. Pass any nodes into
// the three slots; use `TopbarAction` for the icon actions so each keeps its
// 24 x 24 target (48 x 48 on touch).

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
  /** Left slot, usually a Breadcrumb. */
  breadcrumb?: ReactNode
  /** Centre slot, usually a DateIndicator. */
  center?: ReactNode
  /** Right slot, usually TopbarAction buttons. */
  actions?: ReactNode
}

export function Topbar({ breadcrumb, center, actions, className, ...props }: TopbarProps) {
  return (
    <header
      className={cn(
        'grid h-56px w-full grid-cols-[1fr_auto_1fr] items-center border-b border-border-subtle bg-surface-container px-24px',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-8px">{breadcrumb}</div>
      <div className="flex items-center gap-24px">{center}</div>
      <div className="flex items-center justify-end gap-16px">{actions}</div>
    </header>
  )
}

export interface TopbarActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only actions need a name. */
  'aria-label': string
  children: ReactNode
}

/** A 20px icon action with a 24 x 24 target (48 x 48 on touch). */
export function TopbarAction({ className, children, ...props }: TopbarActionProps) {
  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex size-24px items-center justify-center rounded-xs text-icon-muted outline-none transition-colors hover:text-text-primary focus-visible:focus-ring [&>svg]:size-5',
        'pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:size-48px pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
