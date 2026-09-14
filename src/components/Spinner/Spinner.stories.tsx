import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Core/Spinner',
  component: Spinner,
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

type Story = StoryObj<typeof Spinner>

export const Playground: Story = {
  args: { size: 'md' },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-16px">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}
