# ChartTooltip

> Crosshair/hover readout for line & area charts. Header = x value; one row per series (color dot + label + value). surface/container-high + shadow-md; values wear text/primary, tabular.

## Import

```tsx
import { ChartTooltip } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `heading` | `string` | yes | Header — the x value being read (e.g. a date). |
| `rows` | `ChartTooltipRow[]` | yes |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — One row per series with a colour dot, so the reading never depends on matching a line's colour by eye across the plot.

Hit area — not interactive; it only appears on hover or focus of a data point. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-chart-tooltip--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2305-42 (Chart Tooltip, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ChartTooltip/ChartTooltip.tsx
