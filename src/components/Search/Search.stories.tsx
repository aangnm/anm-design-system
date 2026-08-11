import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from './Search'

const meta: Meta<typeof Search> = {
  title: 'Core/Search',
  component: Search,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Search>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Search {...args} />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8 w-[280px]">
      <Search />
      <Search autoFocus defaultValue="Buscar…" />
      <Search disabled />
    </div>
  ),
}
