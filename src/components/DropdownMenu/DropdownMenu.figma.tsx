import figma from '@figma/code-connect'
import { DropdownMenu } from './DropdownMenu'
import { MenuItem } from '@/components/Menu'

figma.connect(
  DropdownMenu,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2226-123',
  {
    props: {
      // Figma's State=Open/Closed is a static depiction of what the code
      // component tracks itself — mapped to the initial value only.
      defaultOpen: figma.enum('State', { Open: true, Searchable: true }),
      searchable: figma.enum('State', { Searchable: true }),
    },
    example: ({ defaultOpen, searchable }) => (
      <DropdownMenu label="Opciones" defaultOpen={defaultOpen} searchable={searchable}>
        <MenuItem leadingIcon={!searchable}>Elemento del menú</MenuItem>
        <MenuItem leadingIcon={!searchable}>Elemento del menú</MenuItem>
      </DropdownMenu>
    ),
  },
)
