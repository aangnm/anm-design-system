import figma from '@figma/code-connect'
import { Tooltip } from './Tooltip'

figma.connect(
  Tooltip,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2106-4',
  {
    props: {
      children: figma.string('Información'),
    },
    example: ({ children }) => <Tooltip>{children}</Tooltip>,
  },
)
