# AppBar

> Top bar for a phone-width screen: menu button, Date Indicator (date and week tag) and Avatar, 56 high, on surface/container over a border/subtle hairline. Show date is a boolean property.

## Import

```tsx
import { AppBar } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `onMenu` | `() => void` | no |  |
| `menuLabel` | `string` | no |  |
| `center` | `ReactNode` | no | Centre slot, usually a DateIndicator. Figma's "Show date". |
| `trailing` | `ReactNode` | no | Right slot, usually an Avatar (wrap it in a button if it opens a menu). |

Also accepts every attribute of `HTMLAttributes<HTMLElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Navbar / Mobile above is a static frame that keeps only the menu and the avatar, which suits a content app. A field or operations app needs the day and the week on every screen — a record belongs to a day — so the bar carries the Date Indicator in the middle, as Topbar / Alt does on the web. It is its own component rather than a Navbar variant because Navbar is a slot shell that responsive code is meant to collapse.

Contrast — the hairline is a container edge (border/subtle, not held to 3:1); text/primary on surface/container 18.6:1 Light / 13.0 Dark.

Hit area — Menu is an Icon Button LG (48). The Avatar is 32 and carries an invisible 48 × 48 Hit area frame on touch (hit/touch), the visual unchanged.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-app-bar--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2630-2877 (App Bar / Mobile, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/AppBar/AppBar.tsx
