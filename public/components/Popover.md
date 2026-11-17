# Popover

> Contextual floating panel anchored to a trigger.

## Import

```tsx
import { Popover } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes |  |
| `children` | `ReactNode` | yes |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Static, like Tooltip: body only, no arrow, no anchoring or collision logic. Real placement is code's responsibility and deliberate future work.

Hit area — not interactive itself. Any action placed inside it follows the Button and Link rules: at least 24 × 24 on pointer, 48 × 48 on touch. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-popover--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2134-18 (Popover, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Popover/Popover.tsx
