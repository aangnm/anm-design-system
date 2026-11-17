# LineChart

> Line Chart — trend over time for 1–8 series (chart/series-N in fixed order). 2px lines, end markers with a 2px surface ring, recessive gridlines/axes, legend always present. Sample series are illustrative.

## Import

```tsx
import { LineChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `series` | `LineChartSeries[]` | yes |  |
| `categories` | `string[]` | yes |  |
| `width` | `number` | no | Fixed plot width in px. Leave it out and the chart fills its container. |
| `height` | `number` | no | Plot height in px. |
| `formatValue` | `(value: number) => string` | no | Formats y-axis labels and tooltip values; defaults to one decimal (`0.9`). |
| `tooltip` | `boolean` | no | Hover readout with a crosshair and Chart Tooltip (default on). |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Series colours are used in fixed order (chart/series-1 upward) so the same series keeps its colour across every chart in a product. The Conversion/Retention/Churn sample data is illustrative only. The axis is embedded chrome here, not a standalone component.

Hit area — not interactive (a labelled image). Point targets, if added, need at least 24 × 24. See Target size on the Accessibility page.

Hover — in code, hovering (or tapping on touch) shows a Chart Tooltip with the exact values; a crosshair snaps to the nearest point on lines and areas, and the hovered column is tinted on bars. Turn it off with tooltip={false}. Chart Tooltip on this page is the readout.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-line-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2308-71 (Line Chart, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/LineChart/LineChart.tsx
