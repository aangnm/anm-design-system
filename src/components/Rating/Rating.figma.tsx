import figma from '@figma/code-connect'
import { Rating } from './Rating'

figma.connect(
  Rating,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2409-5442',
  {
    props: {
      severity: figma.enum('Severity', {
        Critical: 'critical',
        Moderate: 'moderate',
        Healthy: 'healthy',
      }),
    },
    example: ({ severity }) => <Rating severity={severity} />,
  },
)
