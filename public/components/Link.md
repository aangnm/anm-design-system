# Link

> Inline text link. State=Default/Hover/Focus/Visited; toggle External for an inline arrow suffix on links that leave the product. Underlined by default so the affordance does not depend on color alone.

## Import

```tsx
import { Link } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `external` | `boolean` | no | Figma "External": adds the inline arrow suffix and opens in a new tab safely. |
| `standalone` | `boolean` | no | Standalone (not inside running text): 24px min height, 48px touch target. |

Also accepts every attribute of `AnchorHTMLAttributes<HTMLAnchorElement>` (spread onto the root element).

## Design notes (from Figma)

Why — This library had no text-link primitive: every clickable element was a Button, Icon Button, or nav item, so inline links (body copy, footnotes, external references) had no defined treatment. Kept deliberately minimal — text/primary underlined by default, text/emphasis on Hover, the shared Focus ring (2px, 2px outside) on Focus (same treatment as every other focusable control), text/secondary on Visited. No new color token was introduced: the file already reserves brand/accent for brand moments and semantic/* for shared meanings, and a link is neither, so it borrows the existing text tokens instead of adding a link-specific one.

Hit area — pointer: 24px high as a standalone link. Links inside running text are exempt. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-link--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2399-114 (Link, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Link/Link.tsx
