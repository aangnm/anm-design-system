# Navbar

> Top application bar: brand/logo, primary nav links, and actions (search, avatar).

## Import

```tsx
import { Navbar } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `brand` | `ReactNode` | no |  |
| `actions` | `ReactNode` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLElement>` (spread onto the root element).

## Design notes (from Figma)

Why — A slot-based shell, not a fixed composition: brand, links and actions are regions to fill. The mobile form should become responsive behaviour on this component rather than a second component callers swap manually.

Hit area — pointer: each link has a 24px-high target and the search icon a 24 × 24 target (marked Hit area); the avatar is 32. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Logo — the horizontal lockup at 108 px wide, the product-UI minimum. Keep clear space X (37.5% of the symbol width, about 8 px) free on every side, so nothing sits against the logo; the mobile bar drops the logo and keeps only the menu button and avatar. See the Logo and Brand page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-navbar--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2126-19 (Navbar, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Navbar/Navbar.tsx
