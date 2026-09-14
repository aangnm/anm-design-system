import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Progress component (Feedback & Overlays page). Determinate only —
// indeterminate progress is Spinner's job (per the component's Figma description);
// a bar that doesn't represent a real proportion is a misleading affordance.

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
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      {showLabel ? (
        <div className="flex w-full items-start justify-between text-[13px] font-medium leading-5">
          <p className="text-text-secondary">{label}</p>
          <p className="text-text-primary">{clamped}%</p>
        </div>
      ) : null}
      <div className="h-8px w-full shrink-0 overflow-clip rounded-pill bg-surface-emphasis">
        <div className="h-8px rounded-pill bg-interactive-primary" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
