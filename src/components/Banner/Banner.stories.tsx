import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banner } from './Banner'

const meta: Meta<typeof Banner> = {
  title: 'Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: { message: 'Mensaje para el usuario.' },
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
          ['info', 'Mensaje de info para el usuario.'],
          ['success', 'Mensaje de success para el usuario.'],
          ['warning', 'Mensaje de warning para el usuario.'],
          ['error', 'Mensaje de error para el usuario.'],
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
          title="Título del mensaje"
          message="Mensaje para el usuario."
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
