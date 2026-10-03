import figma from '@figma/code-connect'
import { Search } from './Search'

figma.connect(
  Search,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2107-27',
  {
    props: {
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      // Hover/Focus are CSS pseudo-states (map to nothing); Search has no Error.
      disabled: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Disabled: true }),
    },
    example: ({ size, disabled }) => <Search size={size} disabled={disabled} />,
  },
)
