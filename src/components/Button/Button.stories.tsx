import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    children: 'Button',
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: { variant: 'primary', size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 bg-surface-page p-8">
      {(['primary', 'secondary', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4 bg-surface-page p-8">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button leadingIcon={<Plus className="size-4" />}>With icon</Button>
    </div>
  ),
}
