# Tooltip

> Brief helper text on hover/focus. Keep to a short phrase; never place essential-only info here.

## Import

```tsx
import { Tooltip } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `children` | `ReactNode` | yes |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Ported as exactly what it is: a static body and arrow. It has no trigger, anchoring or collision logic. Viewport-aware placement is deliberate future work — do not assume this component positions itself.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-tooltip--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2106-4 (Tooltip, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Tooltip/Tooltip.tsx
