import type { Meta, StoryObj } from '@storybook/react-vite'
import { BenchmarkTable } from './BenchmarkTable'

const meta: Meta<typeof BenchmarkTable> = {
  title: 'Product Patterns/Benchmark Table',
  component: BenchmarkTable,
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

type Story = StoryObj<typeof BenchmarkTable>

export const Playground: Story = {
  args: {
    rows: [
      { lote: 'Lote 07', actividad: 'Cosecha', rate: 612, tier: 'moderado' },
      { lote: 'Lote 12', actividad: 'Cosecha', rate: 340, tier: 'critico' },
      { lote: 'Lote 15N', actividad: 'Cosecha', rate: 845, tier: 'saludable' },
      { lote: 'Lote 18', actividad: 'Cosecha', rate: 810, tier: 'saludable' },
    ],
  },
}
