import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContentPanel } from './ContentPanel'
import { SegmentedControl } from '@/components/SegmentedControl'
import { LineChart } from '@/components/LineChart'

const meta: Meta<typeof ContentPanel> = {
  title: 'Product Patterns/Content Panel',
  component: ContentPanel,
  tags: ['autodocs'],
  decorators: [
    // The panel fills its container; the story shows it at the Figma sample width.
    (Story) => (
      <div className="max-w-[488px] bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ContentPanel>

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('day')
    return (
      <ContentPanel title="Client rates — history" controls={<SegmentedControl options={options} value={value} onChange={setValue} />}>
        <LineChart
          className="border-0 bg-transparent px-0"
          categories={['Mar', 'Apr', 'May', 'Jun', 'Jul']}
          series={[
            { label: 'Conversion', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
            { label: 'Retention', series: 2, data: [0.6, 0.63, 0.68, 0.64, 0.66] },
            { label: 'Churn', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
          ]}
        />
      </ContentPanel>
    )
  },
}
