import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetricCard } from './MetricCard'

const meta: Meta<typeof MetricCard> = {
  title: 'Product Patterns/Metric Card',
  component: MetricCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof MetricCard>

export const Playground: Story = {
  args: {
    title: 'Ingresos totales',
    context: 'Captura global · Semana 22',
    value: '$ 128.450',
    valueContext: '$ 2,5 M acumulados en el año',
    tagLabel: 'Global',
  },
}
