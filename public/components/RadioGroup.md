# RadioGroup

> A legend + optional helper text over a stack of Radio options — the wrapper Form Field never generalized to. Form Field labels one control; this labels a set.

## Import

```tsx
import { RadioGroup } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `legend` | `string` | yes |  |
| `helperText` | `ReactNode` | no |  |
| `options` | `RadioGroupOption[]` | yes |  |
| `name` | `string` | no |  |
| `value` | `string` | no |  |
| `defaultValue` | `string` | no |  |
| `onValueChange` | `(value: string) => void` | no |  |
| `disabled` | `boolean` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — every multi-option Radio group in the file so far has re-solved "legend + helper + stacked options" by hand, the same layout problem Form Field already solved once for a single Input. Built from Radio's own circle styling (border/emphasis unselected, interactive/primary selected) rather than a new marker treatment.

Hit area — pointer: each option row, 24 high. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-radio-group--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2408-108 (Radio Group, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/RadioGroup/RadioGroup.tsx
