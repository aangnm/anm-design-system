import figma from '@figma/code-connect'
import { Banner } from './Banner'

figma.connect(
  Banner,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2133-29',
  {
    props: {
      color: figma.enum('Color', {
        Info: 'info',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
      }),
    },
    example: ({ color }) => <Banner color={color} message="Mensaje para el usuario." onDismiss={() => {}} />,
  },
)
