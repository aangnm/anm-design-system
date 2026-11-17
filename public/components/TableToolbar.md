# TableToolbar

> Search + active filter chips on the left, a secondary icon action and one primary action on the right — the header row that sits above Table or Benchmark Table.

## Import

```tsx
import { TableToolbar } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `searchPlaceholder` | `string` | no |  |
| `searchValue` | `string` | no |  |
| `onSearchChange` | `(value: string) => void` | no |  |
| `filters` | `TableToolbarFilter[]` | no | Active filters, rendered as dismissible chips after the search field. |
| `onRemoveFilter` | `(id: string) => void` | no |  |
| `secondaryAction` | `ReactNode` | no | Secondary action — an icon-only control, e.g. `<IconButton variant="secondary" icon={<Download />} aria-label="Export" />`. |
| `primaryAction` | `ReactNode` | no | The one primary action, e.g. `<Button>Add account</Button>`. |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLDivElement>, 'children'>` (spread onto the root element).

## Design notes (from Figma)

Why — Content Panel solved this exact problem for charts (a Segmented Control in its own header slot); tables had no equivalent, so callers were re-solving "search + filters + action" by hand above every table. Built from Search's own field styling and Tag's chip styling, not new treatments.

Hit area — pointer: the search field, the export and add buttons are 36 high; each filter chip is 24 high and its remove icon (12px visual) has a 24 × 24 target (marked Hit area). On touch, extend each to 48 × 48 without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/product-patterns-table-toolbar--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2404-72 (Table Toolbar, Product Patterns page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/TableToolbar/TableToolbar.tsx
