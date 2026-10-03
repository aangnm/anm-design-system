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

// Figma State=Hover / Focus are pointer / keyboard states of a day: hover a day
// or Tab into the grid to see the outline and the 2px ring.
export const States: Story = {
  render: () => {
    const [value, setValue] = useState(new Date(2026, 5, 17))
    return (
      <div className="flex flex-wrap items-start gap-24px">
        <div className="flex flex-col gap-8px">
          <span className="text-text-xxs font-medium leading-4 text-text-secondary">Default / Hover / Focus</span>
          <DatePicker value={value} onChange={setValue} defaultMonth={new Date(2026, 5, 1)} />
        </div>
        <div className="flex flex-col gap-8px">
          <span className="text-text-xxs font-medium leading-4 text-text-secondary">Disabled — disableFuture</span>
          <DatePicker value={value} onChange={setValue} defaultMonth={new Date()} disableFuture />
        </div>
        <div className="flex flex-col gap-8px">
          <span className="text-text-xxs font-medium leading-4 text-text-secondary">Disabled — isDateDisabled (weekends)</span>
          <DatePicker
            value={value}
            onChange={setValue}
            defaultMonth={new Date(2026, 5, 1)}
            isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
          />
        </div>
      </div>
    )
  },
}
