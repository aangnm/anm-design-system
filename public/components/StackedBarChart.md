# StackedBarChart

> Stacked bar chart: how a total splits into parts across categories (sample: revenue per account, by week). Type=Absolute shows the bars on a 0–300 scale with the total above each bar (Show totals boolean); Type=Percent normalises every bar to 100 %. Series use chart/series-N in fixed order with series 1 at the bottom; segments are separated by a 1px gap in the card surface, the top segment has 2px rounded top corners, and bars are capped at 36px wide, centred in equal slots, like Bar Chart. The legend is always present.

## Import

```tsx
import { StackedBarChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `categories` | `string[]` | yes |  |
| `series` | `StackedBarSeries[]` | yes |  |
| `type` | `'absolute' \| 'percent'` | no | Figma's Type. |
| `showTotals` | `boolean` | no | Total above each bar (Absolute only). Figma's "Show totals". |
| `height` | `number` | no | Scale height in px. |
| `max` | `number` | no | Top of the absolute scale; defaults to the largest total rounded up. |
| `formatValue` | `(value: number) => string` | no |  |
| `texture` | `boolean` | no | Figma's Texture = Pattern: each series also gets its texture (print, greyscale, colour-blind use). |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — The stack order never changes, so a series keeps its place from bar to bar; only the bottom segment shares a baseline, so it is the only one that can be compared by eye, and the totals and the legend carry the rest. There are no labels inside segments: exact values belong in a tooltip or a table. Stop at about four series; beyond that the inner segments become unreadable and Line Chart or Small Multiples is the better form. Percent exists because a share is a different question from a size.

Texture — Texture=Pattern adds each series’ Chart Texture over its colour (series 1 stays solid), legend swatches included, for print, greyscale and colour-blind readers. Opt-in: on screen, with a legend, flat fills read more calmly. Code: texture.

Hit area — not interactive (a labelled image). Interactive segments would need 24 × 24 targets. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-stacked-bar-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2622-6313 (Stacked Bar Chart, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/StackedBarChart/StackedBarChart.tsx
