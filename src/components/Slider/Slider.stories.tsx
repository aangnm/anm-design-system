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
    return <Slider aria-label="Commission rate" min={0} max={100} value={value} onChange={(e) => setValue(Number(e.target.value))} />
  },
}

/** Rail outline: border/default around the rail, primary around the filled part. */
export const Values: Story = {
  render: () => (
    <div className="flex flex-col gap-16px">
      {[0, 40, 100].map((v) => (
        <Slider key={v} aria-label={`Value ${v}%`} value={v} onChange={() => {}} />
      ))}
    </div>
  ),
}
