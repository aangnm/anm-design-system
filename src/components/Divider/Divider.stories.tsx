import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Core/Divider',
  component: Divider,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div className="w-[240px] bg-surface-page p-8">
      <Divider />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-[120px] bg-surface-page p-8">
      <Divider orientation="vertical" />
    </div>
  ),
}
