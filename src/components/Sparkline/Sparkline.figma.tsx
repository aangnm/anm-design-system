import figma from '@figma/code-connect'
import { Sparkline } from './Sparkline'

figma.connect(
  Sparkline,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2132-32',
  {
    example: () => <Sparkline data={[4, 6, 5, 8, 7, 9, 6, 10, 12]} />,
  },
)
