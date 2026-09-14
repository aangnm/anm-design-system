import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Core/Date Picker',
  component: DatePicker,
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

type Story = StoryObj<typeof DatePicker>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState(new Date(2026, 5, 17))
    return <DatePicker value={value} onChange={setValue} defaultMonth={new Date(2026, 5, 1)} />
  },
}
