import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { title: 'Saved', description: 'Your changes were saved.' },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: { color: 'success', onDismiss: () => {} },
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8px">
      <Toast color="success" title="Saved" description="Your changes were saved." onDismiss={() => {}} />
      <Toast color="info" title="Information" description="An update is available." onDismiss={() => {}} />
      <Toast color="warning" title="Warning" description="Check the fields before continuing." onDismiss={() => {}} />
      <Toast color="error" title="Error" description="Couldn’t save the change." onDismiss={() => {}} />
    </div>
  ),
}
