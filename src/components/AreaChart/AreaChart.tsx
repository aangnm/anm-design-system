import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { labelStep, useElementWidth } from '@/lib/useElementWidth'
import { useChartHover } from '@/lib/useChartHover'
import { ChartTooltip } from '@/components/ChartTooltip'
import { Legend, describeChart, CHART_SERIES_TEXT, CHART_SERIES_FILL, formatChartNumber, type ChartSeriesIndex } from '@/components/Legend'

// Mirrors the Area Chart component (Data Display page): magnitude/volume over
// time. Why (from Figma) — best for 1-2 non-overlapping series or a stacked
// total (3+ crossing series should use Line Chart instead, since stacked
// areas hide the series behind them). The fill is bound to opacity/chart-fill
// (18%) rather than a hardcoded value, so the whole chart family shifts
// together if that reading changes — kept as a real token here, not inlined.
// Same container as Line Chart (surface/container, subtle border), gridlines
// border/subtle, baseline included, axis text on the 11px floor with
// en-US numbers. Hover (or tap on touch) shows a crosshair snapped to the nearest point
// and a Chart Tooltip with every series' value — the Figma Chart Tooltip;
// `tooltip={false}` turns it off. The text alternative still carries every
// value, so the hover is an enhancement, not the only way to read it.

export interface AreaChartSeries {
  label: string
  series: ChartSeriesIndex
  data: number[]
}

export interface AreaChartProps extends HTMLAttributes<HTMLDivElement> {
  series: AreaChartSeries[]
  categories: string[]
  /** Fixed plot width in px. Leave it out and the chart fills its container. */
  width?: number
  /** Plot height in px. */
  height?: number
  /** Formats y-axis labels and tooltip values; defaults to one decimal (`0.9`). */
  formatValue?: (value: number) => string
  /** Hover readout with a crosshair and Chart Tooltip (default on). */
  tooltip?: boolean
}

export function AreaChart({ series, categories, width: fixedWidth, height = 160, formatValue = (v) => formatChartNumber(v, 1), tooltip = true, className, 'aria-label': ariaLabel, ...props }: AreaChartProps) {
  // Fills its container unless `width` is set; geometry is redrawn at the real width.
  const [plotRef, measured] = useElementWidth(360)
  const width = fixedWidth ?? measured
  const step = labelStep(categories.length, width)
  const allValues = series.flatMap((s) => s.data)
  const max = Math.max(...allValues)
  const min = Math.min(...allValues)
  const mid = (max + min) / 2
  const range = max - min || 1
  const pad = 6
  const n = categories.length
  const { hover, handlers } = useChartHover(n)
  const hx = (i: number) => (n > 1 ? (i / (n - 1)) * width : width / 2)
  const hy = (v: number) => pad + height - pad * 2 - ((v - min) / range) * (height - pad * 2)

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
      className={cn(fixedWidth ? 'w-fit' : 'w-full',
        'flex flex-col items-start gap-14px overflow-hidden rounded-lg border border-border-subtle bg-surface-container p-container-sm', className)}
      {...props}
    >
      <Legend items={series.map((s) => ({ label: s.label, series: s.series }))} />
      <div className={cn('flex items-start gap-8px', !fixedWidth && 'w-full')}>
        <div className="flex flex-col items-end justify-between text-text-xxs leading-4 text-text-secondary" style={{ height }}>
          <p>{formatValue(max)}</p>
          <p>{formatValue(mid)}</p>
          <p>{formatValue(min)}</p>
        </div>
        <div ref={plotRef} className={cn('flex flex-col items-start gap-6px', !fixedWidth && 'min-w-0 flex-1')}>
          <div data-chart-plot className="relative" style={{ width, height }} {...(tooltip ? handlers : {})}>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" role="img" aria-label={ariaLabel ?? describeChart('Area chart', series, categories)}>
              <line x1={0} y1={pad + 0.5} x2={width} y2={pad + 0.5} stroke="var(--border-subtle)" strokeWidth={1} />
              <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="var(--border-subtle)" strokeWidth={1} />
              <line x1={0} y1={height - pad + 0.5} x2={width} y2={height - pad + 0.5} stroke="var(--border-subtle)" strokeWidth={1} />
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
              {tooltip && hover !== null ? (
                <g>
                  <line x1={hx(hover)} x2={hx(hover)} y1={0} y2={height} stroke="var(--border-emphasis)" strokeWidth={1} />
                  {series.map((s) => (
                    <circle key={s.series} cx={hx(hover)} cy={hy(s.data[hover])} r={4} fill="currentColor" stroke="var(--surface-container)" strokeWidth={2} className={CHART_SERIES_TEXT[s.series]} />
                  ))}
                </g>
              ) : null}
            </svg>
            {tooltip && hover !== null ? (
              <ChartTooltip
                className="pointer-events-none absolute top-8px z-[var(--z-index-dropdown)]"
                style={hx(hover) + 162 > width ? { right: width - hx(hover) + 12 } : { left: hx(hover) + 12 }}
                heading={categories[hover]}
                rows={series.map((s) => ({ label: s.label, series: s.series, value: formatValue(s.data[hover]) }))}
              />
            ) : null}
          </div>
          <div className="flex items-start justify-between text-text-xxs leading-4 text-text-secondary" style={{ width }}>
            {categories.map((c, i) => (
              <p key={c} aria-hidden={i % step !== 0 || undefined}>{i % step === 0 ? c : ''}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
