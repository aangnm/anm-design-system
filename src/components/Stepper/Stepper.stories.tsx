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

// Mirrors the Figma grid: rows = Size (SM, MD, LG), columns = State. Hover and
// Focus are real pseudo-classes — hover / Tab to a button to see them. The
// "Focus + Error" column forces nothing: tab into the Error control to see the ring.
const sizes = ['sm', 'md', 'lg'] as const
const states = [
  { label: 'Default', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Error', props: { error: true } },
] as const

export const SizesAndStates: Story = {
  render: () => (
    <div className="flex flex-col gap-24px">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-24px">
          <span className="w-24px text-text-xxs font-medium leading-4 text-text-secondary">{size.toUpperCase()}</span>
          {states.map((s) => (
            <div key={s.label} className="flex flex-col gap-4px">
              <Stepper size={size} value={12} min={0} max={24} onChange={() => {}} {...s.props} />
              <span className="text-text-xxs leading-4 text-text-secondary">{s.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const AtLimits: Story = {
  render: () => (
    <div className="flex gap-16px">
      <Stepper value={0} min={0} max={24} onChange={() => {}} />
      <Stepper value={24} min={0} max={24} onChange={() => {}} />
    </div>
  ),
}
