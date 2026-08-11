import type { Meta, StoryObj } from '@storybook/react-vite'
import { Circle } from 'lucide-react'
import { DropdownMenu } from './DropdownMenu'
import { MenuItem } from '@/components/Menu'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Navigation/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof DropdownMenu>

const items = (
  <>
    <MenuItem icon={<Circle />}>Elemento del menú</MenuItem>
    <MenuItem icon={<Circle />}>Elemento del menú</MenuItem>
    <MenuItem icon={<Circle />} disabled>
      Elemento del menú
    </MenuItem>
  </>
)

export const Closed: Story = {
  render: () => (
    <div className="bg-surface-page p-8">
      <DropdownMenu label="Opciones">{items}</DropdownMenu>
    </div>
  ),
}

export const Open: Story = {
  render: () => (
    <div className="h-[280px] bg-surface-page p-8">
      <DropdownMenu label="Opciones" defaultOpen>
        {items}
      </DropdownMenu>
    </div>
  ),
}
