# Sidebar

> Primary side navigation: the workspace name at top, as text (no logo), nav items, and a user-menu profile at the bottom.

## Import

```tsx
import { Sidebar } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `collapsed` | `boolean` | no |  |
| `brand` | `ReactNode` | no |  |
| `footer` | `ReactNode` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Collapsed is a 72px icon-only rail where labels are hidden rather than deleted, so expanding restores the content and any instance overrides survive the round trip. Icon · Overview, Transactions, Reports, Clients and Settings: one swap property per nav item. Pick any icon/<name> from the instance.

Hit area — pointer: each nav item row (36 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-sidebar--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2227-286 (Sidebar, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Sidebar/Sidebar.tsx
