# DatePicker

> Calendar for date selection, shown in a popover from a date input. Selected day = interactive/primary; today = ring; navigate months via chevrons. Use with disableFuture where future dates are invalid.

## Import

```tsx
import { DatePicker } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `Date` | no |  |
| `onChange` | `(date: Date) => void` | no |  |
| `defaultMonth` | `Date` | no | Month currently displayed; defaults to `value`'s month or today. |
| `disableFuture` | `boolean` | no | Disable every date after today (Figma: "use with disableFuture"). |
| `isDateDisabled` | `(date: Date) => boolean` | no | Return true for days that cannot be chosen; they render greyed and never fire onChange. |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — Single date only — a range picker is not modelled here and should not be faked with two instances. Selected day uses interactive/primary; today is marked with a ring so the two never look the same.

States — Default shows today (ringed) and a selected day. Hover lays an 8% text/primary state layer on the day under the pointer, with a 1px border/default outline, so it still shows on the dark surface (pointer only). Focus draws a 2px focus/ring on the day that has keyboard focus. Disabled greys the days that cannot be chosen, such as dates after today when disableFuture is on, and a disabled day can never be selected.

Hit area — pointer: each day cell is 30 × 30; the month arrows need 24 × 24. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-date-picker--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2609-283 (Date Picker, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DatePicker/DatePicker.tsx
