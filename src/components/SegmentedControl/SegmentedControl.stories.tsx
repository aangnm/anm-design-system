import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SegmentedControl } from './SegmentedControl'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Core/Segmented Control',
  component: SegmentedControl,
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

type Story = StoryObj<typeof SegmentedControl>

const options = [
  { label: 'Día', value: 'day' },
  { label: 'Semana', value: 'week' },
  { label: 'Mes', value: 'month' },
]

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('day')
    return <SegmentedControl options={options} value={value} onChange={setValue} />
  },
}

export const AllActive: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-16px">
      {options.map((option) => (
        <SegmentedControl key={option.value} options={options} value={option.value} onChange={() => {}} />
      ))}
    </div>
  ),
}
