# DataTable

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

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-data-table--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DataTable/DataTable.tsx
