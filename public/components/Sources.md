# Sources

> Where an answer came from: a folded list under the answer ("4 sources"), with Citation as the numbered marker inside the text.

## Import

```tsx
import { Sources } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `sources` | `Source[]` | yes |  |
| `defaultOpen` | `boolean` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — an agent's claim is only as good as what it read, so every factual sentence can point to its source and every source is one click away. Folded by default: most readers trust the answer, some want to verify it, and the count alone says evidence exists. Your own documents and web pages get different icons, since "from your data" and "from the web" carry different weight.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-sources--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2840-1734 (Sources, AI page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Sources/Sources.tsx
