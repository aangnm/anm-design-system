import figma from '@figma/code-connect'
import { Select } from './Select'

figma.connect(
  Select,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2107-11',
  {
    props: {
      error: figma.enum('State', { Error: true }),
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ error, disabled }) => (
      <Select error={error} disabled={disabled}>
        <option>Selecciona…</option>
      </Select>
    ),
  },
)
