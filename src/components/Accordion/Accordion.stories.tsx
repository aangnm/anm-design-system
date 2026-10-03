import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionItem } from './Accordion'

const meta: Meta<typeof AccordionItem> = {
  title: 'Core/Accordion',
  component: AccordionItem,
  tags: ['autodocs'],
  args: { title: 'Detalles del lote' },
}
export default meta

type Story = StoryObj<typeof AccordionItem>

const body = 'Lote 07 · 4,2 ha · Cultivo: Café · Última cosecha: Semana 21.'

export const Playground: Story = {
  render: (args) => (
    <div className="w-[360px]">
      <Accordion>
        <AccordionItem {...args}>{body}</AccordionItem>
      </Accordion>
    </div>
  ),
}

// Mirrors the Figma State axis: Collapsed, Expanded.
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-32px bg-surface-page p-24px">
      <div className="w-[360px]">
        <AccordionItem title="Detalles del lote">{body}</AccordionItem>
      </div>
      <div className="w-[360px]">
        <AccordionItem title="Detalles del lote" defaultOpen>
          {body}
        </AccordionItem>
      </div>
    </div>
  ),
}

export const Stacked: Story = {
  render: () => (
    <div className="w-[360px] bg-surface-page p-24px">
      <Accordion>
        <AccordionItem title="Detalles del lote" defaultOpen>
          {body}
        </AccordionItem>
        <AccordionItem title="Riego">Goteo, dos turnos por semana.</AccordionItem>
        <AccordionItem title="Fertilización">Plan trimestral según análisis de suelo.</AccordionItem>
      </Accordion>
    </div>
  ),
}
