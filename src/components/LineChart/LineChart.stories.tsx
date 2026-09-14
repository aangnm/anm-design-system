import type { Meta, StoryObj } from '@storybook/react-vite'
import { LineChart } from './LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Data Display/Line Chart',
  component: LineChart,
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

type Story = StoryObj<typeof LineChart>

export const Playground: Story = {
  args: {
    categories: ['mar', 'abr', 'may', 'jun', 'jul'],
    series: [
      { label: 'NDVI', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
      { label: 'GNDVI', series: 2, data: [0.6, 0.63, 0.68, 0.64, 0.66] },
      { label: 'NDRE', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
    ],
  },
}
