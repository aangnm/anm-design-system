# Spinner

> Indeterminate loading indicator. Size: SM 16 / MD 24 / LG 32. A 270° arc bound to interactive/primary; rotate 360° continuously in code. Use for in-progress actions; use Skeleton for content placeholders.

## Import

```tsx
import { Spinner } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `SpinnerSize` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Drawn as a static 270° arc. The rotation lives in code using the motion tokens — this component is the shape, not the animation, and Figma should not imply otherwise.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-spinner--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2279-42 (Spinner, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Spinner/Spinner.tsx
