# Modal

> Blocking dialog for focused tasks or confirmations; header, body, and footer actions.

## Import

```tsx
import { Modal } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `type` | `ModalType` | no | Maps to Figma's "Type" variant. |
| `title` | `string` | yes |  |
| `children` | `ReactNode` | yes |  |
| `cancelLabel` | `string` | no |  |
| `confirmLabel` | `string` | no |  |
| `onCancel` | `() => void` | no |  |
| `onConfirm` | `() => void` | no |  |
| `onClose` | `() => void` | no |  |
| `overlay` | `boolean` | no | Render on the Scrim (fixed, full-viewport). Default false: body only. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Destructive recolours the confirm button through an instance override rather than adding a Type to Button. One dialog's needs did not justify widening Button's API for every consumer. The backdrop is the separate Scrim component (surface/scrim at opacity/scrim); see Modal over scrim.

Hit area — pointer: the close icon (20px visual) has a 24 × 24 target (marked Hit area). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-modal--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2225-36 (Modal, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Modal/Modal.tsx
