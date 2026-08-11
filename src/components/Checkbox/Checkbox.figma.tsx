import figma from '@figma/code-connect'
import { Checkbox } from './Checkbox'

figma.connect(
  Checkbox,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2102-16',
  {
    props: {
      label: figma.string('Etiqueta'),
      defaultChecked: figma.enum('State', { Checked: true }),
      indeterminate: figma.enum('State', { Indeterminate: true }),
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ label, defaultChecked, indeterminate, disabled }) => (
      <Checkbox label={label} defaultChecked={defaultChecked} indeterminate={indeterminate} disabled={disabled} />
    ),
  },
)
