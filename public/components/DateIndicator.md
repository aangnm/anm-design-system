# DateIndicator

> A date with an optional context tag. Date is a text property; the tag is an optional slot controlled by Show tag. The sample copy shows a week label (WK 32) — illustrative content, not part of the component's contract. Retype or swap the tag for any short context label.

## Import

```tsx
import { DateIndicator } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `date` | `ReactNode` | yes | The formatted date, e.g. "Wednesday, May 27, 2026". |
| `tag` | `ReactNode` | no | Optional short context label shown as a Tag, e.g. "SEM 22". Figma's "Show tag". |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Generalized deliberately: the week tag was domain vocabulary hardcoded into a product-agnostic library. Making the date a property and the tag an optional swappable slot keeps the structure generic while the sample copy stays realistic.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-date-indicator--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2163-42 (Date Indicator, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DateIndicator/DateIndicator.tsx
