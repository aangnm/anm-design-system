# Tag

> Compact category or status label. Set Color by semantic meaning; enable Dismissible for removable filter chips.

## Import

```tsx
import { Tag } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `color` | `'neutral' \| 'success' \| 'warning' \| 'error' \| 'info'` | no | Default 'neutral'. |
| `children` | `ReactNode` | yes |  |
| `className` | `string` | no |  |
| `dismissible` | `boolean` | no | Shows a close icon — maps to Figma's "Dismissible" boolean prop. |
| `onDismiss` | `ButtonHTMLAttributes<HTMLButtonElement>['onClick']` | no |  |

## Design notes (from Figma)

Why — Dismissible is a set-level boolean driving the close icon's visibility, tinted to each colour's own text token — so a removable chip keeps its semantic colour instead of needing a parallel set of variants.

Hit area — pointer: when Dismissible, the close icon (12px visual) has a 24 × 24 target (marked Hit area). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-tag--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2104-12 (Tag, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Tag/Tag.tsx
