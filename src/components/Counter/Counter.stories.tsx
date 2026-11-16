import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Counter } from './Counter'

const meta: Meta<typeof Counter> = {
  title: 'Core/Counter',
  component: Counter,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[358px] bg-surface-page p-8"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Counter>

export const Playground: Story = {
  render: () => {
    const [v, setV] = useState(12)
    return <Counter value={v} onChange={setV} max={99} />
  },
}

// Mirrors the Figma variants: Default / Disabled / Error. Focus: Tab into the field.
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16px">
      <Counter value={12} onChange={() => {}} />
      <Counter value={12} onChange={() => {}} disabled />
      <Counter value={12} onChange={() => {}} error />
    </div>
  ),
}
