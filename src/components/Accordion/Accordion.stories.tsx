import type { Meta, StoryObj } from '@storybook/react-vite'
import { Wallet } from 'lucide-react'
import { Accordion, AccordionItem } from './Accordion'

const meta: Meta<typeof AccordionItem> = {
  title: 'Core/Accordion',
  component: AccordionItem,
  tags: ['autodocs'],
  args: { title: 'Detalles de la cuenta' },
}
export default meta

type Story = StoryObj<typeof AccordionItem>

const body = 'Cuenta 4021 · Ahorros · Moneda: USD · Último movimiento: Semana 21.'

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
        <AccordionItem title="Detalles de la cuenta">{body}</AccordionItem>
      </div>
      <div className="w-[360px]">
        <AccordionItem title="Detalles de la cuenta" defaultOpen>
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
        <AccordionItem title="Detalles de la cuenta" defaultOpen>
          {body}
        </AccordionItem>
        <AccordionItem title="Comisiones">Tarifa plana del 1,2 % por transacción.</AccordionItem>
        <AccordionItem title="Conciliación">Automática cada noche, con revisión manual los viernes.</AccordionItem>
      </Accordion>
    </div>
  ),
}

// Size=LG (touch) with the Leading icon and Show count slots.
export const SizeLG: Story = {
  render: () => (
    <div className="w-[358px]">
      <Accordion>
        <AccordionItem size="lg" title="Cuentas" icon={<Wallet />} count={3} defaultOpen>
          {body}
        </AccordionItem>
        <AccordionItem size="lg" title="Tarjetas" icon={<Wallet />} count={1}>
          {body}
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
