# AccordionItem

> Disclosure row for grouped content: a header (title + chevron) that reveals a body on expand. State=Collapsed/Expanded. Stack several with a shared bottom hairline for a list of sections — no separate container component, same relationship as Menu Item to Menu.

## Import

```tsx
import { AccordionItem } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `ReactNode` | yes |  |
| `open` | `boolean` | no | Controlled open state. |
| `defaultOpen` | `boolean` | no |  |
| `onOpenChange` | `(open: boolean) => void` | no |  |
| `size` | `'md' \| 'lg'` | no | Figma's Size. LG is the touch size. |
| `icon` | `ReactNode` | no | Figma's "Leading icon" + "Icon". |
| `count` | `number` | no | Figma's "Show count": an Info Badge after the title. |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'>` (spread onto the root element).

## Design notes (from Figma)

Why — Drawer and Modal are the only ways today to hide content behind an interaction, and both fully block the page. Accordion is for content that belongs on the page but doesn't need to be visible all the time — per-account detail sections, grouped settings. Chevron rotates 180° on expand; no separate icon swap needed.

Hit area — pointer: the whole header row (48 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Slots — Title is a text property. Leading icon (swap) and Show count (a Badge Info, set from its own Label) are optional and off by default, so the plain disclosure row is unchanged; they let a list of sections carry an icon and a tally without a second component. To put your own rows under an expanded header, hide the body text on the instance and stack the rows beneath it: an instance cannot take children, so the rows are siblings, not a slot.

Row spacing — 12px between icon, title, count and chevron, so the optional slots never touch the title; the plain header is unchanged because the title fills the row.

Size — MD is the original (14px title, flush to the edges, for desktop and dense pages). LG is the touch size: 16px title, 16px side padding, a 56 high header and a 20px chevron. On a phone put LG headers inside a soft container: a frame on surface/container with a border/subtle edge and radius/lg that clips its headers and the Count Rows beneath an expanded one.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-accordion--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2403-124 (Accordion, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Accordion/Accordion.tsx
