import figma from '@figma/code-connect'
import { SegmentedControl } from './SegmentedControl'

figma.connect(
  SegmentedControl,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2281-57',
  {
    example: () => (
      <SegmentedControl
        options={[
          { label: 'Día', value: 'day' },
          { label: 'Semana', value: 'week' },
          { label: 'Mes', value: 'month' },
        ]}
        value="day"
        onChange={() => {}}
      />
    ),
  },
)
