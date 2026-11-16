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
    title: 'Aún no hay cuentas registradas',
    description: 'Registra tu primera cuenta para empezar a seguir ingresos y rendimiento.',
    action: <Button>Añadir cuenta</Button>,
  },
}

export const CustomIcon: Story = {
  args: {
    icon: <MapPin />,
    title: 'Aún no hay reportes guardados',
    description: 'Guarda tu primer reporte para compartirlo con el equipo.',
    action: <Button>Añadir zona</Button>,
  },
}

export const WithoutAction: Story = {
  args: {
    title: 'Sin resultados',
    description: 'Prueba con otra cuenta o quita algún filtro.',
  },
}
