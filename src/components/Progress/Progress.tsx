import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Progress component (Feedback & Overlays page). Determinate only —
// indeterminate progress is Spinner's job (per the component's Figma description);
// a bar that doesn't represent a real proportion is a misleading affordance.
// Track: a 1px border/default outline (inside) so the bar stays visible on any
// surface, including grey ones where the soft track fill alone disappears.
// The value prints as "65 %" with a no-break space (U+00A0) before the sign, so it never wraps
// ("65 %"; Figma draws a plain space, the no-break space is the code-side guarantee).

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0-100. */
  value: number
  label?: string
  /** Hide the "label / value%" row and render only the track. */
  showLabel?: boolean
}

export function Progress({ value, label = 'Progreso', showLabel = true, className, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      className={cn('flex w-full flex-col items-start gap-8px', className)}
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      {showLabel ? (
        <div className="flex w-full items-start justify-between text-text-xs font-medium leading-5">
          <p className="text-text-secondary">{label}</p>
          <p className="text-text-primary">{`${clamped}\u00A0%`}</p>
        </div>
      ) : null}
      <div className="relative h-8px w-full shrink-0 overflow-clip rounded-pill bg-interactive-default">
        <div className="h-full rounded-pill bg-interactive-primary" style={{ width: `${clamped}%` }} />
        <div className="pointer-events-none absolute inset-0 rounded-pill border border-border-default" aria-hidden />
      </div>
    </div>
  )
}
