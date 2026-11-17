# Progress

> Determinate progress bar for an ongoing task, with an optional value label.

## Import

```tsx
import { Progress } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `number` | yes | 0-100. |
| `label` | `string` | no |  |
| `showLabel` | `boolean` | no | Hide the "label / value%" row and render only the track. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Determinate only. Indeterminate progress is Spinner's job — a progress bar that does not represent a proportion is a misleading affordance.

Track — a 1px border/default outline, so the full length of the bar stays visible on any surface, including grey ones where the soft track fill alone disappears (1.3:1 on white).

Hit area — not interactive (a labelled bar). See Target size on the Accessibility page.

Value — 0, 20, 40, 60, 80 and 100 % (65 % is the original sample). The fill scales with the track (its horizontal constraint is Scale), so the same variant is right at 300px or at a phone's full width; a product picks the nearest variant rather than typing a number; a step flow of five steps lands exactly on 20 / 40 / 60 / 80 / 100. Label is a text property.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-progress--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2632-560 (Progress, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Progress/Progress.tsx
