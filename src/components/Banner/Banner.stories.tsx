import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banner } from './Banner'

const meta: Meta<typeof Banner> = {
  title: 'Feedback & Overlays/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: { message: 'Message for the user.' },
}
export default meta

type Story = StoryObj<typeof Banner>

export const Playground: Story = {
  args: { color: 'info' },
}

export const AllColors: Story = {
  render: () => (
    <div className="flex w-[440px] flex-col gap-8px bg-surface-page p-8">
      {(
        [
          ['info', 'Info message for the user.'],
          ['success', 'Success message for the user.'],
          ['warning', 'Warning message for the user.'],
          ['error', 'Error message for the user.'],
        ] as const
      ).map(([color, message]) => (
        <Banner key={color} color={color} message={message} onDismiss={() => {}} />
      ))}
    </div>
  ),
}

// Optional Title and Action (both off by default in Figma).
export const TitleAndAction: Story = {
  render: () => (
    <div className="flex w-[440px] flex-col gap-8px bg-surface-page p-8">
      {(['info', 'success', 'warning', 'error'] as const).map((color) => (
        <Banner
          key={color}
          color={color}
          title="Message title"
          message="Message for the user."
          action={{ label: 'Deshacer', onClick: () => {} }}
          onDismiss={() => {}}
        />
      ))}
    </div>
  ),
}

export const Dismissible: Story = {
  args: { color: 'warning', onDismiss: () => {} },
}
