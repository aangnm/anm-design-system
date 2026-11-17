# DataTable

> A full analytics table: toolbar (search, faceted filters, Columns menu, actions), sortable and selectable rows, and a footer with the row count and Pagination. Built from Search, Faceted Filter, Button, Icon Button, Checkbox, Tag and Pagination instances.

## Import

```tsx
import { DataTable } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `columns` | `DataTableColumn<T>[]` | yes |  |
| `data` | `T[]` | yes |  |
| `getRowId` | `(row: T, index: number) => string` | no | Stable id per row; defaults to the row index. |
| `label` | `string` | yes | Accessible name of the table, e.g. "Recent transactions". |
| `searchable` | `boolean` | no | Search across all text columns (default true). |
| `searchPlaceholder` | `string` | no |  |
| `selectable` | `boolean` | no | Checkbox column for selecting rows. |
| `onSelectionChange` | `(ids: string[]) => void` | no |  |
| `pageSize` | `number` | no | Rows per page (default 10). |
| `actions` | `ReactNode` | no | Right side of the toolbar, e.g. an export Icon Button and one primary Button. |
| `state` | `'default' \| 'loading' \| 'error'` | no |  |
| `emptyMessage` | `string` | no |  |
| `errorMessage` | `string` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Table is the presentational shell; most dashboards also need to narrow, order and act on rows, and every team was rebuilding that toolbar slightly differently. Data Table fixes the order (search, filters, then view controls, then actions on the right) and keeps the count in the footer so a filtered view always says what it hides ("1–7 of 7 (filtered from 26)"). Loading, Empty and Error come from Table's state pattern, keeping the header visible.

Hit area — rows stay 44 high on desktop; sort controls are full header-cell buttons, never only the arrow. Selected rows use surface/highlight, the same tint as the range in Date Range Picker.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-data-table--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2823-1004 (Data Table, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DataTable/DataTable.tsx
