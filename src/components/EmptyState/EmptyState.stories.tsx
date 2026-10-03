import type { Meta, StoryObj } from '@storybook/react-vite'
import { MapPin } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from '@/components/Button'

const meta: Meta<typeof EmptyState> = {
  title: 'Product Patterns/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[480px] bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof EmptyState>

// Mirrors the Figma component (480 x 320): icon badge, heading, guidance, one action.
export const Playground: Story = {
  args: {
    title: 'Aún no hay lotes registrados',
    description: 'Registra tu primer lote para empezar a monitorear cosechas y rendimiento.',
    action: <Button>Añadir lote</Button>,
  },
}

export const CustomIcon: Story = {
  args: {
    icon: <MapPin />,
    title: 'Aún no hay zonas definidas',
    description: 'Dibuja la primera zona de la hacienda para asignarle lotes.',
    action: <Button>Añadir zona</Button>,
  },
}

export const WithoutAction: Story = {
  args: {
    title: 'Sin resultados',
    description: 'Prueba con otro lote o quita algún filtro.',
  },
}
