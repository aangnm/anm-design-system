import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, Tab } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('overview')
    const items = [
      ['overview', 'Overview'],
      ['transactions', 'Transactions'],
      ['reports', 'Reports'],
    ]
    return (
      <div className="bg-surface-page p-24px">
        <Tabs>
          {items.map(([id, label]) => (
            <Tab key={id} active={value === id} onClick={() => setValue(id)}>
              {label}
            </Tab>
          ))}
        </Tabs>
      </div>
    )
  },
}

// Mirrors the Figma grid: State = Default / Active / Disabled / Hover. Hover is
// a real :hover in code; the fourth tab forces its text colour so the grid can
// be compared with the design side by side.
export const States: Story = {
  render: () => (
    <div className="bg-surface-page p-24px">
      <Tabs>
        <Tab>Label</Tab>
        <Tab active>Label</Tab>
        <Tab disabled>Label</Tab>
        <Tab className="[&>span:first-child]:text-text-primary">Label</Tab>
      </Tabs>
    </div>
  ),
}
