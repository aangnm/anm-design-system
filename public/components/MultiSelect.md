# MultiSelect

> Multi-select / combobox — a select that holds multiple values as removable chips (Tag, dismissible) with a chevron affordance. Opens the same Menu panel as Dropdown Menu. For a single value use Select.

## Import

```tsx
import { MultiSelect } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |
| `error` | `boolean` | no | Default false. |
| `options` | `MultiSelectOption[]` | yes |  |
| `value` | `string[]` | yes |  |
| `onChange` | `(value: string[]) => void` | yes |  |
| `placeholder` | `string` | no |  |
| `aria-label` | `string` | no | Accessible name when no <label> points at the field; defaults to the placeholder. |
| `disabled` | `boolean` | no | Maps to Figma's State=Disabled. |
| `defaultOpen` | `boolean` | no | Maps to Figma's State=Open — the initial open state; the component tracks it afterwards. |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Chips are real Tag instances with Dismissible enabled, not a bespoke chip. They inherit Tag's semantic colours and dismiss affordance, so a filter chip means the same thing wherever it appears.

Size — SM 32, MD 36 and LG 48 high (260, 280 and 300 wide), the same scale as Input and Button. Chips stay 24 high at every Size.

States — Default, Hover (border/emphasis), Focus (focus/ring), Disabled, Error, and Focus + Error: the error border with a 2px focus/ring outside it, so an invalid field that is being edited still shows keyboard focus. Hover is pointer only.

Open — the field at its Size with a Focus border, chips kept, and the list panel below: each option is a Checkbox row, checked when its chip is in the field. Unlike Select, the list stays open while you pick, because several values are chosen.

Hit area — pointer: the whole field (32, 36 or 48 high by Size). Each chip dismiss needs its own 24 × 24 target. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-multi-select--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2606-5360 (Multi-select, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/MultiSelect/MultiSelect.tsx
