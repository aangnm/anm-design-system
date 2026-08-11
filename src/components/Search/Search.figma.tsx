import figma from '@figma/code-connect'
import { Search } from './Search'

figma.connect(
  Search,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2107-27',
  {
    props: {
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ disabled }) => <Search disabled={disabled} />,
  },
)
