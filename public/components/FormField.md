# FormField

> Standard form building block: label + control + helper/error. Compose with Input, Select, etc.

## Import

```tsx
import { FormField } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | yes |  |
| `helperText` | `string` | no | Helper text shown below the field — becomes the error message when `error` is set. |
| `error` | `boolean` | no |  |
| `leadingIcon` | `ReactNode` | no |  |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>` (spread onto the root element).

## Design notes (from Figma)

Why — A composition wrapper, not a control. It owns the label/helper/error slots so that individual controls never have to, which keeps error handling consistent across every field type.

Hit area — pointer: the field inside it; the label should also focus it. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Size — MD is the desktop field: 12px label (Label Large / Medium; it was 11px, the text floor, but a label is something a user must read), Input MD, 12px helper and error. LG is the touch field, 358 wide: 14px label (Title Small / Medium), Input LG (48 high), 13px helper and error (Body Small), 8px between the three. Use LG on phones, where Input must be Size LG anyway. Each Size has State = Default and Error.

Contrast — label text/primary on surface/page 17.8:1 Light / 14.1 Dark; helper text/secondary 6.9 / 6.8; error text/error 9.8 / 15.1. The Error state is the red border plus a written message, never colour alone.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-form-field--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2122-21 (Form Field, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/FormField/FormField.tsx
