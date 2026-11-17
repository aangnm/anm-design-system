# ButtonGroup

## Import

```tsx
import { ButtonGroup } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `aria-label` | `string` | yes | What the buttons have in common, read before them. |
| `orientation` | `'horizontal' \| 'vertical'` | no |  |
| `size` | `'sm' \| 'md'` | no | Corner radius of the outer ends: match the Button size (SM uses sm, MD and LG use md). |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-button-group--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ButtonGroup/ButtonGroup.tsx
