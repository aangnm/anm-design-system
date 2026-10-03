import figma from '@figma/code-connect'
import { ContentPanel } from './ContentPanel'
import { SegmentedControl } from '@/components/SegmentedControl'
import { LineChart } from '@/components/LineChart'

figma.connect(
  ContentPanel,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2340-17',
  {
    example: () => (
      <ContentPanel
        title="Índice vegetativo — histórico"
        controls={
          <SegmentedControl
            options={[
              { label: 'Día', value: 'day' },
              { label: 'Semana', value: 'week' },
              { label: 'Mes', value: 'month' },
            ]}
            value="day"
            onChange={() => {}}
          />
        }
      >
        <LineChart
          className="border-0 bg-transparent px-0"
          categories={['mar', 'abr', 'may', 'jun', 'jul']}
          series={[
            { label: 'NDVI', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
            { label: 'GNDVI', series: 2, data: [0.6, 0.63, 0.68, 0.64, 0.66] },
            { label: 'NDRE', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
          ]}
        />
      </ContentPanel>
    ),
  },
)
