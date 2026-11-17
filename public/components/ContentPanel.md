# ContentPanel

> Titled surface that frames a graph, table, or content block: header (title + optional controls) over a content area. The graph/table sits inside borderless; the panel owns the card chrome. Primary dashboard container for the product.

## Import

```tsx
import { ContentPanel } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes |  |
| `controls` | `ReactNode` | no |  |
| `children` | `ReactNode` | yes |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — The nested chart instance is overridden to be borderless rather than rebuilt without a border. Keeping it a real instance means chart fixes still propagate here.

Hit area — pointer: the Segmented Control segments (32 high). On touch, extend each to 48 high without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/product-patterns-content-panel--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2340-17 (Content Panel, Product Patterns page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ContentPanel/ContentPanel.tsx
