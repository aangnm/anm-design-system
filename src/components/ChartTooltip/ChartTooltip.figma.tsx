import figma from '@figma/code-connect'
import { ChartTooltip } from './ChartTooltip'

figma.connect(
  ChartTooltip,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2305-42',
  {
    example: () => (
      <ChartTooltip
        heading="17 jun"
        rows={[
          { label: 'NDVI', value: '0.86', series: 1 },
          { label: 'GNDVI', value: '0.71', series: 2 },
          { label: 'NDRE', value: '0.34', series: 3 },
        ]}
      />
    ),
  },
)
