import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Core/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Playground: Story = {
  args: { shape: 'line' },
}

// Mirrors the Figma variant row: Shape = Line (200 x 12) / Block (200 x 64) / Circle (40).
export const AllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-24px">
      <Skeleton shape="line" />
      <Skeleton shape="block" />
      <Skeleton shape="circle" />
    </div>
  ),
}
