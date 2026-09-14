import figma from '@figma/code-connect'
import { Skeleton } from './Skeleton'

figma.connect(
  Skeleton,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2278-44',
  {
    props: {
      shape: figma.enum('Shape', {
        Line: 'line',
        Block: 'block',
        Circle: 'circle',
      }),
    },
    example: ({ shape }) => <Skeleton shape={shape} />,
  },
)
