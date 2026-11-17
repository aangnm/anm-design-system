# ChatMessage

> One turn in a conversation with an agent: the person's message, or the assistant's answer as it streams in. In code, Chat Thread is the log that holds them.

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

## Design notes (from Figma)

Why — the two sides are told apart by layout, not only colour: the person's turn is a bubble on surface/container-high aligned right; the assistant's answer is unboxed full-width text on the left, because it is often long and holds tables, lists and charts that a bubble would cramp. The assistant is marked by the Sparkles mark, never a face. While streaming, a caret ends the text and the message is busy; the thread is a polite live log, so screen readers hear the answer once it settles.

Copy rules for agent output — say what happened in plain words ("I couldn't reach the sales data"), never a code or stack trace; offer the next step (Retry); never apologise twice. Status text is short and present tense: "Thinking…", "Searching 3 sources…".

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-chat-message--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2839-1635 (Chat Message, AI page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ChatMessage/ChatMessage.tsx
