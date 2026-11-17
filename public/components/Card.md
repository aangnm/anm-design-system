# Card

> Generic surface for grouping related content.

## Import

```tsx
import { Card } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `state` | `CardState` | no | Maps to Figma's "State" variant. `default` renders children. |
| `emptyMessage` | `string` | no | Message shown in the empty state. |
| `errorMessage` | `string` | no | Message shown in the error state. |
| `children` | `ReactNode` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Empty, Loading and Error are states of the same surface rather than separate components, so a caller swaps one property instead of conditionally rendering three things. Every non-Default variant is padded to the Default's height on purpose: without that, swapping a populated card for its Empty state collapsed the container and the whole layout jumped.

Hit area — not interactive. If a whole card becomes a link or button, the card itself is the target. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-card--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2220-29 (Card, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Card/Card.tsx
