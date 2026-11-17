import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'
import { Tag } from '@/components/Tag'
import { DataTable, type DataTableColumn } from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/Data Table',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DataTable>

type Row = { account: string; category: string; status: string; amount: number; currency: string; date: string }
const categories = ['Sales', 'Subscriptions', 'Refunds', 'Commissions']
const statuses = ['Active', 'Pending', 'Blocked']
const rows: Row[] = Array.from({ length: 26 }, (_, i) => ({
  account: String(4021 + i * 7),
  category: categories[i % 4],
  status: statuses[(i * 5) % 7 === 0 ? 2 : i % 3 === 0 ? 1 : 0],
  amount: Math.round(((i * 37) % 97) * 12.5 + 40),
  currency: i % 5 === 0 ? 'EUR' : 'USD',
  date: `2026-05-${String(27 - (i % 27)).padStart(2, '0')}`,
}))
const tone = { Active: 'success', Pending: 'warning', Blocked: 'error' } as const

const columns: DataTableColumn<Row>[] = [
  { key: 'account', header: 'Account', sortable: true, hideable: false, width: 100 },
  { key: 'category', header: 'Category', sortable: true, facet: true },
  { key: 'status', header: 'Status', facet: true, cell: (r) => <Tag color={tone[r.status as keyof typeof tone]}>{r.status}</Tag> },
  { key: 'amount', header: 'Amount', sortable: true, align: 'right', cell: (r) => `$${r.amount.toLocaleString('en-US')}` },
  { key: 'currency', header: 'Currency', facet: true },
  { key: 'date', header: 'Date', sortable: true },
]

export const Playground: Story = {
  render: () => (
    <DataTable<Row>
      label="Recent transactions"
      columns={columns}
      data={rows}
      getRowId={(r) => r.account}
      selectable
      pageSize={8}
      searchPlaceholder="Search transactions…"
      actions={
        <>
          <IconButton variant="secondary" size="sm" icon={<Download />} aria-label="Export" />
          <Button size="sm">New record</Button>
        </>
      }
    />
  ),
}

/** Opens a faceted filter and sorts by amount — checked in CI with axe in every theme. */
export const FilteredAndSorted: Story = {
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /^Status/ }))
    await userEvent.click(await canvas.findByRole('checkbox', { name: /Pending/ }))
    await userEvent.click(canvas.getByRole('button', { name: /Amount/ }))
    await expect(canvas.getByRole('columnheader', { name: /Amount/ })).toHaveAttribute('aria-sort', 'ascending')
    await expect(canvas.getByText(/filtered from 26/)).toBeInTheDocument()
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-32px">
      <DataTable<Row> label="Transactions, loading" columns={columns} data={[]} state="loading" />
      <DataTable<Row> label="Transactions, empty" columns={columns} data={[]} />
      <DataTable<Row> label="Transactions, error" columns={columns} data={[]} state="error" />
    </div>
  ),
}
