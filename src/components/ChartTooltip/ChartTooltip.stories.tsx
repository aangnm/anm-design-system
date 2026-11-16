import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChartTooltip } from './ChartTooltip'

const rows = [
  { label: 'Conversion', value: '0.86', series: 1 as const },
  { label: 'Retention', value: '0.71', series: 2 as const },
  { label: 'Churn', value: '0.34', series: 3 as const },
]

const meta: Meta<typeof ChartTooltip> = {
  title: 'Data Display/Chart Tooltip',
  component: ChartTooltip,
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

type Story = StoryObj<typeof ChartTooltip>

// Mirrors the single Chart Tooltip component on the Data Display page
// (header + one row per series).
export const Playground: Story = {
  args: { heading: 'Jun 17', rows },
}

export const OneSeries: Story = {
  args: { heading: 'Jun 17', rows: rows.slice(0, 1) },
}
