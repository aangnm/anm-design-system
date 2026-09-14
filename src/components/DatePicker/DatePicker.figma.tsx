import figma from '@figma/code-connect'
import { DatePicker } from './DatePicker'

figma.connect(
  DatePicker,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2325-63',
  {
    example: () => <DatePicker value={new Date(2026, 5, 17)} defaultMonth={new Date(2026, 5, 1)} onChange={() => {}} />,
  },
)
