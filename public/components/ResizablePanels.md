# ResizablePanels

> Two or more panels side by side (or stacked) with a handle between each pair that drags to resize — a chart beside its table, a list beside its detail, an AI chat beside the canvas it works on.

## Import

```tsx
import { ResizablePanels } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `children` | `ReactNode` | yes | One child per panel; handles go between them. |
| `direction` | `'horizontal' \| 'vertical'` | no | `horizontal` puts panels side by side; `vertical` stacks them. |
| `defaultSizes` | `number[]` | no | Starting sizes in percent, one per panel; defaults to equal. |
| `minSizes` | `number[]` | no | Smallest size in percent, one per panel; defaults to 10 each. |
| `panelLabels` | `string[]` | no | Accessible name of each panel, used to label its handle. |
| `withHandle` | `boolean` | no | Shows a grip on each handle. |
| `onSizesChange` | `(sizes: number[]) => void` | no |  |

Also accepts every attribute of `Omit<HTMLAttributes<HTMLDivElement>, 'children'>` (spread onto the root element).

## Design notes (from Figma)

Why — dashboards are read differently by different people, so the split should be theirs to set, inside limits the layout can survive (minSizes in code). The handle is a 1px border/subtle line, the same weight as a card edge, so a resizable layout looks like a normal one until it is touched; hover and drag raise it to border/emphasis. Show grip adds a grip for layouts where the affordance must be obvious (a first-run dashboard, touch screens).

Accessibility — each handle is a focusable separator with its panel's size as its value. Arrow keys move it 2% (Shift: 10%), Home / End go to the limits, Enter or a double click resets the default split, so dragging is never the only way.

Hit area — the line is 1px but its hit area is 17px (25px on touch), centred on the line.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/data-display-resizable-panels--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2828-1521 (Resizable Panels, Data Display page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ResizablePanels/ResizablePanels.tsx
