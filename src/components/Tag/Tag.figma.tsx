import figma from '@figma/code-connect'
import { Tag } from './Tag'

figma.connect(
  Tag,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2104-12',
  {
    props: {
      children: figma.string('Etiqueta'),
      color: figma.enum('Color', {
        Neutral: 'neutral',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
        Info: 'info',
      }),
      dismissible: figma.boolean('Dismissible'),
    },
    example: ({ children, color, dismissible }) => (
      <Tag color={color} dismissible={dismissible}>
        {children}
      </Tag>
    ),
  },
)
