# Counter

> Large numeric entry for a small count: − / value / + with 64px buttons and a 36px value (Display XL). For a compact value inside a form row use Stepper; for free text use Input. State = Default, Focus, Disabled, Error. Value is a text property.

## Import

```tsx
import { Counter } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `number` | yes |  |
| `onChange` | `(value: number) => void` | yes |  |
| `min` | `number` | no |  |
| `max` | `number` | no |  |
| `step` | `number` | no |  |
| `disabled` | `boolean` | no |  |
| `error` | `boolean` | no |  |
| `label` | `string` | no | Accessible name for the value field. |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Stepper tops out at 48 high with a small glyph: right for a form row, wrong for entering counts with gloves on, standing up, where the number is the whole task. Counter makes the number the largest thing on the screen and gives each step a 64px target.

Contrast — the value field uses border/default, 3.2:1 Light / 3.9:1 Dark against the page; the − / + buttons are filled with a border/subtle edge and are identified by their glyph. Glyphs are icon/default on interactive/default, 10.0 / 11.5; the value is 18.6 / 13.0. Focus is the shared Focus ring around the field, 2px wide, 2px outside. Error is semantic/error (5.5 / 3.3 against the page) and must be paired with a message from Form Field, never colour alone.

Hit area — each button is 64 × 64, so no Hit area frame is needed.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-counter--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2630-1890 (Counter, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Counter/Counter.tsx
