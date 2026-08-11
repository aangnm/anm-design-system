import figma from '@figma/code-connect'
import { List } from './List'

figma.connect(
  List,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2221-5289',
  {
    props: {
      state: figma.enum('State', {
        Default: 'default',
        Empty: 'empty',
        Loading: 'loading',
        Error: 'error',
      }),
    },
    example: ({ state }) => (
      <List
        state={state}
        items={[
          { title: 'Lote 07', subtitle: 'Cosecha · Sem 22', value: '1,284 t' },
          { title: 'Lote 12', subtitle: 'Fertilización · Sem 21', value: '—' },
          { title: 'Lote 15N', subtitle: 'Monitoreo · Sem 22', value: '98 pts' },
        ]}
      />
    ),
  },
)
