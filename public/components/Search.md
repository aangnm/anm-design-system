# Search

> Search field with a leading magnifier, for filtering lists or global search.

## Import

```tsx
import { Search } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>` (spread onto the root element).

## Design notes (from Figma)

Why — A native text input with an overlaid magnifier, for the same reason as Select: no custom popup behaviour is implied, and none should be read into it.

Size — SM 32, MD 36 and LG 48 high (260, 280 and 300 wide), the same scale as Input and Button.

States — Default, Hover (border/emphasis), Focus (focus/ring) and Disabled. A search field has no Error: an empty result is not an invalid entry.

Hit area — pointer: the whole field (32, 36 or 48 high by Size). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-search--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2107-27 (Search, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Search/Search.tsx
