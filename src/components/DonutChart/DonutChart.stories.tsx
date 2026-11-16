import type { Meta, StoryObj } from '@storybook/react-vite'
import { DonutChart } from './DonutChart'

const meta: Meta<typeof DonutChart> = {
  title: 'Data Display/Donut Chart',
  component: DonutChart,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="bg-surface-page p-8"><Story /></div>],
  args: {
    unit: 'USD',
    parts: [
      { label: 'Cuenta 4021', series: 1, value: 520 },
      { label: 'Cuenta 4035', series: 2, value: 380 },
      { label: 'Cuenta 4102', series: 3, value: 250 },
      { label: 'Cuenta 4118', series: 4, value: 134 },
    ],
  },
}
export default meta
type Story = StoryObj<typeof DonutChart>

export const Playground: Story = {}
export const WithoutCenterLabel: Story = { args: { centerLabel: false } }
