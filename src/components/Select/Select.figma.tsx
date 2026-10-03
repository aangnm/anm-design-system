import figma from '@figma/code-connect'
import { Select } from './Select'

figma.connect(
  Select,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2107-11',
  {
    props: {
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      // Hover/Focus are CSS pseudo-states (map to nothing); Error and 'Focus + Error' are the `error` prop.
      error: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Error: true, 'Focus + Error': true }),
      disabled: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Disabled: true }),
    },
    example: ({ size, error, disabled }) => (
      <Select size={size} error={error} disabled={disabled}>
        <option>Selecciona…</option>
      </Select>
    ),
  },
)
