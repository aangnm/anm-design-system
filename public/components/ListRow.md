# ListRow

> Tappable row for choosing or opening one item from a list: leading icon box, title, optional subtitle, trailing chevron (a check when selected). 64 high. State = Default, Hover, Focus, Disabled, Selected (2px interactive/primary edge plus a check). Properties: Title, Subtitle, Show subtitle, Show icon, Icon (swap).

## Import

```tsx
import { ListRow } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `ReactNode` | yes |  |
| `subtitle` | `ReactNode` | no | Figma's "Subtitle" + "Show subtitle". |
| `icon` | `ReactNode` | no | Figma's "Icon" + "Show icon". |
| `selected` | `boolean` | no |  |

Also accepts every attribute of `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'>` (spread onto the root element).

## Design notes (from Figma)

Why — List is a read-only block with three fixed rows and cannot take a fourth account or a fifth category; Menu Item is a row inside a popup. The selectable row was missing as its own piece, the same relationship Menu Item has to Menu. Stack rows 8px apart on the page, or inside a Card.

Contrast — the edge is border/subtle: a container edge, not a control boundary (see the Border tokens rule on About), so it is not held to 3:1. The row is identified by its text, the chevron (icon/muted 4.7:1 Light / 5.1:1 Dark) and the icon box. Selected adds a 2px interactive/primary edge (12.6 / 14.1) backed by the check, so it never relies on colour. Title 18.6 / 13.0, subtitle 7.2 / 6.2.

Hit area — 64 high and full width: the row is the target.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-list-row--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2630-1852 (List Row, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ListRow/ListRow.tsx
