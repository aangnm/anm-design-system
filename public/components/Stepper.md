# Stepper

> Numeric stepper for small precise values (hours, counts). − / value / + segments in a bordered field; disable − at min and + at max. For free numeric entry use Input; for a range use Slider.

## Import

```tsx
import { Stepper } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |
| `error` | `boolean` | no | Default false. |
| `disabled` | `boolean` | no | Default false. |
| `value` | `number` | yes |  |
| `min` | `number` | no |  |
| `max` | `number` | no |  |
| `step` | `number` | no |  |
| `onChange` | `(value: number) => void` | yes |  |
| `className` | `string` | no |  |

Also accepts every attribute of `Omit<VariantProps<typeof stepperVariants>, 'disabled'>` (spread onto the root element).

## Design notes (from Figma)

Why — For small precise values only (hours, counts). Use Input for anything free-form — a stepper implies a bounded range and a meaningful increment.

Size — SM 32, MD 36 and LG 48 high (120, 140 and 160 wide), the same scale as Input and Button.

States — Default, Hover (border/emphasis), Focus (focus/ring), Disabled, Error, and Focus + Error: the error border with a 2px focus/ring outside it, so an invalid field that is being edited still shows keyboard focus. Hover is pointer only.

Hit area — pointer: each button cell is square, as tall as the control: 32, 36 or 48 (marked Hit area). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Value — a text property, so a Stepper nested in Count Row, or in any composition, is set from its own instance panel.

Value centring — the number is a text box spanning the whole middle segment, centred, so a single digit, 12 and 100 all sit on the segment's centre (it was left-aligned at a fixed spot that was only centred for 12).

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-stepper--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2606-5500 (Stepper, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Stepper/Stepper.tsx
