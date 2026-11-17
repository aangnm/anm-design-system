# InputGroup

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

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-input-group--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/InputGroup/InputGroup.tsx
