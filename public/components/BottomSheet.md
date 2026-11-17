# BottomSheet

> Panel that rises from the bottom of a phone screen for one focused task — entering a count, picking from a short list — over a Scrim. Optional handle, a title with a one-line context, a swappable Content slot (Counter by default) and a two-button footer. 390 wide, top corners radius/xl, elevation/shadow-xl. Properties: Title, Context, Show handle, Content (swap).

## Import

```tsx
import { BottomSheet } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes |  |
| `context` | `string` | no | One-line context under the title. Figma's "Context". |
| `showHandle` | `boolean` | no | Figma's "Show handle". |
| `children` | `ReactNode` | no |  |
| `cancelLabel` | `string` | no |  |
| `confirmLabel` | `string` | no |  |
| `onCancel` | `() => void` | no |  |
| `onConfirm` | `() => void` | no |  |
| `onClose` | `() => void` | no |  |
| `overlay` | `boolean` | no | Render fixed to the viewport bottom on the Scrim. |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLDivElement>, 'title'>` (spread onto the root element).

## Design notes (from Figma)

Why — Modal is a 440px centred dialog and Drawer enters from the side; neither is built for a thumb on a phone. The sheet reuses Modal's header and footer pattern (same title style, same cancel / primary pair) so it reads as one family. Like Modal and Drawer it has no backdrop of its own: compose it over Scrim, as the 'Bottom Sheet over scrim' example shows.

Contrast — title on surface/container 18.6:1 Light / 13.0 Dark, context text/secondary 7.2 / 6.2; the handle is decorative.

Hit area — Close is an Icon Button LG (48), the footer buttons are LG, the Counter buttons are 64.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-bottom-sheet--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2631-483 (Bottom Sheet, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/BottomSheet/BottomSheet.tsx
