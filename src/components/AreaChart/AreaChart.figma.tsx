import figma from '@figma/code-connect'
import { AreaChart } from './AreaChart'

figma.connect(
  AreaChart,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2310-71',
  {
    example: () => (
      <AreaChart
        categories={['mar', 'abr', 'may', 'jun', 'jul']}
        series={[
          { label: 'NDVI', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
          { label: 'NDRE', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
        ]}
      />
    ),
  },
)
