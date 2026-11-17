# EmptyState

> A whole page or panel with nothing in it yet — icon badge, heading, one line of guidance, one primary action. Distinct from Card/Stat/List/Table's own built-in Empty state, which fills only that one component’s bounds; this is the bigger version, for a page or section that has never had data at all. It has no border of its own and fills whatever space it is given, like Divider and Spinner.

## Import

```tsx
import { EmptyState } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `icon` | `ReactNode` | no | Glyph inside the 56px badge; defaults to the inbox. |
| `title` | `ReactNode` | yes |  |
| `description` | `ReactNode` | no |  |
| `action` | `ReactNode` | no | The one primary action, e.g. `<Button>Add account</Button>`. |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLDivElement>, 'title'>` (spread onto the root element).

## Design notes (from Figma)

Why — the per-component Empty states already in the library answer "this list has no rows right now." They don't answer "this product surface has never been set up" (no accounts registered, no campaigns created) — a first-run moment that deserves an action, not just an icon and a sentence.

Hit area — pointer: the Add button (36 high). On touch, extend it to 48 × 48 without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/product-patterns-empty-state--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2405-74 (Empty State, Product Patterns page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/EmptyState/EmptyState.tsx
