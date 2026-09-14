import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Core/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Escribe una nota…' },
  decorators: [
    (Story) => (
      <div className="w-[280px] bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Textarea>

export const Playground: Story = {}

export const Error: Story = {
  args: { error: true, defaultValue: 'Escribe una nota…' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
