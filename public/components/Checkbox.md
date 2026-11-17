# Checkbox

> Multi-select or indeterminate choice within a group. Two axes: Value (Unchecked, Checked, Indeterminate) × State (Default, Hover, Focus, Disabled), so every combination exists, including Checked + Disabled and Checked + Focus.

## Import

```tsx
import { Checkbox } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `indeterminate` | `boolean` | no |  |
| `label` | `string` | no |  |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>` (spread onto the root element).

## Design notes (from Figma)

Why — Indeterminate is a third visual state of one control, not a separate component. Note for implementation: it has no HTML attribute and must be set on the DOM node directly.

Hit area — pointer: the whole row, box and label, 24 high. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Hover — on Checked and Indeterminate the box keeps interactive/primary and gains the 8% state layer in interactive/primary-foreground (see Button).

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-checkbox--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2102-16 (Checkbox, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Checkbox/Checkbox.tsx
