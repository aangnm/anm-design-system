import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover } from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    title: 'Popover title',
    children: 'Content with contextual information and optional actions.',
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Popover>

export const Playground: Story = {}
