import figma from '@figma/code-connect'
import { Link } from './Link'

figma.connect(
  Link,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2399-114',
  {
    props: {
      children: figma.string('Etiqueta'),
      external: figma.boolean('External'),
    },
    example: ({ children, external }) => (
      <Link href="#" external={external}>
        {children}
      </Link>
    ),
  },
)
