import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper } from './Stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Core/Stepper',
  component: Stepper,
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

type Story = StoryObj<typeof Stepper>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState(12)
    return <Stepper value={value} min={0} max={24} onChange={setValue} />
  },
}
