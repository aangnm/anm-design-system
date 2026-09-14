import figma from '@figma/code-connect'
import { Bell } from 'lucide-react'
import { IconButton } from './IconButton'

figma.connect(
  IconButton,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2282-63',
  {
    props: {
      variant: figma.enum('Type', {
        Primary: 'primary',
        Secondary: 'secondary',
        Ghost: 'ghost',
      }),
      size: figma.enum('Size', {
        SM: 'sm',
        MD: 'md',
        LG: 'lg',
      }),
    },
    example: ({ variant, size }) => <IconButton variant={variant} size={size} icon={<Bell />} aria-label="Notificaciones" />,
  },
)
