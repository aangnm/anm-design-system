# Avatar

> User/entity representation with initials. Size for context; Status shows presence (Online/Offline).

## Import

```tsx
import { Avatar } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'sm'. |
| `initials` | `string` | no | Initials or short label shown when there's no image. |
| `src` | `string` | no |  |
| `alt` | `string` | no |  |
| `status` | `'none' \| 'online' \| 'offline'` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — The status dot carries a 2px surface/page stroke so it reads as cut out of the avatar rather than stuck on top, and scales proportionally with each size.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-avatar--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2105-8 (Avatar, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Avatar/Avatar.tsx
