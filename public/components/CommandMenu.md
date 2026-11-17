# CommandMenu

> The ⌘K palette: a search field over grouped commands and destinations, run from the keyboard. With an AI handler, the first row hands the typed text to an agent ("Ask AI").

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

## Design notes (from Figma)

Why — reopened from the Roadmap's Accepted list (2026-11-17): AI elements are the system's focus, and a command entry is the usual way to reach an agent from anywhere; the analytics set now has enough surfaces to need a way to jump between them. A modal dialog over the scrim, 560 wide, placed high so results grow downward without the field moving. The footer teaches the keys with Kbd. "Ask AI" comes first whenever there is text, so "no match" is never a dead end.

Accessibility — the field is a combobox that owns the listbox; arrows move the active option, Enter runs it, Escape closes and returns focus; ⌘K / Ctrl+K toggles it from anywhere.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-command-menu--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2835-2828 (Command Menu, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/CommandMenu/CommandMenu.tsx
