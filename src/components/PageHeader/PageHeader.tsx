import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Page Header component (App Ref: Product Patterns page):
// title + subtitle on the left, actions on the right, over a bottom
// hairline. Why (from Figma) — exists so page-level chrome is decided once.
// Built from Button + Icon Button in Figma; `actions` is a slot here rather
// than fixed props, since real pages vary the action count/kind — but the
// convention it sets (Icon Button for secondary actions, one primary Button)
// is documented for callers to follow. Add a Breadcrumb above for nested
// pages. Hit area — pointer: the Icon Button (36 x 36) and the Button (36 high);
// on touch they extend to 48 x 48 (owned by those components).

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, actions, className, ...props }: PageHeaderProps) {
  return (
    <div
      className={cn('flex w-full flex-wrap items-center justify-between gap-12px border-b border-border-subtle pb-16px', className)}
      {...props}
    >
      <div className="flex flex-col gap-4px">
        <p className="text-3xl font-semibold text-text-primary">{title}</p>
        {subtitle ? <p className="text-sm text-text-secondary">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-8px">{actions}</div> : null}
    </div>
  )
}
