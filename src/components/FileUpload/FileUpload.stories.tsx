import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileUpload } from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Core/File Upload',
  component: FileUpload,
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

type Story = StoryObj<typeof FileUpload>

export const Playground: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}
