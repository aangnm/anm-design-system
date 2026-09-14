import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
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
