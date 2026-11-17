# Heatmap

> A grid of rows × columns where each cell's tint shows its value — sessions by weekday and hour, conversion by channel and week. Hover a cell for its exact value in a Chart Tooltip.

## Import

```tsx
import { Heatmap } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `rows` | `string[]` | yes |  |
| `columns` | `string[]` | yes |  |
| `values` | `(number \| null)[][]` | yes | values[row][column]; null for no data. |
| `min` | `number` | no |  |
| `max` | `number` | no |  |
| `cellSize` | `number` | no | Cell size in px. |
| `formatValue` | `(value: number) => string` | no |  |
| `valueLabel` | `string` | no | Name of the measure in the tooltip. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — the eye compares tints well only in a few steps, so values fall into five steps of one hue (chart/series-1 at 20–100% over the surface), never a rainbow. Steps are equal intervals between min and max; the scale under the grid names both ends. Cells sit on a 2px gap so equal neighbours still read as separate cells. An empty cell keeps the bare surface with a border, so "no data" never looks like "low". Cells carry no text; exact values come from the tooltip and the text alternative.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-heatmap--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2826-1460 (Heatmap, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Heatmap/Heatmap.tsx
