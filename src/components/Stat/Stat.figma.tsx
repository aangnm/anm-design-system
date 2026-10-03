import figma from '@figma/code-connect'
import { Stat } from './Stat'

figma.connect(
  Stat,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2221-40',
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
      <Stat
        state={state}
        label="Producción total"
        value="1.284 Tallos"
        delta="12,5 %"
        trend="up"
        deltaCaption="vs. mes anterior"
      />
    ),
  },
)
