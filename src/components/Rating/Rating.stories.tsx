import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rating } from './Rating'

const meta: Meta<typeof Rating> = {
  title: 'Core/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: { severity: { control: 'inline-radio', options: ['critical', 'moderate', 'healthy'] } },
  args: { severity: 'moderate' },
}
export default meta

type Story = StoryObj<typeof Rating>

export const Playground: Story = {}

// Mirrors the Figma Severity axis.
export const Severities: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-24px">
      <Rating severity="critical" />
      <Rating severity="moderate" />
      <Rating severity="healthy" />
    </div>
  ),
}
