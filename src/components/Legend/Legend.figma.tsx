import figma from '@figma/code-connect'
import { Legend } from './Legend'

figma.connect(
  Legend,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2305-31',
  {
    example: () => (
      <Legend
        items={[
          { label: 'NDVI', series: 1 },
          { label: 'GNDVI', series: 2 },
          { label: 'NDRE', series: 3 },
        ]}
      />
    ),
  },
)
