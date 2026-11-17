# Reasoning

> The agent's thinking as a quiet disclosure above its answer: open while it thinks, folded to one line ("Thought for 12 seconds") once the answer starts.

## Import

```tsx
import { Reasoning } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `status` | `'thinking' \| 'done'` | no | `thinking` keeps it open and animates the label; `done` folds it. |
| `duration` | `number` | no | Seconds spent, for the folded label. |
| `defaultOpen` | `boolean` | no | Open or closed regardless of status (stories). |
| `children` | `ReactNode` | yes |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — showing the steps builds trust and lets people catch a wrong assumption early, but the answer is what they came for. So the trace is open only while there is nothing else to read, then folds away, one click from reopening. It is set in text/secondary behind a border/subtle rule — visibly a side channel. The label carries the state in words, with a pulse only while thinking.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-reasoning--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2840-1609 (Reasoning, AI page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Reasoning/Reasoning.tsx
