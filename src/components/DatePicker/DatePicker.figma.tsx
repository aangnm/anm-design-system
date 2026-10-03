import figma from '@figma/code-connect'
import { DatePicker } from './DatePicker'

// State=Hover / Focus are CSS states of a day (no prop). State=Disabled shows
// the days that cannot be chosen — in code that is `disableFuture` /
// `isDateDisabled`, so it maps to `disableFuture`.
figma.connect(
  DatePicker,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2609-283',
  {
    props: {
      disableFuture: figma.enum('State', { Disabled: true }),
    },
    example: ({ disableFuture }) => (
      <DatePicker
        value={new Date(2026, 5, 17)}
        defaultMonth={new Date(2026, 5, 1)}
        disableFuture={disableFuture}
        onChange={() => {}}
      />
    ),
  },
)
