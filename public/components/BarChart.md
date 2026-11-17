# BarChart

> Data-viz primitive for comparing values across categories. Bars flex to the available width on a fixed 12px gap; a y-axis with gridlines gives the scale, and Show values prints each value above its bar.

## Import

```tsx
import { BarChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `data` | `BarChartDatum[]` | yes |  |
| `height` | `number` | no | Scale height in px (value `max` maps to this). |
| `max` | `number` | no | Value mapped to full scale height; defaults to the largest datum rounded up to a "nice" step. |
| `ticks` | `number` | no | Number of y-axis ticks / gridlines, including 0 and `max`. |
| `showValues` | `boolean` | no | Prints each value above its bar — Figma's "Show values". |
| `highlightLatest` | `boolean` | no | Newest bar keeps chart/series-1, the rest turn icon/muted — Figma's "Highlight latest". |
| `formatValue` | `(value: number) => string` | no | Formats tick and value labels; defaults to en-US numbers (`1,284`). |
| `tooltip` | `boolean` | no | Hover readout: column tint plus a Chart Tooltip (default on). |
| `seriesLabel` | `string` | no | Name of the measure in the tooltip row. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Bar heights come from data, so in code this is generated rather than a static asset. The Figma component documents the chrome and spacing; the geometry is not a token and should not be traced from this file. The axis and value labels exist because a bar chart with no scale cannot be read: the axis shows the range, the labels give exact numbers without judging heights. Bars are capped at 36px wide and stay centred in equal slots, so a wider card adds space between bars instead of making them thicker. They use chart/series-1, not interactive/primary: data marks should carry less visual weight than the figures they show. Highlight latest (on by default) draws every week in muted grey except the newest, which keeps the data blue, so the eye lands on “now”; turn it off when every period matters equally. The context bars use icon/muted rather than a faded blue because graphics must keep 3:1 against the card, which a faded blue cannot.

Sample scale: 0–300 (USD thousands), bar height = value ÷ 300 × 150px.

Hit area — not interactive (a labelled image). Interactive bars would need 24 × 24 targets. See Target size on the Accessibility page.

Hover — in code, hovering (or tapping on touch) shows a Chart Tooltip with the exact values; a crosshair snaps to the nearest point on lines and areas, and the hovered column is tinted on bars. Turn it off with tooltip={false}. Chart Tooltip on this page is the readout.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-bar-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2132-11 (Bar Chart, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/BarChart/BarChart.tsx
