# Combobox

> Searchable single-value picker: type to filter, pick one. State=Default/Hover/Focus/Disabled/Error/Focus + Error mirrors Select's field exactly; State=Open shows the field with its filtered results panel, matching how Dropdown Menu documents its own open state.

## Import

```tsx
import { Combobox } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |
| `options` | `ComboboxOption[]` | yes |  |
| `value` | `string \| null` | no |  |
| `defaultValue` | `string \| null` | no |  |
| `onValueChange` | `(value: string \| null) => void` | no |  |
| `error` | `boolean` | no | Error is a prop (arbitrary validity has no CSS hook); also sets aria-invalid. |
| `defaultOpen` | `boolean` | no | Start open — documents Figma's State=Open; not needed in product. |
| `emptyText` | `string` | no |  |
| `wrapperClassName` | `string` | no |  |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'>` (spread onto the root element).

## Design notes (from Figma)

Why — Select's own description already draws this line: "a searchable... picker is a separate component (Multi-select), never a variant of this one" — but that only named the multi-value case. Multi-select covers several values; nothing covered a searchable single value, which is the more common of the two. Reuses Select's field styling and Menu's panel styling rather than inventing either.

Size — SM 32, MD 36 and LG 48 high (260, 280 and 300 wide), the same scale as Input and Button. Open keeps the field at its Size and widens the list to match.

States — Default, Hover (border/emphasis), Focus (focus/ring), Disabled, Error, and Focus + Error: the error border with a 2px focus/ring outside it, so an invalid field that is being edited still shows keyboard focus. Hover is pointer only.

Hit area — pointer: the whole field (32, 36 or 48 high by Size). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-combobox--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2400-116 (Combobox, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Combobox/Combobox.tsx
