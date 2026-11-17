# Tab

> Switch between peer views in the same context. The active tab shows the primary underline indicator.

## Import

```tsx
import { Tab } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `active` | `boolean` | no |  |

Also accepts every attribute of `ButtonHTMLAttributes<HTMLButtonElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Only the Active tab shows the underline — the indicator exists on every variant but stays hidden, so switching state never reflows the row. In code this set becomes two things: Tabs (the tablist) and Tab (the item), because a single Figma variant set is doing both jobs.

Hit area — pointer: each tab (40 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-tabs--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2123-17 (Tabs, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Tabs/Tabs.tsx
