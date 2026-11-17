# BenchmarkTable

> Productivity benchmark table — per-account rate (Revenue/month) with a tier-colored Status chip (Critical/Moderate/Healthy vs the 400 min / 800 ideal benchmarks). Table + Tag; numeric column right-aligned.

## Import

```tsx
import { BenchmarkTable } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `rows` | `BenchmarkRow[]` | yes |  |
| `labelHeader` | `string` | no | Column headers. Defaults follow the Figma sample. |
| `categoryHeader` | `string` | no |  |
| `rateHeader` | `string` | no |  |
| `min` | `number` | no | Below `min` is Critical, at or above `ideal` is Healthy. |
| `ideal` | `number` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — The Status column uses tier-coloured Tag instances (Critical / Moderate / Healthy) rather than coloured text, so status survives being scanned quickly. The numeric column is right-aligned so magnitudes compare by eye.

Hit area — not interactive today (rows 44, header 40). If rows become selectable, make them at least 48 high on touch. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/product-patterns-benchmark-table--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2342-66 (Benchmark Table, Product Patterns page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/BenchmarkTable/BenchmarkTable.tsx
