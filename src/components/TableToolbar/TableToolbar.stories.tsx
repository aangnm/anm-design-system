import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download, Plus } from 'lucide-react'
import { TableToolbar } from './TableToolbar'
import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'
import { Table } from '@/components/Table'

const meta: Meta<typeof TableToolbar> = {
  title: 'Product Patterns/Table Toolbar',
  component: TableToolbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[640px] bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof TableToolbar>

const actions = {
  secondaryAction: <IconButton variant="secondary" icon={<Download />} aria-label="Export" />,
  primaryAction: <Button leadingIcon={<Plus />}>Add account</Button>,
}

// Mirrors the Figma component: search, two active chips (Ventas, Moderado), export, add.
export const Playground: Story = {
  args: {
    filters: [
      { id: 'sales', label: 'Sales' },
      { id: 'moderado', label: 'Moderate' },
    ],
    ...actions,
  },
}

export const NoFilters: Story = {
  args: { ...actions },
}

// Wired up above a Table: removing a chip drops the filter.
export const AboveTable: Story = {
  render: () => {
    const [filters, setFilters] = useState([
      { id: 'sales', label: 'Sales' },
      { id: 'moderado', label: 'Moderate' },
    ])
    return (
      <div className="flex flex-col gap-12px">
        <TableToolbar
          filters={filters}
          onRemoveFilter={(id) => setFilters((f) => f.filter((x) => x.id !== id))}
          {...actions}
        />
        <Table
          columns={[
            { key: 'account', header: 'Account', width: 120 },
            { key: 'categoria', header: 'Category' },
            { key: 'data', header: 'Amount', width: 120 },
          ]}
          rows={[
            { cuenta: 'Account 4021', categoria: 'Sales', data: '$250' },
            { cuenta: 'Account 4035', categoria: 'Sales', data: '$340' },
          ]}
        />
      </div>
    )
  },
}
