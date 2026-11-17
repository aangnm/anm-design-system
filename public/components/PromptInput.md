# PromptInput

> Where a person writes to an agent: a text area that grows with the message, a send button, and a toolbar for attachments and the Model Selector.

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

## Design notes (from Figma)

Why — prompts range from three words to a pasted brief, so the field starts at one line and grows to eight before it scrolls. Enter sends, Shift+Enter adds a line. Send is the one Primary control and stays disabled while the field is empty; while the agent answers it becomes Stop in the same place, so stopping never needs a hunt. One focus ring for the whole box, like Input Group.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-prompt-input--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2839-1677 (Prompt Input, AI page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/PromptInput/PromptInput.tsx
