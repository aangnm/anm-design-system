import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Core/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[280px] bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Slider>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState(40)
    return <Slider min={0} max={100} value={value} onChange={(e) => setValue(Number(e.target.value))} />
  },
}
