import figma from '@figma/code-connect'
import { Accordion, AccordionItem } from './Accordion'

figma.connect(
  AccordionItem,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2403-124',
  {
    props: {
      title: figma.string('Título'),
      defaultOpen: figma.enum('State', { Expanded: true, Collapsed: false }),
    },
    example: ({ title, defaultOpen }) => (
      <Accordion>
        <AccordionItem title={title} defaultOpen={defaultOpen}>
          Lote 07 · 4,2 ha · Cultivo: Café · Última cosecha: Semana 21.
        </AccordionItem>
      </Accordion>
    ),
  },
)
