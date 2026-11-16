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
        <MenuItem icon={<Circle />}>Menu item</MenuItem>
        <MenuItem icon={<Circle />}>Menu item</MenuItem>
        <MenuItem icon={<Circle />}>Menu item</MenuItem>
        <MenuItem icon={<Circle />} disabled>
          Menu item
        </MenuItem>
      </Menu>
    </div>
  ),
}

export const ItemStates: Story = {
  render: () => (
    <div role="menu" aria-label="Menu item states" className="flex flex-col gap-8px bg-surface-page p-8">
      <MenuItem icon={<Circle />}>Menu item</MenuItem>
      <MenuItem icon={<Circle />} disabled>
        Menu item
      </MenuItem>
    </div>
  ),
}

// Leading icon boolean: on by default, off for text-only lists.
export const LeadingIcon: Story = {
  render: () => (
    <div className="flex gap-24px bg-surface-page p-8">
      <Menu>
        <MenuItem>With icon</MenuItem>
        <MenuItem>With icon</MenuItem>
      </Menu>
      <Menu>
        <MenuItem leadingIcon={false}>Without icon</MenuItem>
        <MenuItem leadingIcon={false}>Without icon</MenuItem>
      </Menu>
    </div>
  ),
}
