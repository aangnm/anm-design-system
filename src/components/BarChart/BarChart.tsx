import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Bar Chart primitive (Data Display page): categorical bars with
// labels underneath. Data-driven — heights scale to the largest value (or an
// explicit `max`). Bars use the primary ink token (matching Figma's --primary
// fill); dimensions are inline styles because bar height is a computed value,
// not a design token (the pattern noted for chart geometry in the token docs).

export interface BarChartDatum {
  label: string
  value: number
}

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: BarChartDatum[]
  /** Plot height in px. */
  height?: number
  /** Bar width in px. */
  barWidth?: number
  /** Gap between bars in px. */
  gap?: number
  /** Value mapped to full height; defaults to the largest datum. */
  max?: number
}

export function BarChart({ data, height = 150, barWidth = 30, gap = 14, max, className, ...props }: BarChartProps) {
  const peak = max ?? Math.max(...data.map((d) => d.value), 0)
  return (
    <div className={cn('inline-flex flex-col items-center gap-8px', className)} role="img" {...props}>
      <div className="flex items-end justify-center" style={{ height, gap }}>
        {data.map((d, i) => (
          <div
            key={i}
            className="rounded-t-sm bg-interactive-primary"
            style={{ width: barWidth, height: peak > 0 ? (d.value / peak) * height : 0 }}
          />
        ))}
      </div>
      <div className="flex justify-center" style={{ gap }}>
        {data.map((d, i) => (
          <span key={i} className="text-center text-text-min leading-[14px] text-text-secondary" style={{ width: barWidth }}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
