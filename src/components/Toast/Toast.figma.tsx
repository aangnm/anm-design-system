import figma from '@figma/code-connect'
import { Toast } from './Toast'

figma.connect(
  Toast,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2196-41',
  {
    props: {
      color: figma.enum('Color', {
        Success: 'success',
        Info: 'info',
        Warning: 'warning',
        Error: 'error',
      }),
    },
    example: ({ color }) => (
      <Toast color={color} title="Guardado" description="Los cambios se guardaron correctamente." onDismiss={() => {}} />
    ),
  },
)
