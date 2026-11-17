# Suggestions

> Prompt starters and follow-ups as a row of pills — on an empty chat, or under an answer.

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

## Design notes (from Figma)

Why — a blank prompt box is the hardest screen in an AI product: people do not know what the agent can do. Suggestions show it by example, written in the person's voice as full questions they could have typed, so choosing one sends exactly what it says. Three or four at most. Pills are outlined, not filled, so they never compete with Send; they wrap rather than scroll out of sight.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-suggestions--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2839-1637 (Suggestions, AI page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Suggestions/Suggestions.tsx
