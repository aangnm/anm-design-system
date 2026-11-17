# Divider

> 1px rule separating content. Orientation: Horizontal (spans width) or Vertical (spans height). Bound to border/subtle, the one decorative rule colour.

## Import

```tsx
import { Divider } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `orientation` | `DividerOrientation` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Orientation is a variant rather than two components, because the only difference is which axis spans — the token and weight are identical.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-divider--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2278-39 (Divider, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Divider/Divider.tsx
