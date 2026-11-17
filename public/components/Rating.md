# Rating

> A compact 3-tier scale indicator: three fixed segments (semantic/error, semantic/warning, semantic/success in order), the current tier at full opacity and the other two dimmed to 25%, with a label in the matching text token (text/error, text/warning, text/success), which stays readable in both themes. Severity=Critical/Moderate/Healthy. The labels shown are Critical, Moderate and Healthy, the same words as the property values.

## Import

```tsx
import { Rating } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `severity` | `Severity` | yes |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Benchmark Table’s Status column already expresses this exact 3-point scale, but only as a colored Tag chip naming one tier at a time. This generalizes the same tier semantics into a form that also shows where the current value sits relative to the other two, for anywhere a single Tag doesn’t carry enough context (a compact table cell, a card footer, a dashboard tile). Same fixed tier order and colors as Benchmark Table, not a new palette.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-rating--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2409-5442 (Rating / Severity Scale, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Rating/Rating.tsx
