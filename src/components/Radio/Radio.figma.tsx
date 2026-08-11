import figma from '@figma/code-connect'
import { Radio } from './Radio'

figma.connect(
  Radio,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2102-27',
  {
    props: {
      label: figma.string('Etiqueta'),
      defaultChecked: figma.enum('State', { Selected: true }),
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ label, defaultChecked, disabled }) => (
      <Radio label={label} defaultChecked={defaultChecked} disabled={disabled} />
    ),
  },
)
