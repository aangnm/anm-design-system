import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Drawer } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: {
    overlay: false,
    title: 'Detalle de tarea',
    items: [
      { label: 'Cuenta', value: 'Cuenta 4021' },
      { label: 'Categoría', value: 'Ventas' },
      { label: 'Responsable', value: 'Elainy Romero' },
      { label: 'Notas', value: 'Revisar la conciliación antes del cierre — diferencia reportada en Sem 21.' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Drawer>

export const Playground: Story = {}

// "Drawer over scrim": docked right above the Scrim; click the scrim to close.
export const OverScrim: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true)
    return (
      <div className="relative h-[640px] overflow-hidden bg-surface-page [transform:translateZ(0)]">
        <div className="p-24px">
          <button type="button" className="text-sm text-text-primary underline" onClick={() => setOpen(true)}>
            Abrir drawer
          </button>
        </div>
        {open ? <Drawer {...args} overlay onClose={() => setOpen(false)} onCancel={() => setOpen(false)} /> : null}
      </div>
    )
  },
}
