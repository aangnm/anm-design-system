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
      { label: 'Lote', value: 'Lote 07' },
      { label: 'Actividad', value: 'Cosecha' },
      { label: 'Responsable', value: 'Oscar Andrade' },
      { label: 'Notas', value: 'Revisar zona norte antes de iniciar el corte — reporte de plagas Sem 21.' },
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
