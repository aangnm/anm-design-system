import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

figma.connect(
  Textarea,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2280-44',
  {
    props: {
      error: figma.enum('State', {
        Error: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ error, disabled }) => <Textarea error={error} disabled={disabled} placeholder="Escribe una nota…" />,
  },
)
