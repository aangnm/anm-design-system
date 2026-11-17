# FacetedFilter

> A dashed trigger that opens a checklist of one column's values, each with its count. Once values are picked, the trigger shows them as chips (or "3 selected" past two).

## Import

```tsx
import { FacetedFilter } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes | Column name, e.g. "Status". |
| `options` | `FacetedFilterOption[]` | yes |  |
| `selected` | `string[]` | yes |  |
| `onChange` | `(selected: string[]) => void` | yes |  |
| `searchable` | `boolean` | no | Show a search field above the list (on by default past 7 options). |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Table Toolbar showed active filter chips but had no way to choose them; analytics tables are filtered far more often than they are searched. Counts come with each option so the reader knows what a filter will leave before choosing it. The dashed edge marks it as an optional refinement, not a required field.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-faceted-filter--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2821-1034 (Faceted Filter, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/FacetedFilter/FacetedFilter.tsx
