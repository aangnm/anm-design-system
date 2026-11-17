# IconButton

> Icon-only button. Type (Primary / Secondary / Ghost) x Size (SM 32 / MD 36 / LG 48) x State (Default / Hover / Focus / Disabled). State mirrors Button exactly: Hover adds the 8% state layer in the icon colour, Focus adds the shared Focus ring, 2px wide and 2px outside, over the default fill, Disabled uses interactive/disabled with the icon on text/disabled. Swap the icon instance for any Lucide glyph; always give it an accessible label in code.

## Import

```tsx
import { IconButton } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | no | Default 'primary'. |
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |
| `icon` | `ReactNode` | yes | Icon glyph — swap for any Lucide icon. |
| `aria-label` | `string` | yes | Required — an icon-only control has no visible label. |

Also accepts every attribute of `ButtonHTMLAttributes<HTMLButtonElement>` (spread onto the root element).

## Design notes (from Figma)

Why — State mirrors Button exactly so the two never drift. The disabled icon uses text/disabled rather than icon/muted: in Dark Mode text/disabled resolves to charcoal/600 against icon/muted's charcoal/400, and the dimmer value is the correct direction against the disabled fill — the seemingly more semantic icon/* token would read as enabled. Icon: a swap property. Pick any icon/<name> from the instance.

Hit area — pointer: the button itself (32, 36 or 48 square). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-icon-button--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2282-63 (Icon Button, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/IconButton/IconButton.tsx
