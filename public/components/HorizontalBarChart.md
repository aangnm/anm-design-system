# HorizontalBarChart

> Horizontal bars, one row per category: label, bar, exact value at the bar's end. For rankings and long category names (accounts, campaigns, pages).

## Import

```tsx
import { HorizontalBarChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `data` | `HorizontalBarDatum[]` | yes |  |
| `sort` | `'desc' \| 'none'` | no | `desc` ranks largest first; `none` keeps the given order. |
| `max` | `number` | no | Value at the full bar length; defaults to the largest value. |
| `highlight` | `string` | no | Label of the row to keep in colour; the rest turn icon/muted. |
| `formatValue` | `(value: number) => string` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — rankings are read top to bottom, so code's sort="desc" puts the largest first; leave it unsorted when the order means something (a funnel, a fixed list of regions). Bars use chart/series-1; Highlight keeps one row in colour and turns the rest icon/muted, the same "where to look" rule as Bar Chart's Highlight latest. Values are printed, so there is no axis to read. Bars are 12px high on a 32px row: the label sets the rhythm, not the bar.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-horizontal-bar-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2826-1370 (Horizontal Bar Chart, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/HorizontalBarChart/HorizontalBarChart.tsx
