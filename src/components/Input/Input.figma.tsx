import figma from '@figma/code-connect'
import { Input } from './Input'

figma.connect(
  Input,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2101-26',
  {
    props: {
      placeholder: figma.string('Placeholder'),
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      // Hover/Focus are CSS pseudo-states (map to nothing); Error and 'Focus + Error' are the `error` prop.
      error: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Error: true, 'Focus + Error': true }),
      disabled: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Disabled: true }),
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
