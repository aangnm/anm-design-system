import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Legend, describeChart, CHART_SERIES_TEXT, formatChartNumber, type ChartSeriesIndex } from '@/components/Legend'

// Mirrors the Line Chart component (Data Display page): trend over time for
// 1-8 series. Why (from Figma) — series colours are used in fixed order
// (chart/series-1 upward) so the same series keeps its colour across every
// chart in a product; the Conversión/Retención/Abandono sample data is illustrative only.
// The axis is embedded chrome, not a standalone component. 2px lines, end
// markers with a 2px surface ring, recessive gridlines (border/subtle, the
// baseline border/subtle), legend always present, axis text on the 11px floor
// with decimal commas. Container: surface/container + subtle border. Data-driven,
// same "static vector in Figma, real polyline in code" call as Sparkline/Bar
// Chart. Not interactive (a labelled image).

export interface LineChartSeries {
  label: string
  series: ChartSeriesIndex
  data: number[]
}

export interface LineChartProps extends HTMLAttributes<HTMLDivElement> {
  series: LineChartSeries[]
  categories: string[]
  /** Plot width in px. */
  width?: number
  /** Plot height in px. */
  height?: number
  /** Formats y-axis labels; defaults to one decimal with a comma (`0,9`). */
  formatValue?: (value: number) => string
}

export function LineChart({
  series,
  categories,
  width = 360,
  height = 160,
  formatValue = (v) => formatChartNumber(v, 1),
  className,
  'aria-label': ariaLabel,
  ...props
}: LineChartProps) {
  const allValues = series.flatMap((s) => s.data)
  const max = Math.max(...allValues)
  const min = Math.min(...allValues)
  const mid = (max + min) / 2
  const range = max - min || 1
  const pad = 6

  function toPoints(data: number[]) {
    const n = data.length
    return data.map((v, i) => {
      const x = n > 1 ? (i / (n - 1)) * width : width / 2
      const y = pad + height - pad * 2 - ((v - min) / range) * (height - pad * 2)
      return { x, y }
    })
  }

  return (
    <div
      className={cn(
        'flex w-fit flex-col items-start gap-14px overflow-hidden rounded-lg border border-border-subtle bg-surface-container p-16px',
        className,
      )}
      {...props}
    >
      <Legend items={series.map((s) => ({ label: s.label, series: s.series }))} />
      <div className="flex items-start gap-8px">
        <div className="flex flex-col items-end justify-between text-text-xxs leading-4 text-text-secondary" style={{ height }}>
          <p>{formatValue(max)}</p>
          <p>{formatValue(mid)}</p>
          <p>{formatValue(min)}</p>
        </div>
        <div className="flex flex-col items-start gap-6px">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" role="img" aria-label={ariaLabel ?? describeChart('Gráfico de líneas', series, categories)} className="overflow-visible">
            <line x1={0} y1={pad + 0.5} x2={width} y2={pad + 0.5} stroke="var(--border-subtle)" strokeWidth={1} />
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="var(--border-subtle)" strokeWidth={1} />
            <line x1={0} y1={height - pad + 0.5} x2={width} y2={height - pad + 0.5} stroke="var(--border-subtle)" strokeWidth={1} />
            {series.map((s) => {
              const points = toPoints(s.data)
              const last = points[points.length - 1]
              return (
                <g key={s.series} className={CHART_SERIES_TEXT[s.series]}>
                  <polyline
                    points={points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx={last.x} cy={last.y} r={3.5} fill="currentColor" stroke="var(--surface-container)" strokeWidth={2} />
                </g>
              )
            })}
          </svg>
          <div className="flex items-start justify-between text-text-xxs leading-4 text-text-secondary" style={{ width }}>
            {categories.map((c) => (
              <p key={c}>{c}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
