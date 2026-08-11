import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { initials: 'IK' },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  args: { size: 'md', status: 'none' },
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-24px bg-surface-page p-8">
      {(['sm', 'md', 'lg'] as const).map((size) =>
        (['none', 'online', 'offline'] as const).map((status) => (
          <Avatar key={`${size}-${status}`} initials="IK" size={size} status={status} />
        )),
      )}
    </div>
  ),
}
