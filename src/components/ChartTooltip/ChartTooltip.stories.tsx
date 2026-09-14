import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChartTooltip } from './ChartTooltip'

const meta: Meta<typeof ChartTooltip> = {
  title: 'Data Display/Chart Tooltip',
  component: ChartTooltip,
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

type Story = StoryObj<typeof ChartTooltip>

export const Playground: Story = {
  args: {
    heading: '17 jun',
    rows: [
      { label: 'NDVI', value: '0.86', series: 1 },
      { label: 'GNDVI', value: '0.71', series: 2 },
      { label: 'NDRE', value: '0.34', series: 3 },
    ],
  },
}
