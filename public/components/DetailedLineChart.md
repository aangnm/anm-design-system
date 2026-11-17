# DetailedLineChart

> Detailed line chart for analysis: several series plus the context that explains them. Target line (Target 0.80), optimal range band, forecast zone (dashed lines, open end markers, shaded and labelled Forecast), event markers (Campaign, Launch) and, in State=Hover, a crosshair that snaps to the nearest x with the series values in a Chart Tooltip. State=Default/Hover.

## Import

```tsx
import { DetailedLineChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `series` | `DetailedLineSeries[]` | yes |  |
| `categories` | `string[]` | yes | One label per data point (the x axis). |
| `axisLabels` | `string[]` | no | Labels shown under the axis; defaults to every category. |
| `forecastFrom` | `number` | no | Points from this index onward are the forecast (dashed, shaded). |
| `forecastLabel` | `string` | no |  |
| `target` | `{ value: number; label: string }` | no |  |
| `band` | `{ from: number; to: number; label: string }` | no |  |
| `events` | `{ index: number; label: string }[]` | no |  |
| `min` | `number` | no | Fixed y range; defaults to the data range padded to nice numbers. |
| `max` | `number` | no |  |
| `width` | `number` | no |  |
| `height` | `number` | no |  |
| `formatValue` | `(value: number) => string` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Only the series carry colour. Everything else (target, band edges, events, forecast zone) is drawn with neutral tokens, and the one tinted layer, the band, uses semantic/success at opacity/chart-fill so the lines stay on top. The forecast is dashed, shaded and labelled, because dashes alone fail in greyscale and for colour-blind readers; the target is a dashed line with a text label for the same reason. The legend lists every non-series element, so nothing on the plot is unexplained. Use Line Chart for plain trends; this one earns its space only when the target, forecast or events change what the reader should conclude.

Hit area — pointer: the whole plot is one hover target that snaps to the nearest data point; event markers need 24 × 24 targets if they open a detail. On touch, a tap pins the crosshair and tooltip, and the tooltip must not cover the pinned point. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-detailed-line-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2623-6372 (Line Chart · Detailed, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DetailedLineChart/DetailedLineChart.tsx
