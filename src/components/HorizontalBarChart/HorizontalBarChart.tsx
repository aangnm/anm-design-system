import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { describeChart, formatChartNumber } from '@/components/Legend'

// Horizontal Bar Chart (Data Display page, Figma v1.1): one bar per category,
// laid out as rows — the label on the left, the bar, and the exact value at
// its end. Use it for rankings and for categories with long names (accounts,
// campaigns, pages), where a vertical Bar Chart would have to truncate.
//
// Why — rankings are read top to bottom, so `sort="desc"` puts the largest
// first; leave it unsorted when the order means something (a funnel, a fixed
// list of regions). Bars use chart/series-1 like Bar Chart; `highlight` keeps
// one row in colour and turns the rest icon/muted, the same "where to look"
// rule as Bar Chart's Highlight latest. Values are printed at the end of each
// bar, so there is no axis to read. Bars are 12px high on a 32px row: the
// label sets the rhythm, not the bar. Not interactive (a labelled image).

export interface HorizontalBarDatum {
  label: string
  value: number
}

export interface HorizontalBarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: HorizontalBarDatum[]
  /** `desc` ranks largest first; `none` keeps the given order. */
  sort?: 'desc' | 'none'
  /** Value at the full bar length; defaults to the largest value. */
  max?: number
  /** Label of the row to keep in colour; the rest turn icon/muted. */
  highlight?: string
  formatValue?: (value: number) => string
}

export function HorizontalBarChart({
  data,
  sort = 'none',
  max,
  highlight,
  formatValue = (v) => formatChartNumber(v),
  className,
  'aria-label': ariaLabel,
  ...props
}: HorizontalBarChartProps) {
  const rows = sort === 'desc' ? [...data].sort((a, b) => b.value - a.value) : data
  const top = max ?? Math.max(...rows.map((d) => d.value), 1)

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? describeChart('Horizontal bar chart', [{ label: 'Values', data: rows.map((d) => d.value) }], rows.map((d) => d.label), formatValue)}
      className={cn('grid w-full min-w-[240px] grid-cols-[minmax(0,max-content)_minmax(0,1fr)] items-center gap-x-12px', className)}
      {...props}
    >
      {rows.map((d) => (
        <div key={d.label} className="contents">
          <span className="truncate py-6px text-text-xs leading-5 text-text-secondary">{d.label}</span>
          <div className="flex min-w-0 items-center gap-8px">
            <div
              className={cn('h-12px shrink-0 rounded-r-xs', highlight && d.label !== highlight ? 'bg-icon-muted' : 'bg-chart-series-1')}
              style={{ width: `calc((100% - 80px) * ${Math.max(0, d.value) / top})` }}
            />
            <span className="whitespace-nowrap text-text-xs font-medium leading-5 tabular-nums text-text-primary">{formatValue(d.value)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
