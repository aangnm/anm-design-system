# MetricCard

> Dashboard KPI card — title + context, a hero value with unit, and a category tag. Product surface built on Card + Tag; use Stat for a compact label/value/delta tile instead.

## Import

```tsx
import { MetricCard } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes |  |
| `context` | `string` | yes |  |
| `value` | `ReactNode` | yes |  |
| `valueContext` | `string` | yes |  |
| `tagLabel` | `string` | yes |  |
| `tagColor` | `TagProps['color']` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Product-specific, and deliberately kept off the Core and Data Display pages. It is assembled entirely from library components so it inherits their tokens — a product surface should compose the system, never fork it.

Hit area — not interactive; the category Tag is a label. If the whole card becomes a link, the card is the target. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/product-patterns-metric-card--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2339-10 (Metric Card, Product Patterns page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/MetricCard/MetricCard.tsx
