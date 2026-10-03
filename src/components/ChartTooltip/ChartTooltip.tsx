import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { CHART_SERIES_BG, type ChartSeriesIndex } from '@/components/Legend'

// Mirrors the Chart Tooltip component (Data Display page): the crosshair/
// hover readout for Line & Area Chart. Why (from Figma) — one row per series
// with a colour dot, so the reading never depends on matching a line's
// colour by eye across the plot. Surface/emphasis + shadow-md; values wear
// text/primary, tabular. Axis/label text sits on the 11px floor; values are
// strings so callers format them (decimal comma: `0,86`).

export interface ChartTooltipRow {
  label: string
  value: string
  series: ChartSeriesIndex
}

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Header — the x value being read (e.g. a date). */
  heading: string
  rows: ChartTooltipRow[]
}

export function ChartTooltip({ heading, rows, className, ...props }: ChartTooltipProps) {
  return (
    <div
      className={cn('flex w-[150px] flex-col items-start gap-6px rounded-md bg-surface-emphasis px-10px py-8px shadow-md', className)}
      {...props}
    >
      <p className="text-text-xxs leading-4 text-text-secondary">{heading}</p>
      {rows.map((row) => (
        <div key={row.series} className="flex w-full items-center gap-6px">
          <div className={cn('size-8px shrink-0 rounded-full', CHART_SERIES_BG[row.series])} />
          <p className="whitespace-nowrap text-text-xxs leading-4 text-text-secondary">{row.label}</p>
          <div className="h-px min-w-px flex-1" />
          <p className="whitespace-nowrap text-text-xs font-medium leading-5 tabular-nums text-text-primary">{row.value}</p>
        </div>
      ))}
    </div>
  )
}
