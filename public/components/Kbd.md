# Kbd

> A keyboard key, shown inline in text, menus, tooltips and the Command Menu footer. In code, keys={['⌘','K']} renders a chord as keys side by side.

## Import

```tsx
import { Kbd } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `keys` | `string[]` | no | Several keys pressed together (a chord), e.g. ['⌘', 'K']. Use children for a single key. |

Also accepts every attribute of `HTMLAttributes<HTMLElement>` (spread onto the root element).

## Design notes (from Figma)

Why — shortcuts help only if they are visible where the action is. One key per Kbd keeps the keycap readable; a chord has no "+" between keys, which is how macOS menus show it and reads faster. Keys sit on surface/container-high with a border/default edge so they read as objects, not as code. Text is 11px Medium on text/secondary: a hint, never the most important thing in its row.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-kbd--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2833-2647 (Kbd, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Kbd/Kbd.tsx
