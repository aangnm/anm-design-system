import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sparkline } from './Sparkline'

const meta: Meta<typeof Sparkline> = {
  title: 'Data Display/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  args: { data: [4, 6, 5, 8, 7, 9, 6, 10, 12] },
}
export default meta

type Story = StoryObj<typeof Sparkline>

export const Playground: Story = {
  render: (args) => (
    <div className="bg-surface-page p-24px">
      <Sparkline {...args} />
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="flex w-[260px] flex-col gap-6px rounded-lg border border-border-subtle bg-surface-container p-20px">
      <span className="text-text-xxs font-medium leading-4 text-text-secondary">Weekly revenue</span>
      <span className="text-2xl font-semibold leading-8 text-text-primary">$128,450</span>
      <Sparkline data={[4, 6, 5, 8, 7, 9, 6, 10, 12]} className="mt-6px text-semantic-success" />
    </div>
  ),
}
