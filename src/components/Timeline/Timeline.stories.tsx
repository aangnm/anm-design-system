import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from './Timeline'

const entries = [
  { title: 'Pago recibido', time: 'Hoy · 09:12', detail: '$ 250 acreditados en la cuenta 4021.', tone: 'success' as const },
  { title: 'Conciliación', time: 'Ayer · 18:40', detail: 'Conciliación programada completada, 45 min.', tone: 'info' as const },
  { title: 'Transferencia', time: 'Hace 3 días', detail: 'Transferencia internacional enviada desde la cuenta 4035.', tone: 'warning' as const },
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

// Mirrors the Figma component: pago recibido (success), conciliación (info), transferencia (warning).
export const Playground: Story = {
  args: { entries },
}

export const SingleEntry: Story = {
  args: { entries: entries.slice(0, 1) },
}
