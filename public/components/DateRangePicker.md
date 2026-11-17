# DateRangePicker

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

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-date-range-picker--docs
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/DateRangePicker/DateRangePicker.tsx
