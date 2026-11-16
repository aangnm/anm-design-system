import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'
import { Tag } from '@/components/Tag'

// Sample from the Figma component set: Account · Category · Status · Amount · Currency
// (column widths 70 / 160 / 120 / 90 / 90 = 530).
const columns = [
  { key: 'account', header: 'Account', width: 70 },
  { key: 'category', header: 'Category', width: 160 },
  { key: 'status', header: 'Status', width: 120 },
  { key: 'amount', header: 'Amount', width: 90 },
  { key: 'currency', header: 'Currency', width: 90 },
]

const rows = [
  { account: '4021', category: 'Sales', status: <Tag color="success">Active</Tag>, amount: '250', currency: 'USD' },
  { account: '4035', category: 'Subscriptions', status: <Tag color="warning">Pending</Tag>, amount: '—', currency: 'USD' },
  { account: '4102', category: 'Refunds', status: <Tag color="success">Active</Tag>, amount: '98', currency: 'EUR' },
  { account: '4118', category: 'Commissions', status: <Tag color="success">Active</Tag>, amount: '76', currency: 'USD' },
]

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'empty', 'loading', 'error'] },
  },
  args: { columns, rows, state: 'default' },
}
export default meta

type Story = StoryObj<typeof Table>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[530px]">
      <Table {...args} />
    </div>
  ),
}

// Mirrors the four-state grid on the Data Display page (State = Default / Empty / Loading / Error).
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-16px bg-surface-page p-24px">
      <div className="w-[530px]">
        <Table aria-label="Accounts" columns={columns} rows={rows} />
      </div>
      <div className="w-[530px]">
        <Table aria-label="Accounts, empty" columns={columns} state="empty" />
      </div>
      <div className="w-[530px]">
        <Table aria-label="Accounts, loading" columns={columns} state="loading" loadingRows={4} />
      </div>
      <div className="w-[530px]">
        <Table aria-label="Accounts, error" columns={columns} state="error" />
      </div>
    </div>
  ),
}

// `bordered={false}`: no card chrome, for a table inside a container that owns it (Content Panel).
export const Borderless: Story = {
  render: () => (
    <div className="w-[530px] rounded-lg border border-border-subtle bg-surface-container p-16px">
      <Table columns={columns} rows={rows} bordered={false} />
    </div>
  ),
}
