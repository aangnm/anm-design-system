# List

> Vertical rows with icon, title/subtitle, and trailing content; dividers between rows.

## Import

```tsx
import { List } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `items` | `ListItem[]` | no |  |
| `state` | `ListState` | no |  |
| `emptyMessage` | `string` | no |  |
| `errorMessage` | `string` | no |  |
| `loadingRows` | `number` | no | Skeleton rows rendered while loading. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Loading uses skeleton rows rather than a spinner, so the shape of the incoming content is visible before it arrives. Every non-Default variant is padded to the Default's height on purpose: without that, swapping a populated card for its Empty state collapsed the container and the whole layout jumped.

Hit area — pointer and touch: when a row is interactive (onSelect), the whole row is the target, 66 high, already above the 48px touch size. Keep rows at 48 or more if they are ever shortened. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/account-4021--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2221-5289 (List, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/List/List.tsx
