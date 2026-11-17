# SegmentedControl

> Mutually exclusive view/scope switch (e.g. Day/Week/Month). Active marks which segment is selected. Active segment raised on surface/page + text/primary; inactive text/secondary on a surface/container-high track. Use for 2–4 options; use Tabs for page-level navigation.

## Import

```tsx
import { SegmentedControl } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `options` | `SegmentedControlOption[]` | yes |  |
| `value` | `string` | yes |  |
| `onChange` | `(value: string) => void` | yes |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — The active segment is raised on surface/page over a surface/container-high track — deliberately not an underline. Tabs uses the underline; keeping the two treatments distinct signals different jobs: Tabs switches view, Segmented Control switches scope within one view.

Hit area — pointer: each segment (32 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-segmented-control--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2281-57 (Segmented Control, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/SegmentedControl/SegmentedControl.tsx
