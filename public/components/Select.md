# Select

> Dropdown to pick one option. Mirrors Input styling with a chevron affordance. States: Default/Hover/Focus/Disabled/Error/Focus + Error.

## Import

```tsx
import { Select } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |
| `error` | `boolean` | no | Default false. |

Also accepts every attribute of `Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>` (spread onto the root element).

## Design notes (from Figma)

Why — Modelled as a native select (chevron overlaid on the field), not a custom listbox — so no open-list state exists here. A searchable or multi-value picker is a separate component (Multi-select), never a variant of this one.

Size — SM 32, MD 36 and LG 48 high (260, 280 and 300 wide), the same scale as Input and Button.

States — Default, Hover (border/emphasis), Focus (focus/ring), Disabled, Error, and Focus + Error: the error border with a 2px focus/ring outside it, so an invalid field that is being edited still shows keyboard focus. Hover is pointer only.

Hit area — pointer: the whole field (32, 36 or 48 high by Size). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-select--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2107-11 (Select, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Select/Select.tsx
