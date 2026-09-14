import figma from '@figma/code-connect'
import { LineChart } from './LineChart'

figma.connect(
  LineChart,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2308-71',
  {
    example: () => (
      <LineChart
        categories={['mar', 'abr', 'may', 'jun', 'jul']}
        series={[
          { label: 'NDVI', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
          { label: 'GNDVI', series: 2, data: [0.6, 0.63, 0.68, 0.64, 0.66] },
          { label: 'NDRE', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
        ]}
      />
    ),
  },
)
