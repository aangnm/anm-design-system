# Menu

> Elevated list of actions or options. Compose from Menu Item.

## Import

```tsx
import { Menu } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Needs an explicit panel width. A bare column stretches to fill whatever contains it, which made the panel span the page the first time it was used — the fixed width is the fix, not a style choice.

Hit area — pointer: each item row (32 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-menu--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2125-17 (Menu, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Menu/Menu.tsx
