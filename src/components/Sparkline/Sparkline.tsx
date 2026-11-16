import type { SVGAttributes } from 'react'
import { cn } from '@/lib/utils'
import { formatChartNumber } from '@/components/Legend'

// Mirrors the Sparkline primitive (Data Display page): a compact inline trend
// line, e.g. inside a Stat or table cell. Figma exports it as a static vector;
// here it's data-driven — the polyline is computed from `data` so the same
// component renders any series. Stroke is 2px and follows currentColor, which defaults to
// interactive/primary (Figma binds the path to it); recolour via className.
// Not interactive.

export interface SparklineProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  data: number[]
  /** SVG width in px. */
  width?: number
  /** SVG height in px. */
  height?: number
  strokeWidth?: number
}

export function Sparkline({ data, width = 160, height = 48, strokeWidth = 2, className, ...props }: SparklineProps) {
  const n = data.length
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = strokeWidth
  const points = data
    .map((v, i) => {
      const x = n > 1 ? (i / (n - 1)) * width : width / 2
      const y = height - pad - ((v - min) / range) * (height - pad * 2)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      role="img"
      aria-label={`Tendencia: ${data.map((v) => formatChartNumber(v)).join(', ')}`}
      className={cn('text-interactive-primary', className)}
      {...props}
    >
      <polyline points={points} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
