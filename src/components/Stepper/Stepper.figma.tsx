import figma from '@figma/code-connect'
import { Stepper } from './Stepper'

// Size and State are variant props in Figma. Hover / Focus are real CSS states
// (no prop); Disabled, Error and Focus + Error map to props.
figma.connect(
  Stepper,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2606-5500',
  {
    props: {
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      disabled: figma.enum('State', { Disabled: true }),
      error: figma.enum('State', { Error: true, 'Focus + Error': true }),
    },
    example: ({ size, disabled, error }) => (
      <Stepper value={12} min={0} max={24} size={size} disabled={disabled} error={error} onChange={() => {}} />
    ),
  },
)
