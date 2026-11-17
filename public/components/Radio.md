# Radio

> Single choice within a mutually exclusive group — always use two or more together. Focus state uses the focus/ring token, matching Input/Button.

## Import

```tsx
import { Radio } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | no |  |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>` (spread onto the root element).

## Design notes (from Figma)

Why — Focus reuses Input's focus/ring treatment exactly, so keyboard focus looks identical across every control in the system.

Two axes: Value (Unselected, Selected) × State (Default, Hover, Focus, Disabled), so Selected + Disabled and Selected + Focus exist. Hover tints the circle with interactive/default and is pointer only.

Hit area — pointer: the whole row, circle and label, 24 high. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-radio--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2102-27 (Radio, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Radio/Radio.tsx
