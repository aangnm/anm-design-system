import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart } from './BarChart'

const data = [
  { label: 'S1', value: 63 },
  { label: 'S2', value: 95 },
  { label: 'S3', value: 73 },
  { label: 'S4', value: 118 },
  { label: 'S5', value: 104 },
  { label: 'S6', value: 134 },
]

const meta: Meta<typeof BarChart> = {
  title: 'Data Display/Bar Chart',
  component: BarChart,
  tags: ['autodocs'],
  args: { data },
}
export default meta

type Story = StoryObj<typeof BarChart>

export const Playground: Story = {
  render: (args) => (
    <div className="bg-surface-page p-24px">
      <BarChart {...args} />
    </div>
  ),
}
