import figma from '@figma/code-connect'
import { Tab } from './Tabs'

// Maps to the single-tab Figma component. The `Tabs` list container has no
// Figma counterpart — it's the wrapper a real tablist needs.
figma.connect(
  Tab,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2123-17',
  {
    props: {
      children: figma.string('Etiqueta'),
      active: figma.enum('State', { Active: true }),
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ children, active, disabled }) => (
      <Tab active={active} disabled={disabled}>
        {children}
      </Tab>
    ),
  },
)
