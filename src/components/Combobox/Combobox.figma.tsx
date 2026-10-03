import figma from '@figma/code-connect'
import { Combobox } from './Combobox'

const options = [
  { value: '07', label: 'Lote 07' },
  { value: '12', label: 'Lote 12' },
  { value: '15n', label: 'Lote 15N' },
]

figma.connect(
  Combobox,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2400-116',
  {
    props: {
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      // State=Hover/Focus are :hover/:focus; Open is real open state.
      disabled: figma.enum('State', { Disabled: true }),
      error: figma.enum('State', { Error: true, 'Focus + Error': true }),
    },
    example: ({ size, disabled, error }) => (
      <Combobox options={options} size={size} disabled={disabled} error={error} />
    ),
  },
)
