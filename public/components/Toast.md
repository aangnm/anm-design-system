# Toast

> Transient, auto-dismissing notification (corner/bottom).

## Import

```tsx
import { Toast } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `color` | `ToastColor` | no | Maps to Figma's "Color" variant. |
| `title` | `string` | yes |  |
| `description` | `string` | yes |  |
| `onDismiss` | `() => void` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Keeps a neutral surface with a coloured icon, deliberately unlike Banner's tinted background. A toast overlays arbitrary content, so a neutral surface stays legible wherever it lands and the icon carries the meaning.

Hit area — pointer: the close icon (16px visual) has a 24 × 24 target (marked Hit area). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-toast--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2196-41 (Toast, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Toast/Toast.tsx
