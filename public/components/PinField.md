# PinField

> Four-box entry for a short numeric code, such as a 4-digit PIN: a label, four masked digit boxes and a helper or error line. 358 wide, boxes 56 high. State = Default, Focus (the next empty box takes the focus/ring), Error (all four boxes semantic/error) and Disabled; Filled = 0–4 shows how many digits are entered, each as a masked dot. Property: Label.

## Import

```tsx
import { PinField } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | yes |  |
| `value` | `string` | yes |  |
| `onChange` | `(value: string) => void` | yes |  |
| `length` | `number` | no | Number of digits. Figma documents 4. |
| `helperText` | `string` | no |  |
| `error` | `string` | no | Error message; turns every box semantic/error. |
| `disabled` | `boolean` | no |  |
| `onComplete` | `(value: string) => void` | no | Called once all digits are entered. |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — A PIN is the one field where Input is the wrong shape: one wide box hides how many digits are in and makes a gloved thumb aim at a text line, while four boxes show progress at a glance and have a target each. The dots are shapes centred in the box, not a text glyph, so they sit in the exact middle at any count. In code it is one numeric input (inputmode numeric, autocomplete one-time-code, paste fills all four); the four boxes are presentation.

Contrast — box border border/default 3.2:1 Light / 3.9 Dark against the page (it is a control boundary, unlike Choice Tile); dot and label text/primary 17.8 / 14.1; helper text/secondary 6.9 / 6.8; error text/error 9.8 / 15.1 and border semantic/error 5.5 / 3.3; focus ring 5.0 / 7.3. Error is the red boxes plus a written message, never colour alone.

Hit area — each box is 56 high and about a quarter of the width: above hit/touch.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-pin-field--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2662-7179 (PIN Field, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/PinField/PinField.tsx
