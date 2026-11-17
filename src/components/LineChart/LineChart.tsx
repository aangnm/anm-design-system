import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { labelStep, useElementWidth } from '@/lib/useElementWidth'
import { useChartHover } from '@/lib/useChartHover'
import { ChartTooltip } from '@/components/ChartTooltip'
import { Legend, describeChart, CHART_SERIES_TEXT, formatChartNumber, type ChartSeriesIndex } from '@/components/Legend'

// Mirrors the Line Chart component (Data Display page): trend over time for
// 1-8 series. Why (from Figma) — series colours are used in fixed order
// (chart/series-1 upward) so the same series keeps its colour across every
// chart in a product; the Conversion/Retention/Churn sample data is illustrative only.
// The axis is embedded chrome, not a standalone component. 2px lines, end
// markers with a 2px surface ring, recessive gridlines (border/subtle, the
// baseline border/subtle), legend always present, axis text on the 11px floor
// with en-US numbers. Container: surface/container + subtle border. Data-driven,
// same "static vector in Figma, real polyline in code" call as Sparkline/Bar
// Chart. Hover (or tap on touch) shows a crosshair snapped to the nearest point
// and a Chart Tooltip with every series' value — the Figma Chart Tooltip;
// `tooltip={false}` turns it off. The text alternative still carries every
// value, so the hover is an enhancement, not the only way to read it.

export interface LineChartSeries {
  label: string
  series: ChartSeriesIndex
  data: number[]
}

export interface LineChartProps extends HTMLAttributes<HTMLDivElement> {
  series: LineChartSeries[]
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

export function LineChart({
  series,
  categories,
  width: fixedWidth,
  height = 160,
  formatValue = (v) => formatChartNumber(v, 1),
  tooltip = true,
  className,
  'aria-label': ariaLabel,
  ...props
}: LineChartProps) {
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
      className={cn(
        fixedWidth ? 'w-fit' : 'w-full',
        'flex flex-col items-start gap-14px overflow-hidden rounded-lg border border-border-subtle bg-surface-container p-container-sm',
        className,
      )}
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
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" role="img" aria-label={ariaLabel ?? describeChart('Line chart', series, categories)} className="overflow-visible">
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
