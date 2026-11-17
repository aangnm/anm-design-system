# Pagination

> Navigate paged data sets; the active page is filled.

## Import

```tsx
import { Pagination } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `page` | `number` | yes | Current page, 1-indexed. |
| `pageCount` | `number` | yes |  |
| `onPageChange` | `(page: number) => void` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — The active page is filled rather than outlined so it stays legible at small sizes, where a 1px outline on a 2-digit number is easy to miss.

Hit area — pointer: each page item (32 × 32). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-pagination--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2124-10 (Pagination, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Pagination/Pagination.tsx
