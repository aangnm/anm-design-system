import figma from '@figma/code-connect'
import { Stepper } from './Stepper'

figma.connect(
  Stepper,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2322-60',
  {
    example: () => <Stepper value={12} min={0} max={24} onChange={() => {}} />,
  },
)
