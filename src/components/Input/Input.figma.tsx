import figma from '@figma/code-connect'
import { Input } from './Input'

figma.connect(
  Input,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2101-26',
  {
    props: {
      placeholder: figma.string('Placeholder'),
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      error: figma.enum('State', { Error: true }),
      disabled: figma.enum('State', { Disabled: true }),
      leadingIcon: figma.boolean('Leading icon', {
        true: figma.instance('Leading icon'),
        false: undefined,
      }),
    },
    example: ({ placeholder, size, error, disabled, leadingIcon }) => (
      <Input placeholder={placeholder} size={size} error={error} disabled={disabled} leadingIcon={leadingIcon} />
    ),
  },
)
