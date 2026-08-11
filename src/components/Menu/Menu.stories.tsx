import type { Meta, StoryObj } from '@storybook/react-vite'
import { Circle } from 'lucide-react'
import { Menu, MenuItem } from './Menu'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Menu>

export const Playground: Story = {
  render: () => (
    <div className="bg-surface-page p-8">
      <Menu>
        <MenuItem icon={<Circle />}>Elemento del menú</MenuItem>
        <MenuItem icon={<Circle />}>Elemento del menú</MenuItem>
        <MenuItem icon={<Circle />}>Elemento del menú</MenuItem>
        <MenuItem icon={<Circle />} disabled>
          Elemento del menú
        </MenuItem>
      </Menu>
    </div>
  ),
}

export const ItemStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8px bg-surface-page p-8">
      <MenuItem icon={<Circle />}>Elemento del menú</MenuItem>
      <MenuItem icon={<Circle />} disabled>
        Elemento del menú
      </MenuItem>
    </div>
  ),
}
