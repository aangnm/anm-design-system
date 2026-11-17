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

// Sample from the Figma component: Revenue/month per account against the 400 min /
// 800 ideal benchmarks (Critical < 400 ≤ Moderate < 800 ≤ Healthy).
export const Playground: Story = {
  args: {
    rows: [
      { label: '4021', category: 'Sales', rate: 612 },
      { label: '4035', category: 'Sales', rate: 340 },
      { label: '4102', category: 'Sales', rate: 845 },
      { label: '4118', category: 'Sales', rate: 810 },
    ],
  },
}
