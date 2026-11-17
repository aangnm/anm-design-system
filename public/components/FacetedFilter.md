# FacetedFilter

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

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-faceted-filter--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/FacetedFilter/FacetedFilter.tsx
