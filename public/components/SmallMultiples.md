# SmallMultiples

> Small Multiples — the same small area chart repeated once per category, in a grid, so shapes compare at a glance. Use it instead of a Line Chart with more than four crossing series.

## Import

```tsx
import { SmallMultiples } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `panels` | `SmallMultiplesPanel[]` | yes |  |
| `range` | `[string, string]` | no | First and last x-axis labels, shown under every panel. |
| `columns` | `2 \| 3 \| 4` | no | Most panels per row; fewer when the container is narrow. |
| `series` | `ChartSeriesIndex` | no |  |
| `highlight` | `number` | no | Index of one panel to emphasise; the others turn neutral. |
| `independentScales` | `boolean` | no | Give each panel its own y-scale. Off by default, on purpose. |
| `unit` | `string` | no | Unit for the shared-scale footer (e.g. "USD"). |
| `formatValue` | `(value: number) => string` | no |  |
| `plotHeight` | `number` | no | Plot height of each panel, px. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — every panel shares one y-scale by default: independent scales make a flat series look as volatile as a steep one, which is the mistake small multiples exist to avoid. The shared range is stated once in the footer, not on every panel. One series colour throughout: panels are told apart by label and position, not hue, so the 8-hue palette stays free. In code, highlight draws one panel in the series colour and the rest in border/default for 'this one versus the field'; independentScales is opt-in and rewrites the footer to say heights no longer compare.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-small-multiples--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2774-755 (Small Multiples, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/SmallMultiples/SmallMultiples.tsx
