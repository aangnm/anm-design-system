# GaugeChart

> One value against its range on a half-circle arc, with the value and its label in the middle and an optional target tick. For a single measure with a known ceiling — quota attainment, budget used, uptime — never to compare categories.

## Import

```tsx
import { GaugeChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `number` | yes |  |
| `min` | `number` | no |  |
| `max` | `number` | no |  |
| `label` | `string` | yes | What the value measures, under the number. |
| `target` | `number` | no | Optional target, drawn as a tick across the arc. |
| `status` | `'success' \| 'warning' \| 'error'` | no | Colours the fill by status instead of chart/series-1. |
| `size` | `number` | no | Diameter in px. |
| `formatValue` | `(value: number) => string` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — a gauge earns its space only when the range matters as much as the number. The arc is 12px on a border/subtle track; the fill is chart/series-1, or a status colour (semantic/success, warning, error) when the value has crossed a threshold the product defines — the gauge never decides that by itself. The target is a neutral tick so it reads without colour. The value is the largest text (Title Large) because it is the answer.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-gauge-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2826-1434 (Gauge Chart, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/GaugeChart/GaugeChart.tsx
