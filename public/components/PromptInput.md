# PromptInput

## Import

```tsx
import { PromptInput } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | yes |  |
| `onChange` | `(value: string) => void` | yes |  |
| `onSubmit` | `(value: string) => void` | yes |  |
| `status` | `'idle' \| 'streaming'` | no | `streaming` turns Send into Stop. |
| `onStop` | `() => void` | no |  |
| `toolbar` | `ReactNode` | no | Controls at the bottom left: attach, Model Selector. |
| `hint` | `ReactNode` | no | One quiet line under the box. |
| `maxRows` | `number` | no | Rows before the field scrolls (default 8). |
| `className` | `string` | no |  |

Also accepts every attribute of `Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit' | 'onChange' | 'value'>` (spread onto the root element).

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-prompt-input--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/PromptInput/PromptInput.tsx
