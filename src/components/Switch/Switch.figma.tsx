import figma from '@figma/code-connect'
import { Switch } from './Switch'

figma.connect(
  Switch,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2103-14',
  {
    props: {
      label: figma.string('Etiqueta'),
      defaultChecked: figma.enum('State', { On: true }),
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ label, defaultChecked, disabled }) => (
      <Switch label={label} defaultChecked={defaultChecked} disabled={disabled} />
    ),
  },
)
