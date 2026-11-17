# Timeline

> An ordered event history per account — payments, reconciliations, transfers — a colored marker per event type joined by a connecting line, with a relative timestamp and one line of detail per entry. Event colors reuse the semantic palette already established by Benchmark Table’s tier chips (success/info/warning), not a new marker palette.

## Import

```tsx
import { Timeline } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `entries` | `TimelineEntry[]` | yes |  |

Also accepts every attribute of `HTMLAttributes<HTMLOListElement>` (spread onto the root element).

## Design notes (from Figma)

Why — speculative rather than a confirmed gap: inferred from sample copy already present in Drawer (a reconciliation task) and Benchmark Table, not from a screen that has actually needed one yet. Kept intentionally simple — no filtering, grouping, or pagination modeled here; those are real questions the first real usage should answer, not assumptions worth guessing at now.

Hit area — not interactive. If entries open a detail, each entry is the target. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/pago-recibido--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2406-76 (Timeline, Product Patterns page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Timeline/Timeline.tsx
