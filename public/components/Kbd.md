# Kbd

## Import

```tsx
import { Kbd } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `keys` | `string[]` | no | Several keys pressed together (a chord), e.g. ['⌘', 'K']. Use children for a single key. |

Also accepts every attribute of `HTMLAttributes<HTMLElement>` (spread onto the root element).

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-kbd--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Kbd/Kbd.tsx
