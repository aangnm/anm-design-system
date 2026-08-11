import figma from '@figma/code-connect'
import { Badge } from './Badge'

figma.connect(
  Badge,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2104-23',
  {
    props: {
      children: figma.string('3'),
      color: figma.enum('Color', {
        Neutral: 'neutral',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
        Info: 'info',
      }),
    },
    example: ({ children, color }) => <Badge color={color}>{children}</Badge>,
  },
)
