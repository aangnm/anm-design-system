import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell } from 'lucide-react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Core/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: <Bell />, 'aria-label': 'Notificaciones' },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof IconButton>

export const Playground: Story = {
  args: { variant: 'primary', size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16px">
      {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-8px">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <IconButton key={size} variant={variant} size={size} icon={<Bell />} aria-label="Notificaciones" />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}
