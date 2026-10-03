import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { formatChartNumber } from '@/components/Legend'

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
// the card, which a faded blue cannot. Not interactive (a labelled image).
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
  /** Formats tick and value labels; defaults to es-EC numbers (`1.284`). */
  formatValue?: (value: number) => string
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
  className,
  ...props
}: BarChartProps) {
  const top = max ?? niceMax(Math.max(...data.map((d) => d.value), 0))
  const tickValues = Array.from({ length: ticks }, (_, i) => (top * (ticks - 1 - i)) / (ticks - 1))
  const plotHeight = height + EDGE * 2

  return (
    <div className={cn('flex w-[360px] flex-col items-stretch gap-8px', className)} role="img" {...props}>
      <div className="flex gap-8px" style={{ height: plotHeight }}>
        {/* y axis */}
        <div className="flex w-32px shrink-0 flex-col items-end justify-between text-text-xxs leading-4 text-text-secondary" aria-hidden>
          {tickValues.map((t) => (
            <span key={t}>{formatValue(t)}</span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          {/* gridlines */}
          <div className="absolute inset-x-0 flex flex-col justify-between" style={{ top: EDGE, height }} aria-hidden>
            {tickValues.map((t, i) => (
              <div key={t} className={cn('h-px w-full', i === tickValues.length - 1 ? 'bg-border-muted' : 'bg-border-subtle')} />
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
