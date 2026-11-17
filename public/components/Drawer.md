# Drawer

> Side panel for secondary flows without leaving the current page.

## Import

```tsx
import { Drawer } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes |  |
| `items` | `DrawerItem[]` | no |  |
| `children` | `ReactNode` | no |  |
| `cancelLabel` | `string` | no |  |
| `confirmLabel` | `string` | no |  |
| `onCancel` | `() => void` | no |  |
| `onConfirm` | `() => void` | no |  |
| `onClose` | `() => void` | no |  |
| `overlay` | `boolean` | no | Render on the Scrim, docked right (fixed, full-height). Default false: body only. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Cloned from Modal so the header and footer patterns stay identical — a drawer is a modal that enters from the side, and should not look like a different family. The footer is pinned by a filling spacer rather than fixed heights, so the body can grow. Like Modal, it sits on the Scrim component; see Drawer over scrim.

Hit area — pointer: the close icon (20px visual) has a 24 × 24 target (marked Hit area). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-drawer--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2230-28 (Drawer, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Drawer/Drawer.tsx
