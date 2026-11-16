import type { CSSProperties } from 'react'
import type { ChartSeriesIndex } from './Legend'

// Chart textures (Figma v0.96, the Chart Texture component on Data Display):
// one pattern per series slot, so a series stays identifiable in print, in
// greyscale and for colour-blind readers — colour alone no longer carries it.
// Fixed slot order like the colours; series 1 stays solid. An 8px tile of
// white lines at 50% over the series colour, identical in Figma (image tiles
// generated from this same geometry) and here. Opt-in through `texture`.

type Line = [number, number, number, number]
const DIAG: Line[] = [[-2, 2, 2, -2], [0, 8, 8, 0], [6, 10, 10, 6]]
const ANTI: Line[] = [[-2, 6, 2, 10], [0, 0, 8, 8], [6, -2, 10, 2]]

export const CHART_TEXTURE_NAMES: Record<ChartSeriesIndex, string> = {
  1: 'Solid', 2: 'Diagonal', 3: 'Dots', 4: 'Horizontal', 5: 'Crosshatch', 6: 'Vertical', 7: 'Diagonal reverse', 8: 'Grid',
}

const GEOMETRY: Record<ChartSeriesIndex, { lines?: Line[]; dot?: boolean }> = {
  1: {},
  2: { lines: DIAG },
  3: { dot: true },
  4: { lines: [[0, 4, 8, 4]] },
  5: { lines: [...DIAG, ...ANTI] },
  6: { lines: [[4, 0, 4, 8]] },
  7: { lines: ANTI },
  8: { lines: [[0, 4, 8, 4], [4, 0, 4, 8]] },
}

const TILE = 8
const INK = 'rgb(255 255 255 / 0.5)'

function tileMarkup(series: ChartSeriesIndex) {
  const g = GEOMETRY[series]
  const lines = (g.lines ?? []).map(([x1, y1, x2, y2]) => `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}'/>`).join('')
  const dot = g.dot ? `<circle cx='4' cy='4' r='1.25' fill='${INK}'/>` : ''
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}'><g stroke='${INK}' stroke-width='1.5'>${lines}</g>${dot}</svg>`
}

/** Background style for a div mark (bar, segment, legend swatch). Empty for series 1. */
export function chartTextureStyle(series: ChartSeriesIndex): CSSProperties {
  if (series === 1) return {}
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(tileMarkup(series))}")`,
    backgroundSize: `${TILE}px ${TILE}px`,
  }
}

/** An SVG <pattern> for SVG marks (Donut arcs): series colour plus its texture. */
/** `rotate` counters a rotated parent SVG (Donut draws from 12 o'clock with -90°). */
export function ChartTexturePattern({ id, series, rotate = 0 }: { id: string; series: ChartSeriesIndex; rotate?: number }) {
  const g = GEOMETRY[series]
  return (
    <pattern id={id} width={TILE} height={TILE} patternUnits="userSpaceOnUse" patternTransform={rotate ? `rotate(${rotate})` : undefined}>
      <rect width={TILE} height={TILE} fill={`var(--chart-series-${series})`} />
      <g stroke={INK} strokeWidth={1.5}>
        {(g.lines ?? []).map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      {g.dot && <circle cx={4} cy={4} r={1.25} fill={INK} />}
    </pattern>
  )
}
