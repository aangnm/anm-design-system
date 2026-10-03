import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    overlay: false,
    title: 'Confirmar acción',
    children: '¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer.',
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

type Story = StoryObj<typeof Modal>

export const Playground: Story = {}

export const Destructive: Story = {
  args: {
    type: 'destructive',
    title: 'Eliminar registro',
    children: 'Esta acción eliminará el registro de forma permanente y no se puede deshacer.',
  },
}

// "Modal over scrim": the dialog on surface/scrim at opacity/scrim. The wrapper's
// transform contains the fixed layers inside the preview; clicking the scrim closes.
export const OverScrim: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true)
    return (
      <div className="relative h-[420px] overflow-hidden bg-surface-page [transform:translateZ(0)]">
        <div className="p-24px">
          <button type="button" className="text-sm text-text-primary underline" onClick={() => setOpen(true)}>
            Abrir modal
          </button>
        </div>
        {open ? <Modal {...args} overlay onClose={() => setOpen(false)} onCancel={() => setOpen(false)} /> : null}
      </div>
    )
  },
}

export const DestructiveOverScrim: Story = {
  args: {
    type: 'destructive',
    title: 'Eliminar registro',
    children: 'Esta acción eliminará el registro de forma permanente y no se puede deshacer.',
  },
  render: OverScrim.render,
}
