# CountRow

> A row for entering a small count against one item: label on the left, a Stepper LG on the right. 64 high. State = Default, Filled. Filled adds a full-width surface/highlight band and a semibold label: this item already holds a value. Property: Label; set the value on the nested Stepper (its Value property).

## Import

```tsx
import { CountRow } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `ReactNode` | yes |  |
| `value` | `number` | yes |  |
| `onChange` | `(value: number) => void` | yes |  |
| `min` | `number` | no |  |
| `max` | `number` | no |  |
| `step` | `number` | no |  |
| `filled` | `boolean` | no |  |
| `disabled` | `boolean` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — The first Option B pass put a label and a Stepper in a bare 56px row and marked entered values only by bolding the label; among eight rows the filled ones disappeared. The row is 64 high with no outline of its own (the Stepper carries the control border), and a filled row gets a highlight band, the same resource Choice Tile's Done state uses, so 'already has a value' reads the same everywhere. Stack rows edge to edge under an expanded Accordion header, with no hairlines between them.

Contrast — label text/primary on surface/highlight 15.9:1 Light / 13.3 Dark (18.6 / 13.0 on the plain row). The Stepper keeps its own border/default boundary (3.2 / 3.9) on its own surface/container fill, so it does not depend on the band. The highlight is never the only signal: a filled row also has a semibold label and a non-zero value.

Hit area — the Stepper's − and + are 48 × 48 (Stepper LG) inside the 64 row.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-count-row--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2651-1986 (Count Row, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/CountRow/CountRow.tsx
