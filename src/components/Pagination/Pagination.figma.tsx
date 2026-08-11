import figma from '@figma/code-connect'
import { Pagination } from './Pagination'

figma.connect(
  Pagination,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2124-10',
  {
    example: () => <Pagination page={1} pageCount={5} />,
  },
)
