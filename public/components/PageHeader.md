# PageHeader

> Page/section header — title + subtitle on the left, actions (Icon Button + primary Button) on the right, over a bottom hairline. Add a Breadcrumb above for nested pages. Built from Button + Icon Button.

## Import

```tsx
import { PageHeader } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes |  |
| `subtitle` | `string` | no |  |
| `actions` | `ReactNode` | no |  |

Also accepts every attribute of `HTMLAttributes<HTMLDivElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Exists so page-level chrome is decided once. The action side pairs an Icon Button with a primary Button, which sets the expectation that secondary page actions are icon-only.

Hit area — pointer: the Icon Button (36 × 36) and the Button (36 high). On touch, extend each to 48 × 48 without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/product-patterns-page-header--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2341-59 (Page Header, Product Patterns page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/PageHeader/PageHeader.tsx
