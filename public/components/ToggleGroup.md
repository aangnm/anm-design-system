# ToggleGroup

> A row of toggle buttons where one or several can be on — which series a chart shows, text formatting, view options.

## Import

```tsx
import { ToggleGroup } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Design notes (from Figma)

Why — Segmented Control already covers "choose exactly one scope" as a radio group. Toggle Group is for on/off options: multiple lets several be on, and single allows none, which a radio group cannot. Pressed items take surface/highlight, the same selection tint as a Data Table row, so "on" means one thing across the system. Icon-only items still carry a label, used as their name and tooltip.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-toggle-group--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2833-2704 (Toggle Group, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ToggleGroup/ToggleGroup.tsx
