import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Core/Spinner',
  component: Spinner,
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

type Story = StoryObj<typeof Spinner>

export const Playground: Story = {
  args: { size: 'md' },
}

// Mirrors the Figma variant row: Size = SM 16 / MD 24 / LG 32.
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-24px">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}
