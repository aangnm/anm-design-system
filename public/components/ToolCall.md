# ToolCall

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

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/ai-tool-call--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ToolCall/ToolCall.tsx
