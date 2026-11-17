import { useState, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { formatChartNumber } from '@/components/Legend'
import { ChartTooltip } from '@/components/ChartTooltip'

// Heatmap (Data Display page, Figma v1.1): a grid of rows × columns where each
// cell's tint shows its value — activity by weekday and hour, conversion by
// channel and week. Hover (or tap) a cell for its exact value in a Chart
// Tooltip.
//
// Why — the eye compares tints well only in a few steps, so values are
// bucketed into five steps of one hue (chart/series-1 mixed into the card
// surface at 20–100%), never a rainbow. Steps are equal intervals between
// `min` and `max`; the scale under the grid names both ends. Cells sit on a
// 2px gap of surface so neighbouring equal values still read as separate
// cells. An empty cell (null) stays the bare surface with a border, so "no
// data" never looks like "low". Cells carry no text by default; exact values
// come from the tooltip and the text alternative.

export interface HeatmapProps extends HTMLAttributes<HTMLDivElement> {
  rows: string[]
  columns: string[]
  /** values[row][column]; null for no data. */
  values: (number | null)[][]
  min?: number
  max?: number
  /** Cell size in px. */
  cellSize?: number
  formatValue?: (value: number) => string
  /** Name of the measure in the tooltip. */
  valueLabel?: string
}

const STEPS = [20, 40, 60, 80, 100]
const tint = (pct: number) => `color-mix(in oklab, var(--chart-series-1) ${pct}%, var(--surface-container))`

export function Heatmap({
  rows,
  columns,
  values,
  min: minProp,
  max: maxProp,
  cellSize = 28,
  formatValue = (v) => formatChartNumber(v),
  valueLabel = 'Value',
  className,
  'aria-label': ariaLabel,
  ...props
}: HeatmapProps) {
  const all = values.flat().filter((v): v is number => v !== null)
  const min = minProp ?? Math.min(...all)
  const max = maxProp ?? Math.max(...all)
  const step = (v: number) => Math.min(STEPS.length - 1, Math.floor(((v - min) / (max - min || 1)) * STEPS.length))
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null)
  const summary =
    ariaLabel ??
    `Heatmap, ${rows.length} rows by ${columns.length} columns, ${formatValue(min)} to ${formatValue(max)}. ` +
      rows.map((r, ri) => `${r}: ${columns.map((c, ci) => `${c} ${values[ri]?.[ci] === null || values[ri]?.[ci] === undefined ? 'no data' : formatValue(values[ri][ci] as number)}`).join(', ')}`).join('; ')

  return (
    <div className={cn('flex w-fit max-w-full flex-col gap-12px', className)} {...props}>
      <div role="img" aria-label={summary} className="relative" onPointerLeave={() => setHover(null)}>
        <div className="grid gap-2px" style={{ gridTemplateColumns: `max-content repeat(${columns.length}, ${cellSize}px)` }}>
          <span />
          {columns.map((c) => (
            <span key={c} className="truncate text-center text-text-xxs leading-4 text-text-secondary">{c}</span>
          ))}
          {rows.map((r, ri) => (
            <div key={r} className="contents">
              <span className="truncate pr-6px text-right text-text-xxs leading-4 text-text-secondary" style={{ lineHeight: `${cellSize}px` }}>{r}</span>
              {columns.map((c, ci) => {
                const v = values[ri]?.[ci] ?? null
                const on = hover?.r === ri && hover?.c === ci
                return (
                  <div
                    key={c}
                    onPointerEnter={() => setHover({ r: ri, c: ci })}
                    onClick={() => setHover({ r: ri, c: ci })}
                    className={cn('relative rounded-xs', v === null && 'border border-border-subtle', on && 'outline-2 outline-text-primary')}
                    style={{ height: cellSize, background: v === null ? undefined : tint(STEPS[step(v)]) }}
                  >
                    {on ? (
                      <ChartTooltip
                        className={cn('pointer-events-none absolute top-0 z-[var(--z-index-dropdown)]', ci >= columns.length / 2 ? 'right-[calc(100%+8px)]' : 'left-[calc(100%+8px)]')}
                        heading={`${r} · ${c}`}
                        rows={[{ label: valueLabel, series: 1, value: v === null ? 'No data' : formatValue(v) }]}
                      />
                    ) : null}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6px text-text-xxs leading-4 text-text-secondary" aria-hidden>
        <span>{formatValue(min)}</span>
        {STEPS.map((p) => (
          <span key={p} className="h-8px w-20px rounded-xs" style={{ background: tint(p) }} />
        ))}
        <span>{formatValue(max)}</span>
      </div>
    </div>
  )
}
