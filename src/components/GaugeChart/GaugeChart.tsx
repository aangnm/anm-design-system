import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { formatChartNumber } from '@/components/Legend'

// Gauge Chart (Data Display page, Figma v1.1): one value against its range on
// a half-circle arc, with the value and its label in the middle and an
// optional target tick. Use it for a single measure with a known ceiling —
// quota attainment, budget used, uptime — never to compare categories.
//
// Why — a gauge earns its space only when the range matters as much as the
// number. The arc is 12px on a border/subtle track; the fill is
// chart/series-1, or a status colour (`status`) when the value has crossed a
// threshold the product defines — the gauge never decides that by itself.
// The target is a neutral tick so it reads without colour. The value is the
// biggest text in the card (title/large) because it is the answer; min and max
// sit under the arc ends on the 11px floor.

export interface GaugeChartProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  min?: number
  max?: number
  /** What the value measures, under the number. */
  label: string
  /** Optional target, drawn as a tick across the arc. */
  target?: number
  /** Colours the fill by status instead of chart/series-1. */
  status?: 'success' | 'warning' | 'error'
  /** Diameter in px. */
  size?: number
  formatValue?: (value: number) => string
}

const STROKE = 12
const STATUS_STROKE = { success: 'stroke-semantic-success', warning: 'stroke-semantic-warning', error: 'stroke-semantic-error' } as const

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  label,
  target,
  status,
  size = 200,
  formatValue = (v) => formatChartNumber(v),
  className,
  'aria-label': ariaLabel,
  ...props
}: GaugeChartProps) {
  const r = (size - STROKE) / 2
  const cx = size / 2
  const cy = size / 2
  const share = (v: number) => Math.max(0, Math.min(1, (v - min) / (max - min || 1)))
  // Half circle from the left end (180°) to the right end (0°), drawn clockwise over the top.
  const arc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`
  const point = (t: number, radius: number) => {
    const a = Math.PI * (1 - t)
    return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) }
  }
  const tIn = target !== undefined ? point(share(target), r - STROKE / 2 - 3) : null
  const tOut = target !== undefined ? point(share(target), r + STROKE / 2 + 3) : null
  const height = size / 2 + STROKE / 2

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? `Gauge. ${label}: ${formatValue(value)} of ${formatValue(max)}${target !== undefined ? `, target ${formatValue(target)}` : ''}`}
      className={cn('inline-flex flex-col items-center gap-4px', className)}
      {...props}
    >
      <div className="relative" style={{ width: size, height }}>
        <svg width={size} height={height} viewBox={`0 0 ${size} ${height}`} fill="none" className="overflow-visible">
          <path d={arc} stroke="var(--border-subtle)" strokeWidth={STROKE} strokeLinecap="round" />
          {value > min ? (
            <path
              d={arc}
              pathLength={100}
              strokeDasharray={`${share(value) * 100} 100`}
              strokeWidth={STROKE}
              strokeLinecap="round"
              className={status ? STATUS_STROKE[status] : 'stroke-chart-series-1'}
            />
          ) : null}
          {tIn && tOut ? <line x1={tIn.x} y1={tIn.y} x2={tOut.x} y2={tOut.y} stroke="var(--text-primary)" strokeWidth={2} strokeLinecap="round" /> : null}
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-title-large font-semibold tabular-nums text-text-primary">{formatValue(value)}</span>
          <span className="text-text-xs leading-5 text-text-secondary">{label}</span>
        </div>
      </div>
      <div className="flex justify-between text-text-xxs leading-4 text-text-secondary" style={{ width: size }} aria-hidden>
        <span>{formatValue(min)}</span>
        {target !== undefined ? <span>Target {formatValue(target)}</span> : null}
        <span>{formatValue(max)}</span>
      </div>
    </div>
  )
}
