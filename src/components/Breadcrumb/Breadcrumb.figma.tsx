import figma from '@figma/code-connect'
import { Breadcrumb } from './Breadcrumb'

// The Figma component has no variant props — the trail is static content.
// The code equivalent takes the trail as data, so the example shows the
// same three levels the Figma component draws.
figma.connect(
  Breadcrumb,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2124-2',
  {
    example: () => (
      <Breadcrumb
        items={[{ label: 'Inicio', href: '#' }, { label: 'Sección', href: '#' }, { label: 'Página actual' }]}
      />
    ),
  },
)
