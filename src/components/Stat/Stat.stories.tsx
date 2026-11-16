import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat } from './Stat'

const meta: Meta<typeof Stat> = {
  title: 'Data Display/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'empty', 'loading', 'error'] },
    trend: { control: 'inline-radio', options: ['up', 'down', 'neutral'] },
  },
  args: {
    label: 'Total revenue',
    value: '$128,450',
    delta: '12.5 %',
    trend: 'up',
    deltaCaption: 'vs. last month',
    state: 'default',
  },
}
export default meta

type Story = StoryObj<typeof Stat>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[260px]">
      <Stat {...args} />
    </div>
  ),
}

// Mirrors the four-state grid on the Data Display page.
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16px bg-surface-page p-24px">
      <div className="w-[260px]">
        <Stat label="Total revenue" value="$128,450" delta="12.5 %" trend="up" deltaCaption="vs. last month" />
      </div>
      <div className="w-[260px]">
        <Stat state="empty" />
      </div>
      <div className="w-[260px]">
        <Stat state="loading" />
      </div>
      <div className="w-[260px]">
        <Stat state="error" />
      </div>
    </div>
  ),
}

export const Trends: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16px bg-surface-page p-24px">
      <div className="w-[260px]">
        <Stat label="Rendimiento" value="94 %" delta="12.5 %" trend="up" deltaCaption="vs. last month" />
      </div>
      <div className="w-[260px]">
        <Stat label="Mermas" value="3.2 %" delta="4.1 %" trend="down" deltaCaption="vs. last month" />
      </div>
      <div className="w-[260px]">
        <Stat label="Active accounts" value="18" delta="0 %" trend="neutral" deltaCaption="no change" />
      </div>
    </div>
  ),
}
