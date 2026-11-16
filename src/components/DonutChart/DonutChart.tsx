import type { HTMLAttributes } from 'react'
import { useId } from 'react'
import { CHART_SERIES_BG, CHART_SERIES_TEXT, ChartTexturePattern, chartTextureStyle, formatChartNumber, type ChartSeriesIndex } from '@/components/Legend'
import { cn } from '@/lib/utils'

// Mirrors the Donut Chart component (Data Display page): how one total splits
// into 2–6 parts. A 144px ring of arcs starting at 12 o'clock, clockwise in
// chart/series-N order, a 2px gap between arcs, and a legend list on the right
// with each part's value and share. The centre carries the total and its unit
// (`centerLabel`, Figma's "Center label").
//
// Why (from Figma) — a donut, not a pie: the centre holds the total and the
// list holds exact values and percentages, so no reading depends on judging
// an angle. Parts keep their series slot instead of being sorted by size.
// Shares are rounded to one decimal. Past six parts, group the tail as
// "Otros". Not interactive (a labelled image).

export interface DonutPart {
  label: string
  series: ChartSeriesIndex
  value: number
}

export interface DonutChartProps extends HTMLAttributes<HTMLDivElement> {
  parts: DonutPart[]
  /** Unit under the centre total, e.g. "USD". */
  unit?: string
  /** Figma's "Center label". */
  centerLabel?: boolean
  formatValue?: (value: number) => string
  /** Give each part its series texture as well as its colour (print, greyscale, colour-blind use). */
  texture?: boolean
}

const SIZE = 144
const STROKE = 20
const GAP = 2

export function DonutChart({ parts, unit, centerLabel = true, formatValue = (v) => formatChartNumber(v), texture = false, className, ...props }: DonutChartProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const total = parts.reduce((s, p) => s + p.value, 0) || 1
  const r = (SIZE - STROKE) / 2
  const circumference = 2 * Math.PI * r
  let offset = 0

  return (
    <div
      className={cn('flex w-fit items-center gap-24px rounded-lg border border-border-subtle bg-surface-container p-16px', className)}
      role="img"
      {...props}
    >
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          {texture && (
            <defs>
              {parts.map((p) => (
                <ChartTexturePattern key={p.series} id={`${uid}-t${p.series}`} series={p.series} rotate={90} />
              ))}
            </defs>
          )}
          {parts.map((p) => {
            const len = (p.value / total) * circumference
            const dash = Math.max(0, len - GAP)
            const el = (
              <circle
                key={p.series}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={r}
                fill="none"
                strokeWidth={STROKE}
                stroke={texture && p.series !== 1 ? `url(#${uid}-t${p.series})` : 'currentColor'}
                className={CHART_SERIES_TEXT[p.series]}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            )
            offset += len
            return el
          })}
        </svg>
        {centerLabel ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-text-xl font-semibold leading-7 text-text-primary">{formatValue(total)}</span>
            {unit ? <span className="text-text-xxs leading-4 text-text-secondary">{unit}</span> : null}
          </div>
        ) : null}
      </div>
      <ul className="flex flex-col gap-8px">
        {parts.map((p) => (
          <li key={p.series} className="grid grid-cols-[10px_minmax(0,1fr)_auto_48px] items-center gap-x-8px">
            <span className={cn('size-10px rounded-sm', CHART_SERIES_BG[p.series])} style={texture ? chartTextureStyle(p.series) : undefined} />
            <span className="truncate text-text-xs font-medium leading-5 text-text-secondary">{p.label}</span>
            <span className="text-right text-text-xs font-medium leading-5 tabular-nums text-text-primary">{formatValue(p.value)}</span>
            <span className="text-right text-text-xxs leading-4 tabular-nums text-text-secondary">
              {formatChartNumber(Math.round((p.value / total) * 1000) / 10, 1)} %
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
