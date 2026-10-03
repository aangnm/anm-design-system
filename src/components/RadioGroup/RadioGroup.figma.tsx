import figma from '@figma/code-connect'
import { RadioGroup } from './RadioGroup'

figma.connect(
  RadioGroup,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2408-108',
  {
    props: {
      legend: figma.string('Leyenda'),
      helperText: figma.string('Texto de ayuda'),
    },
    example: ({ legend, helperText }) => (
      <RadioGroup
        legend={legend}
        helperText={helperText}
        defaultValue="cafe"
        options={[
          { value: 'cafe', label: 'Café' },
          { value: 'cacao', label: 'Cacao' },
          { value: 'platano', label: 'Plátano' },
        ]}
      />
    ),
  },
)
