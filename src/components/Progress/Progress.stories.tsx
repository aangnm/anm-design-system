import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 65 },
  decorators: [
    (Story) => (
      <div className="w-[300px] bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Progress>

export const Playground: Story = {}

export const WithoutLabel: Story = {
  args: { showLabel: false },
}

export const Values: Story = {
  render: () => (
    <div className="flex flex-col gap-16px">
      {[10, 45, 65, 100].map((value) => (
        <Progress key={value} value={value} />
      ))}
    </div>
  ),
}
