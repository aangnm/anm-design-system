# DateRangePicker

> A trigger showing the active range and a panel with presets on the left and two months on the right. A preset applies at once; a custom range is two clicks (start, then end), with the days between tinted.

## Import

```tsx
import { DateRangePicker } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `DateRange` | no |  |
| `onChange` | `(range: DateRange) => void` | no |  |
| `presets` | `DateRangePreset[]` | no |  |
| `today` | `Date` | no | "Today" for presets and the calendar; defaults to the real date (set it for stable stories and tests). |
| `months` | `1 \| 2` | no | Months shown side by side (1 or 2; default 2). |
| `disableFuture` | `boolean` | no | Disable days after today. |
| `placeholder` | `string` | no |  |
| `className` | `string` | no |  |

## Design notes (from Figma)

Why — analytics questions are almost always about a period, and most periods are standard ones (last 7 days, this quarter). Presets make the common case one click and name it in the trigger ("Last 30 days"), which reads better in a report header than two raw dates. Date Picker stays the single-date control; this is the range one, built from the same day cells. Future days are disabled by default because reports rarely look forward.

Accessibility — every day is a button named with its full date; start and end are pressed, days between say "in range". Escape closes and returns focus to the trigger.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-date-range-picker--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2822-2646 (Date Range Picker, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DateRangePicker/DateRangePicker.tsx
