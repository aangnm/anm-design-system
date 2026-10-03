import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

figma.connect(
  Textarea,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2280-44',
  {
    props: {
      // Hover/Focus are CSS pseudo-states (map to nothing); Error and 'Focus + Error' are the `error` prop.
      error: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Error: true, 'Focus + Error': true }),
      disabled: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Disabled: true }),
    },
    example: ({ error, disabled }) => <Textarea error={error} disabled={disabled} placeholder="Escribe una nota…" />,
  },
)
