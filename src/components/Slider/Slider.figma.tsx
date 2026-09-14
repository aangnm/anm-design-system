import figma from '@figma/code-connect'
import { Slider } from './Slider'

figma.connect(
  Slider,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2322-55',
  {
    example: () => <Slider min={0} max={100} value={40} onChange={() => {}} />,
  },
)
