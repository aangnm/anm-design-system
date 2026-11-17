import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { describeChart, formatChartNumber } from '@/components/Legend'
import { ChartTooltip } from '@/components/ChartTooltip'
import { useChartHover } from '@/lib/useChartHover'

// Mirrors the Bar Chart component (Data Display page). Why (from Figma) —
// bar heights come from data, so in code this is generated rather than a
// static asset; the Figma component documents chrome and spacing only. The
// y-axis + gridlines exist because a bar chart with no scale cannot be read;
// `showValues` prints each exact value above its bar. Bars are capped at
// 36px wide and stay centred in equal slots, so a wider card adds space
// between bars instead of making them thicker. They use chart/series-1, not
// interactive/primary: data marks should carry less visual weight than the
// figures they show. `highlightLatest` (on by default) draws every period in
// icon/muted except the newest, which keeps the data blue so the eye lands on
// "now"; turn it off when every period matters equally. The context bars use
// icon/muted rather than a faded blue because graphics must keep 3:1 against
// the card, which a faded blue cannot. Hovering (or tapping) a slot tints
// its column and shows a Chart Tooltip with the exact value; `tooltip={false}`
// turns it off. The text alternative carries every value either way.
//
// Plot geometry: 150px of scale (0 → `max`) inside a 164px plot;
// slots flex on an 8px gap, y-axis column 32px, 7px of breathing room above
// and below the scale. Tick/value/label text is on the 11px floor.

export interface BarChartDatum {
  label: string
  value: number
}

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: BarChartDatum[]
  /** Scale height in px (value `max` maps to this). */
  height?: number
  /** Value mapped to full scale height; defaults to the largest datum rounded up to a "nice" step. */
  max?: number
  /** Number of y-axis ticks / gridlines, including 0 and `max`. */
  ticks?: number
  /** Prints each value above its bar — Figma's "Show values". */
  showValues?: boolean
  /** Newest bar keeps chart/series-1, the rest turn icon/muted — Figma's "Highlight latest". */
  highlightLatest?: boolean
  /** Formats tick and value labels; defaults to en-US numbers (`1,284`). */
  formatValue?: (value: number) => string
  /** Hover readout: column tint plus a Chart Tooltip (default on). */
  tooltip?: boolean
  /** Name of the measure in the tooltip row. */
  seriesLabel?: string
}

const MAX_BAR_WIDTH = 36
const EDGE = 7

function niceMax(peak: number) {
  if (peak <= 0) return 1
  const exp = 10 ** Math.floor(Math.log10(peak))
  const step = exp / 2
  return Math.ceil(peak / step) * step
}

export function BarChart({
  data,
  height = 150,
  max,
  ticks = 4,
  showValues = true,
  highlightLatest = true,
  formatValue = (v) => formatChartNumber(v),
  tooltip = true,
  seriesLabel = 'Value',
  className,
  ...props
}: BarChartProps) {
  const top = max ?? niceMax(Math.max(...data.map((d) => d.value), 0))
  const tickValues = Array.from({ length: ticks }, (_, i) => (top * (ticks - 1 - i)) / (ticks - 1))
  const plotHeight = height + EDGE * 2
  const n = data.length
  const { hover, handlers } = useChartHover(n, 'slot')
  // Slots flex on an 8px gap, so slot i's centre is (i + ½)·(W + 8)/n − 4.
  const centre = (i: number) => `calc(${((i + 0.5) / n) * 100}% + ${((i + 0.5) * 8) / n - 4}px)`

  return (
    <div className={cn('flex w-full min-w-[200px] flex-col items-stretch gap-8px', className)} role="img" aria-label={describeChart('Bar chart', [{ label: 'Values', data: data.map((d) => d.value) }], data.map((d) => d.label), formatValue)} {...props}>
      <div className="flex gap-8px" style={{ height: plotHeight }}>
        {/* y axis */}
        <div className="flex w-32px shrink-0 flex-col items-end justify-between text-text-xxs leading-4 text-text-secondary" aria-hidden>
          {tickValues.map((t) => (
            <span key={t}>{formatValue(t)}</span>
          ))}
        </div>

        <div data-chart-plot className="relative min-w-0 flex-1" {...(tooltip ? handlers : {})}>
          {tooltip && hover !== null ? (
            <div
              className="absolute rounded-sm bg-surface-container-high"
              style={{ top: 0, bottom: 0, left: `calc(${(hover / n) * 100}% + ${(hover * 8) / n}px)`, width: `calc((100% - ${8 * (n - 1)}px) / ${n})` }}
              aria-hidden
            />
          ) : null}
          {/* gridlines */}
          <div className="absolute inset-x-0 flex flex-col justify-between" style={{ top: EDGE, height }} aria-hidden>
            {tickValues.map((t, i) => (
              <div key={t} className={cn('h-px w-full', i === tickValues.length - 1 ? 'bg-border-subtle' : 'bg-border-subtle')} />
            ))}
          </div>
          {/* bars */}
          <div className="absolute inset-x-0 flex items-end gap-8px" style={{ bottom: EDGE }}>
            {data.map((d, i) => {
              const isLatest = i === data.length - 1
              const barHeight = top > 0 ? (d.value / top) * height : 0
              return (
                <div key={i} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-4px">
                  {showValues ? (
                    <span className="text-text-xxs font-medium leading-4 text-text-primary">{formatValue(d.value)}</span>
                  ) : null}
                  <div
                    className={cn('w-full', highlightLatest && !isLatest ? 'bg-icon-muted' : 'bg-chart-series-1')}
                    style={{ maxWidth: MAX_BAR_WIDTH, height: barHeight }}
                  />
                </div>
              )
            })}
          </div>
          {tooltip && hover !== null ? (
            <ChartTooltip
              className="pointer-events-none absolute top-0 z-[var(--z-index-dropdown)]"
              style={hover >= n / 2 ? { right: `calc(100% - ${centre(hover)} + 12px)` } : { left: `calc(${centre(hover)} + 12px)` }}
              heading={data[hover].label}
              rows={[{ label: seriesLabel, series: 1, value: formatValue(data[hover].value) }]}
            />
          ) : null}
        </div>
      </div>

      {/* x axis — same 8px gap and 40px (axis column + gap) inset as the plot */}
      <div className="flex gap-8px pl-40px" aria-hidden>
        {data.map((d, i) => (
          <span key={i} className="min-w-0 flex-1 text-center text-text-xxs leading-4 text-text-secondary">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
