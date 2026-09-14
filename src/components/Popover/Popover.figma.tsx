import figma from '@figma/code-connect'
import { Popover } from './Popover'

figma.connect(
  Popover,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2134-18',
  {
    example: () => (
      <Popover title="Título del popover">Contenido con información contextual y acciones opcionales.</Popover>
    ),
  },
)
