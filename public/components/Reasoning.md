# Reasoning

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

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-reasoning--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Reasoning/Reasoning.tsx
