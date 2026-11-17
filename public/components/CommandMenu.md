# CommandMenu

## Import

```tsx
import { CommandMenu } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `open` | `boolean` | yes |  |
| `onOpenChange` | `(open: boolean) => void` | yes |  |
| `groups` | `CommandGroup[]` | yes |  |
| `onAsk` | `(query: string) => void` | no | Adds an "Ask AI" row that receives the typed text. |
| `placeholder` | `string` | no |  |
| `emptyMessage` | `string` | no |  |
| `shortcut` | `boolean` | no | Toggle with ⌘K / Ctrl+K anywhere on the page (default on). |
| `inline` | `boolean` | no | Render inline instead of in a portal (stories and screenshots). |
| `defaultQuery` | `string` | no | Starting text (stories). |

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-command-menu--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/CommandMenu/CommandMenu.tsx
