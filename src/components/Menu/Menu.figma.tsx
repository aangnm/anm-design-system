import figma from '@figma/code-connect'
import { Menu, MenuItem } from './Menu'

figma.connect(
  MenuItem,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2125-16',
  {
    props: {
      children: figma.string('Elemento del menú'),
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ children, disabled }) => <MenuItem disabled={disabled}>{children}</MenuItem>,
  },
)

figma.connect(
  Menu,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2125-17',
  {
    example: () => (
      <Menu>
        <MenuItem>Elemento del menú</MenuItem>
        <MenuItem>Elemento del menú</MenuItem>
      </Menu>
    ),
  },
)
