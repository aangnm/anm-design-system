# Table

> Tabular data with a header row and data rows; status shown via Tags.

## Import

```tsx
import { Table } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `columns` | `TableColumn[]` | yes |  |
| `rows` | `Record<string, ReactNode>[]` | no |  |
| `state` | `TableState` | no |  |
| `emptyMessage` | `string` | no |  |
| `errorMessage` | `string` | no |  |
| `loadingRows` | `number` | no | Skeleton rows rendered while loading. |
| `bordered` | `boolean` | no | Card chrome (border, radius, surface). Turn off when the table sits inside another container that already owns the chrome, e.g. Content Panel. |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLTableElement>, 'children'>` (spread onto the root element).

## Design notes (from Figma)

Why — Loading keeps the real header row and skeletons only the body, so column structure stays readable while data loads. In code the cells accept arbitrary content, which is how status columns reuse Tag instead of inventing a table-only chip. Every non-Default variant is padded to the Default's height (header plus four rows, 212px) on purpose: without that, swapping a populated card for its Empty state collapsed the container and the whole layout jumped.

Hit area — not interactive today: rows are 44 high (header 36). If rows become selectable or headers sortable, make rows at least 48 high on touch and give each sort control at least 24 × 24. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-table--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2221-5436 (Table, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Table/Table.tsx
