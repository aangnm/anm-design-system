# Input

> Single-line text field. Wrap in a Form Field for label + helper/error. Supports a leading icon. States: Default/Hover/Focus/Disabled/Error/Focus + Error.

## Import

```tsx
import { Input } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |
| `error` | `boolean` | no | Default false. |
| `leadingIcon` | `ReactNode` | no | Icon rendered before the value — maps to Figma's "Leading icon" slot. |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>` (spread onto the root element).

## Design notes (from Figma)

Why — This is the baseline for every field in the system — Textarea, Select and Search deliberately mirror its padding, radius and state tokens so a form reads as one control family rather than four. Icon: a swap property for the leading icon. Pick any icon/<name> from the instance, then switch Leading icon on.

States — Default, Hover (border/emphasis), Focus (focus/ring), Disabled, Error, and Focus + Error: the error border with a 2px focus/ring outside it, so an invalid field that is being edited still shows keyboard focus. Hover is pointer only.

Hit area — pointer: the whole field (32, 36 or 48 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-input--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2101-26 (Input, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Input/Input.tsx
