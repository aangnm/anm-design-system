# ScrollArea

> A region that scrolls inside a fixed height or width — a long list, a chat history, a side panel — with a thin token-coloured scrollbar and a soft edge that says there is more.

## Import

```tsx
import { ScrollArea } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `aria-label` | `string` | yes | Names the region for assistive tech; required because the region is focusable. |
| `orientation` | `'vertical' \| 'horizontal'` | no |  |
| `maxSize` | `number` | no | Max height (vertical) or width (horizontal) in px; or size the area with a class. |
| `surface` | `'page' \| 'container' \| 'container-high'` | no | Colour behind the content, for the edge fades. |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — native scrollbars can be invisible on macOS until you scroll, so a clipped list can look complete. The 16px edge fade (surface to transparent) appears only on a side that has more content. The scrollbar is the browser's own, thinned and coloured border/default, so it keeps native behaviour. In code the region is focusable and named, so keyboard users can reach and scroll it.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-scroll-area--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2833-2720 (Scroll Area, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ScrollArea/ScrollArea.tsx
