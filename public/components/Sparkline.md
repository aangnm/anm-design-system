# Sparkline

> Compact inline trend line, e.g. within a Stat or table cell.

## Import

```tsx
import { Sparkline } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `data` | `number[]` | yes |  |
| `width` | `number` | no | SVG width in px. |
| `height` | `number` | no | SVG height in px. |
| `strokeWidth` | `number` | no |  |

Also accepts every attribute of `Omit<SVGAttributes<SVGSVGElement>, 'children'>` (spread onto the root element).

## Design notes (from Figma)

Why — Same reasoning as Bar Chart: the polyline is generated from a data array. A static vector copied out of Figma would be useless as a component.

Hit area — not interactive. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-sparkline--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2132-32 (Sparkline, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Sparkline/Sparkline.tsx
