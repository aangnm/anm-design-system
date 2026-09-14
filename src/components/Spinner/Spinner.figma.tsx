import figma from '@figma/code-connect'
import { Spinner } from './Spinner'

figma.connect(
  Spinner,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2279-42',
  {
    props: {
      size: figma.enum('Size', {
        SM: 'sm',
        MD: 'md',
        LG: 'lg',
      }),
    },
    example: ({ size }) => <Spinner size={size} />,
  },
)
