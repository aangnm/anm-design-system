# MenuItem

> A single row within a Menu — icon + label, with Default/Hover/Disabled states.

## Import

```tsx
import { MenuItem } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `icon` | `ReactNode` | no | Icon swap. Falls back to a placeholder circle when `leadingIcon` is on, like Figma. |
| `leadingIcon` | `boolean` | no | Maps to Figma's "Leading icon" boolean. Default true. |

Also accepts every attribute of `ButtonHTMLAttributes<HTMLButtonElement>` (spread onto the root element).

## Design notes (from Figma)

Why — The row primitive. It exists separately from Menu so that Dropdown Menu, Sidebar and any future list can share one row treatment instead of redefining hover and disabled each time. Icon: a swap property. Pick any icon/<name> from the instance.

Hit area — pointer: the whole row (32 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Leading icon — a boolean, on by default. Turn it off for text-only lists such as the Searchable Dropdown Menu.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-menu--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2125-16 (Menu Item, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Menu/Menu.tsx
