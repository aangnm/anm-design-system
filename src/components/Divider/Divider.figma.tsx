import figma from '@figma/code-connect'
import { Divider } from './Divider'

figma.connect(
  Divider,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2278-39',
  {
    props: {
      orientation: figma.enum('Orientation', {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      }),
    },
    example: ({ orientation }) => <Divider orientation={orientation} />,
  },
)
