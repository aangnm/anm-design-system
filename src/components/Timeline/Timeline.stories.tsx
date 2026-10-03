import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from './Timeline'

const entries = [
  { title: 'Cosecha', time: 'Hoy · 09:12', detail: '250 Tallos recolectados en Lote 07.', tone: 'success' as const },
  { title: 'Riego', time: 'Ayer · 18:40', detail: 'Riego programado completado, 45 min.', tone: 'info' as const },
  { title: 'Tratamiento', time: 'Hace 3 días', detail: 'Aplicación de fungicida en Lote 12.', tone: 'warning' as const },
]

const meta: Meta<typeof Timeline> = {
  title: 'Product Patterns/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Timeline>

// Mirrors the Figma component: cosecha (success), riego (info), tratamiento (warning).
export const Playground: Story = {
  args: { entries },
}

export const SingleEntry: Story = {
  args: { entries: entries.slice(0, 1) },
}
