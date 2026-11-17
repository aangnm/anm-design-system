# HoverCard

> A preview card that opens when a pointer rests on a trigger, or the trigger takes keyboard focus — an account, a person, a linked record, a metric's definition.

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

## Design notes (from Figma)

Why — dashboards are dense with references. A Hover Card answers "what is this?" without leaving the page; a Tooltip is for a short label, a Popover for something you act on. Touch screens have no hover, so a Hover Card may only preview what the trigger already leads to — never hold the only copy of information or an action. It opens after 400ms so passing over a table does not flash cards, and closes 150ms after leaving or on Escape.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-hover-card--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2835-2810 (Hover Card, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/HoverCard/HoverCard.tsx
