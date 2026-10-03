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

// Sample from the Figma component: Tallos/ha·mes against the 400 min / 800 ideal
// benchmarks (Crítico < 400 ≤ Moderado < 800 ≤ Saludable).
export const Playground: Story = {
  args: {
    rows: [
      { lote: 'Lote 07', actividad: 'Cosecha', rate: 612 },
      { lote: 'Lote 12', actividad: 'Cosecha', rate: 340 },
      { lote: 'Lote 15N', actividad: 'Cosecha', rate: 845 },
      { lote: 'Lote 18', actividad: 'Cosecha', rate: 810 },
    ],
  },
}
