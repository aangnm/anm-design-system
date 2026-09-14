import figma from '@figma/code-connect'
import { Progress } from './Progress'

figma.connect(
  Progress,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2133-30',
  {
    example: () => <Progress value={65} label="Progreso" />,
  },
)
