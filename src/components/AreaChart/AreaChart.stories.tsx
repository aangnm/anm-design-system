import type { Meta, StoryObj } from '@storybook/react-vite'
import { AreaChart } from './AreaChart'

const meta: Meta<typeof AreaChart> = {
  title: 'Data Display/Area Chart',
  component: AreaChart,
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

type Story = StoryObj<typeof AreaChart>

export const Playground: Story = {
  args: {
    categories: ['mar', 'abr', 'may', 'jun', 'jul'],
    series: [
      { label: 'Conversión', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
      { label: 'Abandono', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
    ],
  },
}
