# ScrollArea

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

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-scroll-area--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ScrollArea/ScrollArea.tsx
