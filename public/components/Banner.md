# Banner

> Inline contextual message tied to a region or page. Color by semantic meaning (Info/Success/Warning/Error).

## Import

```tsx
import { Banner } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `color` | `BannerColor` | no | Maps to Figma's "Color" variant. |
| `message` | `string` | yes |  |
| `title` | `string` | no | Optional bold first line — Figma's "Title" boolean + "Title text". |
| `action` | `BannerAction` | no | Optional single underlined text action — Figma's "Action" boolean + "Action label". |
| `onDismiss` | `() => void` | no | Called when the close icon is clicked; omit to hide the close affordance. |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLDivElement>, 'title'>` (spread onto the root element).

## Design notes (from Figma)

Title and Action — two optional parts, both off by default. Title adds a bold first line above the message; Action adds one underlined text action such as Undo or Retry, kept to a single action so a banner never becomes a dialog. Booleans: Show title, Show action. Text properties: Title, Action label.

Why — Colour carries the meaning here because a banner sits inside known page content — a tinted surface is safe. Each colour also gets its own icon (info / check / triangle-alert / circle-x); an earlier build repeated one placeholder icon and made colour do all the work, which fails for colour-blind readers.

High contrast — in Light · High contrast the tint alone is too faint to mark the edge (white on white), so each Color gets a 2px border in its own semantic colour. The border width is the token border-width/status: 0 in Dark and Light (nothing changes), 2 in High contrast.

Hit area — pointer: the close icon (16px visual) has a 24 × 24 target (marked Hit area) and the Action is 24 high. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/feedback-overlays-banner--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2133-29 (Banner, Feedback & Overlays page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Banner/Banner.tsx
