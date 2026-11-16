import type { HTMLAttributes, ReactNode } from 'react'
import { CircleAlert, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Stat component set (Data Display page): a single KPI — label,
// value, and a delta/trend indicator — with State=Default/Empty/Loading/Error.
// Same card surface as Card; the trend colour binds to the text/success and
// text/error tokens (▲ / ▼), not the semantic fills — those are tuned for
// surfaces and fail contrast as text on the dark card (Figma default binding).

export type StatState = 'default' | 'empty' | 'loading' | 'error'
export type StatTrend = 'up' | 'down' | 'neutral'

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  value?: ReactNode
  /** Delta shown under the value, e.g. "12,5 %". */
  delta?: ReactNode
  /** Colour + arrow for the delta: up = ▲ success, down = ▼ error, neutral = muted (no arrow). */
  trend?: StatTrend
  /** Caption after the delta, e.g. "vs. mes anterior". */
  deltaCaption?: ReactNode
  state?: StatState
  emptyMessage?: string
  errorMessage?: string
}

// Non-default states are padded to the Default's 120 high so swapping them in never makes the layout jump.
const surface = 'min-h-[120px] w-full rounded-lg border border-border-subtle bg-surface-container p-20px'

const trend: Record<StatTrend, { arrow: string; className: string }> = {
  up: { arrow: '▲', className: 'text-text-success' },
  down: { arrow: '▼', className: 'text-text-error' },
  neutral: { arrow: '', className: 'text-text-secondary' },
}

export function Stat({
  label,
  value,
  delta,
  trend: trendProp = 'up',
  deltaCaption,
  state = 'default',
  emptyMessage = 'No data',
  errorMessage = 'Error al cargar',
  className,
  ...props
}: StatProps) {
  if (state === 'loading') {
    return (
      <div className={cn(surface, 'flex flex-col items-start gap-8px', className)} aria-busy="true" {...props}>
        <div className="h-[12px] w-[90px] rounded-sm bg-surface-container-high" />
        <div className="h-[24px] w-[120px] rounded-sm bg-surface-container-high" />
        <div className="h-[12px] w-[140px] rounded-sm bg-surface-container-high" />
      </div>
    )
  }

  if (state === 'empty' || state === 'error') {
    const isError = state === 'error'
    const Icon = isError ? CircleAlert : Inbox
    return (
      <div className={cn(surface, 'flex flex-col items-center justify-center gap-8px', className)} {...props}>
        <Icon className={cn('size-5', isError ? 'text-semantic-error' : 'text-icon-muted')} aria-hidden />
        <p className="text-text-xs leading-5 text-text-secondary">{isError ? errorMessage : emptyMessage}</p>
      </div>
    )
  }

  const t = trend[trendProp]
  return (
    <div className={cn(surface, 'flex flex-col items-start gap-6px', className)} {...props}>
      <p className="text-text-xxs font-medium leading-4 text-text-secondary">{label}</p>
      <p className="text-2xl font-semibold leading-8 text-text-primary">{value}</p>
      {delta != null && (
        <div className="flex items-center gap-6px text-text-xs font-medium leading-5">
          <span className={t.className}>
            {t.arrow ? `${t.arrow} ` : ''}
            {delta}
          </span>
          {deltaCaption != null && <span className="text-text-secondary">{deltaCaption}</span>}
        </div>
      )}
    </div>
  )
}
