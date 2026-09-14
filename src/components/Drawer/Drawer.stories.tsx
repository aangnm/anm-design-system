import type { Meta, StoryObj } from '@storybook/react-vite'
import { Drawer } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: {
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
