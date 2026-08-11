import figma from '@figma/code-connect'
import { BarChart } from './BarChart'

figma.connect(
  BarChart,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2132-11',
  {
    example: () => (
      <BarChart
        data={[
          { label: 'S1', value: 63 },
          { label: 'S2', value: 95 },
          { label: 'S3', value: 73 },
          { label: 'S4', value: 118 },
          { label: 'S5', value: 104 },
          { label: 'S6', value: 134 },
        ]}
      />
    ),
  },
)
