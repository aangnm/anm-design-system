# ChatMessage

## Import

```tsx
import { ChatMessage } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `from` | `ChatRole` | yes |  |
| `initials` | `string` | no | The person's initials for their avatar (user messages). |
| `name` | `string` | no | Shown above the message: "Laura Romero", "Assistant". |
| `time` | `string` | no | "2:14 PM" — shown next to the name. |
| `status` | `'done' \| 'streaming' \| 'error'` | no | `streaming` shows the caret and marks the message busy; `error` shows the error line. |
| `errorMessage` | `string` | no | Plain-language error, shown when `status="error"`. |
| `onRetry` | `() => void` | no |  |
| `actions` | `ReactNode` | no | Row of actions under an assistant message (copy, regenerate, feedback). |
| `before` | `ReactNode` | no | Parts above the answer: Reasoning, Tool Call. |
| `after` | `ReactNode` | no | Parts below the answer: Sources, Suggestions. |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLDivElement>, 'role'>` (spread onto the root element).

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-chat-message--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ChatMessage/ChatMessage.tsx
