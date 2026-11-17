# ToolCall

> One action the agent takes — querying data, sending an email, creating a record — with its status, and the input and output one click away. State=Approval asks the person to approve or deny first.

## Import

```tsx
import { ToolCall } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes | What the agent is doing, in words: "Query sales for May 2026". |
| `tool` | `string` | no | The tool's technical name, shown small: "sales.query". |
| `status` | `'running' \| 'done' \| 'error' \| 'approval'` | yes |  |
| `input` | `unknown` | no | Parameters the agent sent. |
| `output` | `unknown` | no | What came back (or the error). |
| `approvalMessage` | `string` | no | Shown with `approval`: what will happen if approved. |
| `onApprove` | `() => void` | no |  |
| `onDeny` | `() => void` | no |  |
| `defaultOpen` | `boolean` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — an agent acting on someone's data must show what it did, in words first ("Query sales for May 2026") and the raw call second, folded. Status reads from the icon and the label, not colour alone. Actions with side effects stop at Approval: the card states what will happen, and Deny is never the Primary. Input and output are monospace because they are data, not prose.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-tool-call--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2840-1689 (Tool Call, AI page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ToolCall/ToolCall.tsx
