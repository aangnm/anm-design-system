# Skeleton

> Loading placeholder. Shape: Line (text row), Block (card/media), Circle (avatar). Filled with border/subtle; animate opacity 0.5↔1 in code for shimmer.

## Import

```tsx
import { Skeleton } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `shape` | `SkeletonShape` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Three shapes cover every loading case in the library (text row, media block, avatar), rather than a bespoke skeleton per component. Filled with border/subtle so it reads as absent content, not as a disabled control.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-skeleton--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2278-44 (Skeleton, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Skeleton/Skeleton.tsx
