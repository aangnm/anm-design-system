import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Legend, CHART_SERIES_TEXT, CHART_SERIES_FILL, type ChartSeriesIndex } from '@/components/Legend'

// Mirrors the Area Chart component (Data Display page): magnitude/volume over
// time. Why (from Figma) — best for 1-2 non-overlapping series or a stacked
// total (3+ crossing series should use Line Chart instead, since stacked
// areas hide the series behind them). The fill is bound to opacity/chart-fill
// (18%) rather than a hardcoded value, so the whole chart family shifts
// together if that reading changes — kept as a real token here, not inlined.

export interface AreaChartSeries {
  label: string
  series: ChartSeriesIndex
  data: number[]
}

export interface AreaChartProps extends HTMLAttributes<HTMLDivElement> {
  series: AreaChartSeries[]
  categories: string[]
  /** Plot width in px. */
  width?: number
  /** Plot height in px. */
  height?: number
}

export function AreaChart({ series, categories, width = 360, height = 160, className, ...props }: AreaChartProps) {
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
      className={cn('flex flex-col items-start gap-14px overflow-hidden rounded-lg border border-border-default bg-surface-container p-16px', className)}
      {...props}
    >
      <Legend items={series.map((s) => ({ label: s.label, series: s.series }))} />
      <div className="flex items-start gap-8px">
        <div className="flex h-[160px] flex-col items-end justify-between text-[10px] leading-[14px] text-text-secondary" style={{ height }}>
          <p>{max.toFixed(1)}</p>
          <p>{mid.toFixed(1)}</p>
          <p>{min.toFixed(1)}</p>
        </div>
        <div className="flex flex-col items-start gap-6px">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" role="img">
            <line x1={0} y1={pad} x2={width} y2={pad} stroke="var(--border-muted)" strokeWidth={1} />
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="var(--border-muted)" strokeWidth={1} />
            <line x1={0} y1={height - pad} x2={width} y2={height - pad} stroke="var(--border-muted)" strokeWidth={1} />
            {series.map((s) => {
              const points = toPoints(s.data)
              const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
              const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(2)},${height} L${points[0].x.toFixed(2)},${height} Z`
              return (
                <g key={s.series}>
                  <path d={areaPath} className={cn(CHART_SERIES_FILL[s.series], 'opacity-chart-fill')} stroke="none" />
                  <path d={linePath} className={CHART_SERIES_TEXT[s.series]} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
              )
            })}
          </svg>
          <div className="flex w-full items-start justify-between text-[10px] leading-[14px] text-text-secondary" style={{ width }}>
            {categories.map((c) => (
              <p key={c}>{c}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
