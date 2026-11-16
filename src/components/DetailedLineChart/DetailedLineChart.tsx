import { useState } from 'react'
import type { HTMLAttributes } from 'react'
import { CHART_SERIES_BG, CHART_SERIES_TEXT, describeChart, formatChartNumber, type ChartSeriesIndex } from '@/components/Legend'
import { ChartTooltip } from '@/components/ChartTooltip'
import { cn } from '@/lib/utils'
import { labelStep, useElementWidth } from '@/lib/useElementWidth'

// Mirrors the Line Chart · Detailed component set (Data Display page): several
// series plus the context that explains them — a target line, an optimal
// range band, a forecast zone, event markers and (State=Hover) a crosshair
// that snaps to the nearest x with the values in a Chart Tooltip.
//
// Why (from Figma) — only the series carry colour. Target, band edges, events
// and the forecast zone use neutral tokens; the one tinted layer, the band, is
// semantic/success at opacity/chart-fill so the lines stay on top. The
// forecast is dashed, shaded and labelled (dashes alone fail in greyscale);
// the target is a dashed line with a text label. The legend lists every
// non-series element. Use LineChart for plain trends.
//
// Hit area — the whole plot is one hover target that snaps to the nearest
// point; on touch a tap pins the crosshair (tap again to release).

export interface DetailedLineSeries {
  label: string
  series: ChartSeriesIndex
  data: number[]
}

export interface DetailedLineChartProps extends HTMLAttributes<HTMLDivElement> {
  series: DetailedLineSeries[]
  /** One label per data point (the x axis). */
  categories: string[]
  /** Labels shown under the axis; defaults to every category. */
  axisLabels?: string[]
  /** Points from this index onward are the forecast (dashed, shaded). */
  forecastFrom?: number
  forecastLabel?: string
  target?: { value: number; label: string }
  band?: { from: number; to: number; label: string }
  events?: { index: number; label: string }[]
  /** Fixed y range; defaults to the data range padded to nice numbers. */
  min?: number
  max?: number
  width?: number
  height?: number
  formatValue?: (value: number) => string
}

export function DetailedLineChart({
  series,
  categories,
  axisLabels,
  forecastFrom,
  forecastLabel = 'Forecast',
  target,
  band,
  events = [],
  min: minProp,
  max: maxProp,
  width: fixedWidth,
  height = 200,
  formatValue = (v) => formatChartNumber(v, 2),
  className,
  ...props
}: DetailedLineChartProps) {
  // Fills its container unless `width` is set; geometry is redrawn at the real width.
  const [plotRef, measured] = useElementWidth(560)
  const width = fixedWidth ?? measured
  const [hover, setHover] = useState<number | null>(null)
  const [pinned, setPinned] = useState(false)
  const n = categories.length
  const values = series.flatMap((s) => s.data).concat(target ? [target.value] : [], band ? [band.from, band.to] : [])
  const min = minProp ?? Math.floor(Math.min(...values) * 10) / 10
  const max = maxProp ?? Math.ceil(Math.max(...values) * 10) / 10
  const range = max - min || 1
  const x = (i: number) => (n > 1 ? (i / (n - 1)) * width : width / 2)
  const y = (v: number) => height - ((v - min) / range) * height
  const ticks = Array.from({ length: 6 }, (_, i) => min + (range * (5 - i)) / 5)
  const fc = forecastFrom ?? n

  const locate = (clientX: number, rect: DOMRect) => Math.max(0, Math.min(n - 1, Math.round(((clientX - rect.left) / rect.width) * (n - 1))))

  return (
    <div className={cn(fixedWidth ? 'w-fit' : 'w-full', 'flex flex-col gap-14px rounded-lg border border-border-subtle bg-surface-container p-16px', className)} {...props}>
      <div className="flex flex-wrap items-center gap-16px text-text-xs font-medium leading-5 text-text-secondary">
        {series.map((s) => (
          <span key={s.series} className="flex items-center gap-6px">
            <span className={cn('size-10px rounded-sm', CHART_SERIES_BG[s.series])} />
            {s.label}
          </span>
        ))}
        {target ? (
          <span className="flex items-center gap-6px">
            <span className="w-16px border-t border-dashed border-text-secondary" />
            {target.label}
          </span>
        ) : null}
        {forecastFrom !== undefined ? (
          <span className="flex items-center gap-6px">
            <span className="w-16px border-t-2 border-dotted border-text-secondary" />
            {forecastLabel}
          </span>
        ) : null}
      </div>
      <div className="flex w-full gap-8px">
        <div className="flex flex-col justify-between text-right text-text-xxs leading-4 text-text-secondary" style={{ height: height + 8 }}>
          {ticks.map((t) => (
            <span key={t}>{formatChartNumber(t, 1)}</span>
          ))}
        </div>
        <div ref={plotRef} className={cn('flex flex-col gap-6px', !fixedWidth && 'min-w-0 flex-1')}>
          <div
            className="relative"
            style={{ width, height }}
            onPointerMove={(e) => !pinned && setHover(locate(e.clientX, e.currentTarget.getBoundingClientRect()))}
            onPointerLeave={() => !pinned && setHover(null)}
            onClick={(e) => {
              if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'mouse') return
              setPinned((p) => !p)
              setHover(locate(e.clientX, e.currentTarget.getBoundingClientRect()))
            }}
            role="img"
            aria-label={describeChart('Detailed line chart', series, categories, formatValue)}
          >
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="overflow-visible">
              {ticks.map((t) => (
                <line key={t} x1={0} x2={width} y1={y(t)} y2={y(t)} stroke="var(--border-subtle)" strokeWidth={1} />
              ))}
              {band ? (
                <g>
                  <rect x={0} y={y(band.to)} width={width} height={y(band.from) - y(band.to)} fill="var(--semantic-success)" style={{ opacity: "var(--opacity-chart-fill)" }} />
                  <text x={4} y={y(band.from) - 4} className="fill-text-secondary text-text-xxs">{band.label}</text>
                </g>
              ) : null}
              {fc < n ? (
                <g>
                  <rect x={x(fc - 1)} y={0} width={width - x(fc - 1)} height={height} fill="var(--surface-container-high)" opacity={0.6} />
                  <text x={width - 4} y={height - 4} textAnchor="end" className="fill-text-secondary text-text-xxs">{forecastLabel}</text>
                </g>
              ) : null}
              {target ? (
                <g>
                  <line x1={0} x2={width} y1={y(target.value)} y2={y(target.value)} stroke="var(--text-secondary)" strokeWidth={1} strokeDasharray="4 3" />
                  <text x={4} y={y(target.value) - 4} className="fill-text-secondary text-text-xxs">{target.label}</text>
                </g>
              ) : null}
              {events.map((ev) => (
                <g key={ev.index}>
                  <line x1={x(ev.index)} x2={x(ev.index)} y1={14} y2={height} stroke="var(--border-default)" strokeWidth={1} />
                  <circle cx={x(ev.index)} cy={10} r={3} fill="var(--text-secondary)" />
                  <text x={x(ev.index) + 6} y={13} className="fill-text-secondary text-text-xxs">{ev.label}</text>
                </g>
              ))}
              {series.map((s) => {
                const pts = s.data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`)
                const solid = pts.slice(0, Math.min(fc, n)).join(' ')
                const dashed = fc < n ? pts.slice(fc - 1).join(' ') : ''
                const last = s.data.length - 1
                return (
                  <g key={s.series} className={CHART_SERIES_TEXT[s.series]}>
                    <polyline points={solid} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    {dashed ? <polyline points={dashed} stroke="currentColor" strokeWidth={2} strokeDasharray="4 4" strokeLinecap="round" /> : null}
                    <circle
                      cx={x(last)}
                      cy={y(s.data[last])}
                      r={3.5}
                      fill={fc < n ? 'var(--surface-container)' : 'currentColor'}
                      stroke={fc < n ? 'currentColor' : 'var(--surface-container)'}
                      strokeWidth={2}
                    />
                  </g>
                )
              })}
              {hover !== null ? (
                <g>
                  <line x1={x(hover)} x2={x(hover)} y1={0} y2={height} stroke="var(--border-emphasis)" strokeWidth={1} />
                  {series.map((s) => (
                    <circle key={s.series} cx={x(hover)} cy={y(s.data[hover])} r={4} fill="currentColor" stroke="var(--surface-container)" strokeWidth={2} className={CHART_SERIES_TEXT[s.series]} />
                  ))}
                </g>
              ) : null}
            </svg>
            {hover !== null ? (
              <ChartTooltip
                className="pointer-events-none absolute top-24px"
                style={hover > n / 2 ? { right: width - x(hover) + 12 } : { left: x(hover) + 12 }}
                heading={categories[hover]}
                rows={series.map((s) => ({ label: s.label, series: s.series, value: formatValue(s.data[hover]) }))}
              />
            ) : null}
          </div>
          <div className="flex justify-between text-text-xxs leading-4 text-text-secondary" style={{ width }}>
            {(axisLabels ?? categories).map((c, i, all) => {
              const step = labelStep(all.length, width, 56)
              return <span key={c} aria-hidden={i % step !== 0 || undefined}>{i % step === 0 ? c : ''}</span>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
