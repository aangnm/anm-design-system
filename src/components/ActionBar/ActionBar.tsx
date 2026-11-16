import type { HTMLAttributes, ReactNode } from 'react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

// Mirrors the Action Bar component (Navigation page): a pinned bottom bar
// for a phone screen — an optional summary line, one Primary Button LG and
// an optional Secondary. 16px padding, 32px at the bottom to clear the home
// indicator, 12px between rows, surface/container over a border/subtle
// hairline. Why (from Figma) — a screen that ends in one decision keeps that
// action in the thumb zone while the content scrolls; one Primary per view
// still holds, so the second action is a Secondary, never a second Primary.
// The summary carries the running tally so the user knows what they confirm.
// Position it yourself (e.g. `sticky bottom-0`).

export interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma's "Summary" + "Show summary". */
  summary?: ReactNode
  primaryLabel: string
  onPrimary?: () => void
  primaryDisabled?: boolean
  /** Figma's "Show secondary". */
  secondaryLabel?: string
  onSecondary?: () => void
}

export function ActionBar({
  summary,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  secondaryLabel,
  onSecondary,
  className,
  ...props
}: ActionBarProps) {
  return (
    <div
      className={cn('flex w-full flex-col gap-12px border-t border-border-subtle bg-surface-container px-16px pb-32px pt-16px', className)}
      {...props}
    >
      {summary ? <p className="text-text-sm leading-5 text-text-secondary">{summary}</p> : null}
      <Button size="lg" className="w-full" onClick={onPrimary} disabled={primaryDisabled}>
        {primaryLabel}
      </Button>
      {secondaryLabel ? (
        <Button size="lg" variant="secondary" className="w-full" onClick={onSecondary}>
          {secondaryLabel}
        </Button>
      ) : null}
    </div>
  )
}
