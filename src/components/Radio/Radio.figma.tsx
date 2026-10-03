import figma from '@figma/code-connect'
import { Radio } from './Radio'

figma.connect(
  Radio,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2102-27',
  {
    props: {
      label: figma.string('Etiqueta'),
      // Value axis = the real checked state.
      defaultChecked: figma.enum('Value', { Selected: true }),
      // State axis: Hover and Focus are CSS pseudo-states (map to nothing);
      // only Disabled is a real attribute.
      disabled: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Disabled: true }),
    },
    example: ({ label, defaultChecked, disabled }) => (
      <Radio label={label} defaultChecked={defaultChecked} disabled={disabled} />
    ),
  },
)
