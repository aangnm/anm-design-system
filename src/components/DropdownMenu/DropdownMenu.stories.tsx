import { useState } from 'react'
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
    <MenuItem icon={<Circle />}>Menu item</MenuItem>
    <MenuItem icon={<Circle />}>Menu item</MenuItem>
    <MenuItem icon={<Circle />} disabled>
      Menu item
    </MenuItem>
  </>
)

export const Closed: Story = {
  render: () => (
    <div className="bg-surface-page p-8">
      <DropdownMenu label="Options">{items}</DropdownMenu>
    </div>
  ),
}

export const Open: Story = {
  render: () => (
    <div className="h-[280px] bg-surface-page p-8">
      <DropdownMenu label="Options" defaultOpen>
        {items}
      </DropdownMenu>
    </div>
  ),
}

// State=Searchable: search field on top, text-only items, Limpiar at the bottom.
// Limpiar resets the query and the selection.
function SearchableExample() {
  const [selected, setSelected] = useState<string | null>(null)
  const names = ['Sales', 'Commissions', 'Subscriptions', 'Refunds']
  return (
    <div className="h-[340px] bg-surface-page p-8">
      <DropdownMenu label={selected ?? 'Options'} defaultOpen searchable onClear={() => setSelected(null)}>
        {names.map((name) => (
          <MenuItem
            key={name}
            leadingIcon={false}
            onClick={() => setSelected(name)}
            className={selected === name ? 'bg-interactive-default' : undefined}
          >
            {name}
          </MenuItem>
        ))}
      </DropdownMenu>
    </div>
  )
}

export const Searchable: Story = {
  render: () => <SearchableExample />,
}
