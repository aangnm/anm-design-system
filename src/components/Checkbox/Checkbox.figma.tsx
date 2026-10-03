import figma from '@figma/code-connect'
import { Checkbox } from './Checkbox'

figma.connect(
  Checkbox,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2102-16',
  {
    props: {
      label: figma.string('Etiqueta'),
      // Value axis = the real checked / indeterminate state.
      defaultChecked: figma.enum('Value', { Checked: true }),
      indeterminate: figma.enum('Value', { Indeterminate: true }),
      // State axis: Hover and Focus are CSS pseudo-states (map to nothing);
      // only Disabled is a real attribute.
      disabled: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Disabled: true }),
    },
    example: ({ label, defaultChecked, indeterminate, disabled }) => (
      <Checkbox label={label} defaultChecked={defaultChecked} indeterminate={indeterminate} disabled={disabled} />
    ),
  },
)
