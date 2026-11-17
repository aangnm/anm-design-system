# Legend

> Series key for any multi-series chart. One swatch (chart/series-N) + label per series, in fixed slot order. Always present for ≥2 series; labels wear text/secondary, never the series color.

## Import

```tsx
import { Legend } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `items` | `LegendItem[]` | yes |  |
| `texture` | `boolean` | no | Show each series' texture in its swatch, to match a textured chart. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Always ship the legend with a multi-series chart. The categorical palette passes its hard contrast gates but carries a documented light-mode warning on a few hues — the legend and direct labels are that warning's mitigation, not decoration.

Hit area — not interactive today: items are 20 high. If a legend toggles series, each item needs a target of at least 24 high, and 48 on touch. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-legend--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2305-31 (Legend, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Legend/Legend.tsx
