import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Core/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: '3' },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Playground: Story = {
  args: { color: 'neutral' },
}

export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-8px bg-surface-page p-8">
      {(['neutral', 'success', 'warning', 'error', 'info'] as const).map((color) => (
        <Badge key={color} color={color}>
          3
        </Badge>
      ))}
    </div>
  ),
}
