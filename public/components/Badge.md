# Badge

> Small count or status indicator (e.g. notification counts), in solid semantic colors.

## Import

```tsx
import { Badge } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `color` | `'neutral' \| 'success' \| 'warning' \| 'error' \| 'info'` | no | Default 'neutral'. |
| `children` | `ReactNode` | yes |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Text on the coloured variants is a literal primitive, not a semantic token: white on Success, Error and Info, near-black (charcoal/950) on Warning. The fills are ramp steps (semantic/*: green 700, red 600, blue 600, orange 600; one step darker in High contrast), chosen so the white label clears 4.9:1 or better in every theme. Warning is the exception to white because orange 600 is too light for it (3.7:1); near-black clears 5.4:1.

Label — a text property (the count). A Badge nested inside another component, as in Choice Tile's Done state, is set from its own instance panel.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-badge--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2104-23 (Badge, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Badge/Badge.tsx
