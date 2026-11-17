# Suggestions

## Import

```tsx
import { Suggestions } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `items` | `SuggestionItem[]` | yes |  |
| `onSelect` | `(prompt: string) => void` | yes |  |
| `aria-label` | `string` | no | Names the group, e.g. "Suggested questions". |
| `className` | `string` | no |  |

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-suggestions--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Suggestions/Suggestions.tsx
