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
  secondaryAction: <IconButton variant="secondary" icon={<Download />} aria-label="Exportar" />,
  primaryAction: <Button leadingIcon={<Plus />}>Añadir lote</Button>,
}

// Mirrors the Figma component: search, two active chips (Cosecha, Moderado), export, add.
export const Playground: Story = {
  args: {
    filters: [
      { id: 'cosecha', label: 'Cosecha' },
      { id: 'moderado', label: 'Moderado' },
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
      { id: 'cosecha', label: 'Cosecha' },
      { id: 'moderado', label: 'Moderado' },
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
            { key: 'lote', header: 'Lote', width: 120 },
            { key: 'actividad', header: 'Actividad' },
            { key: 'data', header: 'Data', width: 120 },
          ]}
          rows={[
            { lote: 'Lote 07', actividad: 'Cosecha', data: '250 Tallos' },
            { lote: 'Lote 12', actividad: 'Cosecha', data: '340 Tallos' },
          ]}
        />
      </div>
    )
  },
}
