import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { chartTextureStyle } from './chartTexture'

// Mirrors the Legend component (Data Display page): the series key for any
// multi-series chart. Why (from Figma) — one swatch (chart/series-N) + label
// per series, in fixed slot order, so the same series keeps its colour
// across every chart in a product; labels wear text/secondary (13/20
// Medium), never the series colour, and a legend should always ship with 2+ series since the
// categorical palette carries a documented light-mode contrast warning on a
// few hues that the legend/direct labels mitigate.

export type ChartSeriesIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export const CHART_SERIES_BG: Record<ChartSeriesIndex, string> = {
  1: 'bg-chart-series-1',
  2: 'bg-chart-series-2',
  3: 'bg-chart-series-3',
  4: 'bg-chart-series-4',
  5: 'bg-chart-series-5',
  6: 'bg-chart-series-6',
  7: 'bg-chart-series-7',
  8: 'bg-chart-series-8',
}

export const CHART_SERIES_TEXT: Record<ChartSeriesIndex, string> = {
  1: 'text-chart-series-1',
  2: 'text-chart-series-2',
  3: 'text-chart-series-3',
  4: 'text-chart-series-4',
  5: 'text-chart-series-5',
  6: 'text-chart-series-6',
  7: 'text-chart-series-7',
  8: 'text-chart-series-8',
}

export const CHART_SERIES_FILL: Record<ChartSeriesIndex, string> = {
  1: 'fill-chart-series-1',
  2: 'fill-chart-series-2',
  3: 'fill-chart-series-3',
  4: 'fill-chart-series-4',
  5: 'fill-chart-series-5',
  6: 'fill-chart-series-6',
  7: 'fill-chart-series-7',
  8: 'fill-chart-series-8',
}

/**
 * Chart number format: en-US, decimal point and thousands comma, e.g. `0.86`,
 * `1,284`. Shared by the axis/tooltip text of the whole chart family so no
 * chart mixes formats.
 */
export function formatChartNumber(value: number, decimals?: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals ?? 3,
  }).format(value)
}

/**
 * Text alternative for a chart (role="img"): the kind of chart, then every
 * series with its values per category, en-US formatted. Screen readers get
 * the same numbers the picture shows. Charts use it as their default
 * `aria-label`; pass your own `aria-label` to summarise instead.
 */
export function describeChart(
  kind: string,
  series: { label: string; data: number[] }[],
  categories: string[],
  format: (value: number) => string = (v) => formatChartNumber(v),
): string {
  const parts = series.map((s) => `${s.label}: ${s.data.map((v, i) => `${categories[i] ?? i + 1} ${format(v)}`).join(', ')}`)
  return `${kind}. ${parts.join('; ')}`
}

export interface LegendItem {
  label: string
  series: ChartSeriesIndex
}

export interface LegendProps extends HTMLAttributes<HTMLDivElement> {
  items: LegendItem[]
  /** Show each series' texture in its swatch, to match a textured chart. */
  texture?: boolean
}

export function Legend({ items, texture, className, ...props }: LegendProps) {
  return (
    <div className={cn('flex items-center gap-16px', className)} {...props}>
      {items.map((item) => (
        <div key={item.series} className="flex items-center gap-6px">
          <div className={cn('size-10px shrink-0 rounded-sm', CHART_SERIES_BG[item.series])} style={texture ? chartTextureStyle(item.series) : undefined} />
          <p className="whitespace-nowrap text-text-xs font-medium leading-5 text-text-secondary">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
