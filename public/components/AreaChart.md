# AreaChart

> Area chart — magnitude/volume over time. Fills at ~18% opacity with a 2px line on top (chart/series-N). Best for 1–2 non-overlapping series or a stacked total; for 3+ crossing series use Line Chart.

## Import

```tsx
import { AreaChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `series` | `AreaChartSeries[]` | yes |  |
| `categories` | `string[]` | yes |  |
| `width` | `number` | no | Fixed plot width in px. Leave it out and the chart fills its container. |
| `height` | `number` | no | Plot height in px. |
| `formatValue` | `(value: number) => string` | no | Formats y-axis labels; defaults to one decimal with a comma (`0,9`). |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — The area fill is bound to opacity/chart-fill rather than a hardcoded value, so the whole chart family shifts together if that reading changes. Best for one or two series — stacked areas hide the series behind them.

Hit area — not interactive (a labelled image). Point targets, if added, need at least 24 × 24. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-area-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2310-71 (Area Chart, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/AreaChart/AreaChart.tsx
