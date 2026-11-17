# DropdownMenu

> Menu opened from a trigger (button/field). Elevated surface with actions or options.

## Import

```tsx
import { DropdownMenu } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | no | Trigger label. Ignored when `trigger` is provided. |
| `trigger` | `ReactNode` | no | Custom trigger. Receives nothing — wire your own onClick via the wrapper. |
| `children` | `ReactNode` | yes |  |
| `className` | `string` | no |  |
| `defaultOpen` | `boolean` | no |  |
| `searchable` | `boolean` | no | Maps to Figma's State=Searchable: search field on top, Clear at the bottom. |
| `searchPlaceholder` | `string` | no |  |
| `onClear` | `() => void` | no | Called by Clear (after the query is reset) so the owner can clear its selection. |

## Design notes (from Figma)

Searchable — a third state: the open menu with a Search field on top and a Clear button at the bottom, both inside the menu container, separated from the items by dividers. Use it for long lists; Clear resets the query and the selection.

Why — The trigger is a single outline box, not a Button instance with a chevron beside it. The earlier build had the chevron outside the button's border, which made the control read as two things; rebuilding the trigger as one field fixed it.

Hit area — pointer: the trigger (32 high), each item row (32 high), the search field (36) and Clear (32). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-dropdown-menu--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2226-123 (Dropdown Menu, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DropdownMenu/DropdownMenu.tsx
