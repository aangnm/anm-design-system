import figma from '@figma/code-connect'
import { BarChart } from './BarChart'

figma.connect(
  BarChart,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2132-11',
  {
    props: {
      showValues: figma.boolean('Show values'),
      highlightLatest: figma.boolean('Highlight latest'),
    },
    example: ({ showValues, highlightLatest }) => (
      <BarChart
        max={300}
        showValues={showValues}
        highlightLatest={highlightLatest}
        data={[
          { label: 'S1', value: 125 },
          { label: 'S2', value: 190 },
          { label: 'S3', value: 145 },
          { label: 'S4', value: 235 },
          { label: 'S5', value: 210 },
          { label: 'S6', value: 255 },
        ]}
      />
    ),
  },
)
