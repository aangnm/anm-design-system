# ModelSelector

> A compact control in the Prompt Input toolbar that picks which model answers, named by what it is good at, with one line on the trade-off.

## Import

```tsx
import { ModelSelector } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `models` | `ModelOption[]` | yes |  |
| `value` | `string` | yes |  |
| `onChange` | `(value: string) => void` | yes |  |
| `defaultOpen` | `boolean` | no | Open on mount (stories). |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — people choose between speed, depth and cost, not version numbers. Each option says what it is for and can carry short capability tags. The trigger is a quiet ghost control showing only the current name, because it is set once and rarely changed; it must never compete with Send. The list is a radio group and opens upward from the toolbar.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-model-selector--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2840-1773 (Model Selector, AI page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ModelSelector/ModelSelector.tsx
