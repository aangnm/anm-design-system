import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { CHART_SERIES_FILL, CHART_SERIES_TEXT, formatChartNumber, type ChartSeriesIndex } from '@/components/Legend'

// Mirrors the Small Multiples component (Data Display page, Figma v0.96): the
// same small area chart repeated once per category, in a grid, so shapes can
// be compared at a glance — the answer to "eight series on one Line Chart".
//
// Why (from Figma) — every panel shares ONE y-scale by default. Independent
// scales make a flat series look as volatile as a steep one, which is the
// mistake small multiples exist to avoid; the shared range is stated once in
// the footer instead of on every panel. One series colour throughout: the
// panels are told apart by their label and position, not by hue, so the
// 8-hue palette stays free for the chart it belongs to. `highlight` draws one
// panel in the series colour and the rest in a neutral, for "this one versus
// the field". Same container, gridline and 11px axis floor as Area Chart.

export interface SmallMultiplesPanel {
  label: string
  data: number[]
  /** Headline value for the panel, already formatted (e.g. "$12,400"). */
  value?: string
}

export interface SmallMultiplesProps extends HTMLAttributes<HTMLDivElement> {
  panels: SmallMultiplesPanel[]
  /** First and last x-axis labels, shown under every panel. */
  range?: [string, string]
  columns?: 2 | 3 | 4
  series?: ChartSeriesIndex
  /** Index of one panel to emphasise; the others turn neutral. */
  highlight?: number
  /** Give each panel its own y-scale. Off by default, on purpose. */
  independentScales?: boolean
  /** Unit for the shared-scale footer (e.g. "USD"). */
  unit?: string
  formatValue?: (value: number) => string
  /** Plot height of each panel, px. */
  plotHeight?: number
}

const COLS = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } as const

export function SmallMultiples({
  panels,
  range,
  columns = 3,
  series = 1,
  highlight,
  independentScales = false,
  unit,
  formatValue = (v) => formatChartNumber(v),
  plotHeight = 56,
  className,
  ...props
}: SmallMultiplesProps) {
  const all = panels.flatMap((p) => p.data)
  const sharedMin = Math.min(0, ...all)
  const sharedMax = Math.max(...all)
  const W = 100
  const H = plotHeight
  const pad = 2

  return (
    <div
      className={cn('flex flex-col gap-16px rounded-lg border border-border-subtle bg-surface-container p-16px', className)}
      {...props}
    >
      <div className={cn('grid gap-x-16px gap-y-20px', COLS[columns])}>
        {panels.map((p, i) => {
          const min = independentScales ? Math.min(...p.data) : sharedMin
          const max = independentScales ? Math.max(...p.data) : sharedMax
          const span = max - min || 1
          const n = p.data.length
          const pts = p.data.map((v, j) => ({
            x: n > 1 ? (j / (n - 1)) * W : W / 2,
            y: pad + (H - pad * 2) * (1 - (v - min) / span),
          }))
          const line = pts.map((q, j) => `${j ? 'L' : 'M'}${q.x.toFixed(2)},${q.y.toFixed(2)}`).join(' ')
          const area = `${line} L${W},${H} L0,${H} Z`
          const muted = highlight !== undefined && highlight !== i
          return (
            <figure key={p.label} className="m-0 flex min-w-0 flex-col gap-6px">
              <figcaption className="flex items-baseline justify-between gap-8px">
                <span className={cn('truncate text-body-small', muted ? 'text-text-secondary' : 'font-medium text-text-primary')}>{p.label}</span>
                {p.value && <span className="shrink-0 text-body-small font-medium text-text-primary tabular-nums">{p.value}</span>}
              </figcaption>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                className="block w-full"
                style={{ height: H }}
                role="img"
                aria-label={`${p.label}: ${p.data.map((v) => formatValue(v)).join(', ')}`}
              >
                <line x1={0} y1={H - 0.5} x2={W} y2={H - 0.5} stroke="var(--border-subtle)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <line x1={0} y1={0.5} x2={W} y2={0.5} stroke="var(--border-subtle)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <path d={area} className={cn(muted ? 'fill-border-default' : CHART_SERIES_FILL[series], 'opacity-chart-fill')} />
                <path
                  d={line}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={muted ? 1.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className={muted ? 'text-border-default' : CHART_SERIES_TEXT[series]}
                />
              </svg>
              {range && (
                <div className="flex justify-between text-label-default text-text-secondary">
                  <span>{range[0]}</span>
                  <span>{range[1]}</span>
                </div>
              )}
            </figure>
          )
        })}
      </div>
      <p className="m-0 border-t border-border-subtle pt-16px text-label-default text-text-secondary">
        {independentScales
          ? 'Each panel uses its own scale; compare shapes, not heights.'
          : `Shared scale: ${formatValue(sharedMin)} – ${formatValue(sharedMax)}${unit ? ` ${unit}` : ''}`}
      </p>
    </div>
  )
}
