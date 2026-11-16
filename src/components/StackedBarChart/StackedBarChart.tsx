import type { HTMLAttributes } from 'react'
import { Legend, describeChart, CHART_SERIES_BG, chartTextureStyle, formatChartNumber, type ChartSeriesIndex } from '@/components/Legend'
import { cn } from '@/lib/utils'

// Mirrors the Stacked Bar Chart component set (Data Display page): how a total
// splits into parts across categories. Type=Absolute draws bars on a value
// scale with the total above each bar (`showTotals`); Type=Percent normalises
// every bar to 100 %. Series take chart/series-N in fixed order with series 1
// at the bottom; segments are separated by a 1px gap in the card surface,
// the top segment has 2px rounded top corners, and bars are capped at 36px,
// centred in equal slots, like Bar Chart. The legend is always present.
//
// Why (from Figma) — the stack order never changes, so a series keeps its
// place; only the bottom segment shares a baseline, so the totals and the
// legend carry the rest. No labels inside segments. Stop at about four
// series. Not interactive (a labelled image).

export interface StackedBarSeries {
  label: string
  series: ChartSeriesIndex
  /** One value per category, in category order. */
  data: number[]
}

export interface StackedBarChartProps extends HTMLAttributes<HTMLDivElement> {
  categories: string[]
  series: StackedBarSeries[]
  /** Figma's Type. */
  type?: 'absolute' | 'percent'
  /** Total above each bar (Absolute only). Figma's "Show totals". */
  showTotals?: boolean
  /** Scale height in px. */
  height?: number
  /** Top of the absolute scale; defaults to the largest total rounded up. */
  max?: number
  formatValue?: (value: number) => string
  /** Figma's Texture = Pattern: each series also gets its texture (print, greyscale, colour-blind use). */
  texture?: boolean
}

const MAX_BAR_WIDTH = 36

function niceMax(peak: number) {
  if (peak <= 0) return 1
  const exp = 10 ** Math.floor(Math.log10(peak))
  const step = exp / 2
  return Math.ceil(peak / step) * step
}

export function StackedBarChart({
  categories,
  series,
  type = 'absolute',
  showTotals = true,
  height = 120,
  max,
  formatValue = (v) => formatChartNumber(v),
  texture = false,
  className,
  ...props
}: StackedBarChartProps) {
  const totals = categories.map((_, i) => series.reduce((sum, s) => sum + (s.data[i] ?? 0), 0))
  const percent = type === 'percent'
  const top = percent ? 100 : max ?? niceMax(Math.max(...totals))
  const ticks = percent ? [100, 50, 0] : [top, (top * 2) / 3, top / 3, 0].map((t) => Math.round(t))
  const fmtTick = (t: number) => (percent ? `${t}%` : formatValue(t))

  return (
    <div
      className={cn('flex w-fit flex-col gap-14px rounded-lg border border-border-subtle bg-surface-container p-16px', className)}
      role="img"
      aria-label={describeChart(percent ? 'Stacked bar chart, percent' : 'Stacked bar chart', series, categories, formatValue)}
      {...props}
    >
      <Legend texture={texture} items={series.map((s) => ({ label: s.label, series: s.series }))} />
      <div className="flex gap-8px">
        <div className="flex w-32px flex-col items-end justify-between text-text-xxs leading-4 text-text-secondary" style={{ height: height + 16, paddingTop: showTotals && !percent ? 16 : 0 }}>
          {ticks.map((t) => (
            <span key={t} className="-my-2">{fmtTick(t)}</span>
          ))}
        </div>
        <div className="flex flex-col gap-6px">
          <div className="relative flex items-end gap-8px" style={{ height: height + (showTotals && !percent ? 16 : 0) }}>
            {categories.map((c, i) => {
              const total = totals[i] || 1
              const barHeight = percent ? height : (totals[i] / top) * height
              return (
                <div key={c} className="flex w-[48px] flex-col items-center justify-end">
                  {showTotals && !percent ? (
                    <span className="mb-2px text-text-xxs font-medium leading-4 text-text-primary">{formatValue(totals[i])}</span>
                  ) : null}
                  <div className="flex w-full flex-col-reverse gap-px" style={{ height: barHeight, maxWidth: MAX_BAR_WIDTH }}>
                    {series.map((s, si) => {
                      const v = s.data[i] ?? 0
                      const isTop = si === series.length - 1
                      return (
                        <div
                          key={s.series}
                          className={cn(CHART_SERIES_BG[s.series], isTop && 'rounded-t-xs')}
                          style={{ flexGrow: v / total, flexBasis: 0, ...(texture ? chartTextureStyle(s.series) : {}) }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex gap-8px text-text-xxs leading-4 text-text-secondary">
            {categories.map((c) => (
              <span key={c} className="w-[48px] text-center">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
