# Stat

> Single KPI: label, value, and a delta/trend indicator.

## Import

```tsx
import { Stat } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `ReactNode` | no |  |
| `value` | `ReactNode` | no |  |
| `delta` | `ReactNode` | no | Delta shown under the value, e.g. "12,5 %". |
| `trend` | `StatTrend` | no | Colour + arrow for the delta: up = ▲ success, down = ▼ error, neutral = muted (no arrow). |
| `deltaCaption` | `ReactNode` | no | Caption after the delta, e.g. "vs. last month". |
| `state` | `StatState` | no |  |
| `emptyMessage` | `string` | no |  |
| `errorMessage` | `string` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Carries its own Empty and Error copy because a KPI with no data must say so — a blank number reads as zero, which is a different and wrong claim. Every non-Default variant is padded to the Default's height on purpose: without that, swapping a populated card for its Empty state collapsed the container and the whole layout jumped.

Hit area — not interactive. If a stat becomes a link, the whole block is the target. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-stat--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2221-40 (Stat, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Stat/Stat.tsx
