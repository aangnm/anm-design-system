# Topbar

> Alternate top bar: breadcrumbs (left), Date Indicator (center), and actions incl. search + alerts (right).

## Import

```tsx
import { Topbar } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `breadcrumb` | `ReactNode` | no | Left slot, usually a Breadcrumb. |
| `center` | `ReactNode` | no | Centre slot, usually a DateIndicator. |
| `actions` | `ReactNode` | no | Right slot, usually TopbarAction buttons. |

Also accepts every attribute of `HTMLAttributes<HTMLElement>` (spread onto the root element).

## Design notes (from Figma)

Why — A composition of parts that already exist — Breadcrumb, Date Indicator, search and alerts. Kept as a component so the arrangement is documented, not because it introduces anything new.

Hit area — pointer: search and alerts each carry a 24 × 24 target (marked Hit area). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-topbar--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2164-44 (Topbar / Alt, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Topbar/Topbar.tsx
