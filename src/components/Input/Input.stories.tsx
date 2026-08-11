import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Core/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    placeholder: 'Placeholder',
  },
}
export default meta

type Story = StoryObj<typeof Input>

export const Playground: Story = {
  args: { size: 'md' },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8 w-[320px]">
      <Input size="sm" placeholder="Placeholder" />
      <Input size="md" placeholder="Placeholder" />
      <Input size="lg" placeholder="Placeholder" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8 w-[320px]">
      <Input placeholder="Placeholder" />
      <Input placeholder="Escribiendo…" autoFocus />
      <Input placeholder="Placeholder" disabled />
      <Input placeholder="Placeholder" error />
      <Input placeholder="Placeholder" leadingIcon={<Search />} />
    </div>
  ),
}
