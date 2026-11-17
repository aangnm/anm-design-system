# ActionBar

> Pinned bottom bar for a phone screen: an optional summary line, one Primary Button LG and an optional Secondary. Properties: Summary (text), Show summary, Show secondary. Bottom padding of 32 clears the home indicator.

## Import

```tsx
import { ActionBar } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `summary` | `ReactNode` | no | Figma's "Summary" + "Show summary". |
| `primaryLabel` | `string` | yes |  |
| `onPrimary` | `() => void` | no |  |
| `primaryDisabled` | `boolean` | no |  |
| `secondaryLabel` | `string` | no | Figma's "Show secondary". |
| `onSecondary` | `() => void` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — A screen that ends in one decision (Continue, Complete sign-up) keeps that action in the thumb zone and visible while the content scrolls. One Primary per view still holds: the second action is a Secondary Button, never a second Primary. The summary line carries the running tally (2 filters · 26 results) so the user knows what they are about to confirm without scrolling.

Contrast — summary text/secondary on surface/container 7.2:1 Light / 6.2 Dark; the top hairline is a container edge (border/subtle).

Hit area — both buttons are LG (48) and full width.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-action-bar--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2630-2891 (Action Bar, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ActionBar/ActionBar.tsx
