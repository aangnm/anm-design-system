# ButtonGroup

> Related Buttons and Icon Buttons joined into one control — Previous / Today / Next, a split Export button, zoom out / in.

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

## Design notes (from Figma)

Why — buttons that act on the same thing should read as one object. The group squares the inner corners and overlaps the 1px borders so the seam is one line. Use Secondary buttons: a Primary in a group competes with the page's one Primary. In code every group needs an aria-label so a screen reader announces what the buttons share.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-button-group--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2833-2653 (Button Group, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ButtonGroup/ButtonGroup.tsx
