# InputGroup

> An Input with add-ons: fixed text before or after the value ("https://", "USD", "%"), an icon inside, or a small control at the end (a Kbd hint, a copy Icon Button).

## Import

```tsx
import { InputGroup } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no |  |
| `error` | `boolean` | no |  |
| `prefix` | `ReactNode` | no | Fixed text before the value, outside the editable area ("https://"). |
| `suffix` | `ReactNode` | no | Fixed text after the value ("USD", "%"). |
| `leadingIcon` | `ReactNode` | no | Icon inside the field, before the value. |
| `trailing` | `ReactNode` | no | A small control inside the field, after the value (Kbd, an Icon Button). |
| `className` | `string` | no | Classes for the outer group. |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>` (spread onto the root element).

## Design notes (from Figma)

Why — values with a unit or fixed prefix are typed more accurately when the fixed part is shown but not editable; in a placeholder it vanishes as soon as typing starts. Prefix and suffix sit on surface/container-high behind a border/subtle seam so they read as part of the field but not the value. The whole group is one field: one border, one focus ring, one error state, at the Input heights.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-input-group--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2833-2689 (Input Group, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/InputGroup/InputGroup.tsx
