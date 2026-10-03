import figma from '@figma/code-connect'
import { MultiSelect } from './MultiSelect'

// Size and State are variant props in Figma. Hover / Focus are real CSS states;
// Disabled, Error / Focus + Error and Open map to props.
figma.connect(
  MultiSelect,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2606-5360',
  {
    props: {
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      disabled: figma.enum('State', { Disabled: true }),
      error: figma.enum('State', { Error: true, 'Focus + Error': true }),
      defaultOpen: figma.enum('State', { Open: true }),
    },
    example: ({ size, disabled, error, defaultOpen }) => (
      <MultiSelect
        size={size}
        disabled={disabled}
        error={error}
        defaultOpen={defaultOpen}
        options={[
          { label: 'Cosecha', value: 'harvest' },
          { label: 'Riego', value: 'irrigation' },
          { label: 'Tratamiento', value: 'treatment' },
        ]}
        value={['harvest', 'irrigation']}
        onChange={() => {}}
      />
    ),
  },
)
