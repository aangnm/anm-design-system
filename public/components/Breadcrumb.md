# Breadcrumb

> Shows location in the hierarchy and enables upward navigation.

## Import

```tsx
import { Breadcrumb } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` | yes |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Data-driven rather than slot-based: 'the last item is the current page, and is not a link' is the component's entire behaviour, so it owns the list instead of the caller.

Hit area — pointer: each link has a 24px-high target (marked Hit area); the current page is not a link. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Depth — 2, 3, 4 or 5 items (3 is the original). Pick the variant that matches the hierarchy; the labels are overridden on the instance. The last item is always the current page and is not a link, so every variant carries one Hit area frame per link and none on the last item. In a longer trail (5) the first item is the root; on a narrow screen show Depth 2 and let the parent label stand for the rest.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/navigation-breadcrumb--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2636-601 (Breadcrumb, Navigation page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Breadcrumb/Breadcrumb.tsx
