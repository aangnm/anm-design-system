import type { Meta, StoryObj } from '@storybook/react-vite'
import { BenchmarkTable } from './BenchmarkTable'

const meta: Meta<typeof BenchmarkTable> = {
  title: 'Product Patterns/Benchmark Table',
  component: BenchmarkTable,
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

type Story = StoryObj<typeof BenchmarkTable>

// Sample from the Figma component: Ingresos/mes per account against the 400 min /
// 800 ideal benchmarks (Crítico < 400 ≤ Moderado < 800 ≤ Saludable).
export const Playground: Story = {
  args: {
    rows: [
      { label: '4021', category: 'Ventas', rate: 612 },
      { label: '4035', category: 'Ventas', rate: 340 },
      { label: '4102', category: 'Ventas', rate: 845 },
      { label: '4118', category: 'Ventas', rate: 810 },
    ],
  },
}
