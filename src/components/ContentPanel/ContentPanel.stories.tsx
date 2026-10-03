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
    (Story) => (
      <div className="bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ContentPanel>

const options = [
  { label: 'Día', value: 'day' },
  { label: 'Semana', value: 'week' },
  { label: 'Mes', value: 'month' },
]

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('day')
    return (
      <ContentPanel title="Índice vegetativo — histórico" controls={<SegmentedControl options={options} value={value} onChange={setValue} />}>
        <LineChart
          className="border-0 bg-transparent px-0"
          categories={['mar', 'abr', 'may', 'jun', 'jul']}
          series={[
            { label: 'NDVI', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
            { label: 'GNDVI', series: 2, data: [0.6, 0.63, 0.68, 0.64, 0.66] },
            { label: 'NDRE', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
          ]}
        />
      </ContentPanel>
    )
  },
}
