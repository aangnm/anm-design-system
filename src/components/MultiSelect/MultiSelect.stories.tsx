import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MultiSelect } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'Core/Multi-select',
  component: MultiSelect,
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

type Story = StoryObj<typeof MultiSelect>

const options = [
  { label: 'Cosecha', value: 'harvest' },
  { label: 'Riego', value: 'irrigation' },
  { label: 'Fertilización', value: 'fertilization' },
  { label: 'Poda', value: 'pruning' },
]

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState(['harvest', 'irrigation'])
    return <MultiSelect options={options} value={value} onChange={setValue} />
  },
}

export const Empty: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect options={options} value={value} onChange={setValue} />
  },
}
