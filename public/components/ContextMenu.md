# ContextMenu

> The menu opened by a right click (or the Menu key / Shift+F10) on an area — a table row, a chart, a canvas — at the point where it was opened.

## Import

```tsx
import { ContextMenu } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `items` | `ContextMenuItem[]` | yes |  |
| `children` | `ReactNode` | yes | The area that opens the menu. |
| `label` | `string` | no | Accessible name of the menu. |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — context menus are fast for people who know they exist and invisible to everyone else, so they are a shortcut, never the only route: every item must also be reachable from a visible control (a row's ⋯ button, a toolbar). It looks like Menu, with shortcuts in Kbd. Destructive items go last, after a separator, in text/error.

Keyboard — focus moves to the first item; arrows move, Home / End jump, Enter runs, Escape or Tab closes and returns focus.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-context-menu--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2835-2121 (Context Menu, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ContextMenu/ContextMenu.tsx
