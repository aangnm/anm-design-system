# DonutChart

> Donut chart: how one total splits into 2–6 parts (sample: revenue per account). A ring of arcs starting at 12 o’clock and running clockwise in chart/series-N order, a 2px gap between arcs, and a legend list on the right with each part’s value and its share. The centre carries the total and its unit and can be turned off with Center label.

## Import

```tsx
import { DonutChart } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `parts` | `DonutPart[]` | yes |  |
| `unit` | `string` | no | Unit under the centre total, e.g. "USD". |
| `centerLabel` | `boolean` | no | Figma's "Center label". |
| `formatValue` | `(value: number) => string` | no |  |
| `texture` | `boolean` | no | Give each part its series texture as well as its colour (print, greyscale, colour-blind use). |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — A donut rather than a pie: the centre holds the total, and the list holds exact values and percentages, so no reading depends on judging an angle. Parts keep their series slot instead of being sorted by size, so a category keeps its colour across every chart; shares are rounded to one decimal and sum to 100. Past six parts, group the tail as "Other". There is deliberately no pie variant: it encodes the same data with less room for labels.

Texture — Texture=Pattern adds each series’ Chart Texture over its colour (series 1 stays solid), legend swatches included, for print, greyscale and colour-blind readers. Opt-in: on screen, with a legend, flat fills read more calmly. Code: texture.

Hit area — not interactive (a labelled image). Interactive arcs would need 24 × 24 targets, and the legend rows would become the list of controls. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-donut-chart--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2778-877 (Donut Chart, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DonutChart/DonutChart.tsx
