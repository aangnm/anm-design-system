# HoverCard

## Import

```tsx
import { HoverCard } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `trigger` | `ReactNode` | yes | The element that opens the card: a Link, an Avatar, a button. Must be focusable. |
| `children` | `ReactNode` | yes |  |
| `side` | `'bottom' \| 'top'` | no |  |
| `align` | `'start' \| 'center' \| 'end'` | no |  |
| `defaultOpen` | `boolean` | no | Open on mount (stories and screenshots). |
| `className` | `string` | no |  |

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-hover-card--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/HoverCard/HoverCard.tsx
