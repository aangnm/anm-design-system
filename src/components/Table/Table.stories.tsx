import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'
import { Tag } from '@/components/Tag'

const columns = [
  { key: 'lote', header: 'Lote', width: 70 },
  { key: 'actividad', header: 'Actividad', width: 160 },
  { key: 'estado', header: 'Estado', width: 120 },
  { key: 'valor', header: 'Valor', width: 90 },
]

const rows = [
  { lote: '07', actividad: 'Cosecha', estado: <Tag color="success">Activa</Tag>, valor: '1,284 t' },
  { lote: '12', actividad: 'Fertilización', estado: <Tag color="warning">Pendiente</Tag>, valor: '—' },
  { lote: '15N', actividad: 'Monitoreo', estado: <Tag color="success">Activa</Tag>, valor: '98 pts' },
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
    <div className="w-[440px]">
      <Table {...args} />
    </div>
  ),
}

// Mirrors the four-state grid on the Data Display page.
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-16px bg-surface-page p-24px">
      <div className="w-[440px]">
        <Table columns={columns} rows={rows} />
      </div>
      <div className="w-[440px]">
        <Table columns={columns} state="empty" />
      </div>
      <div className="w-[440px]">
        <Table columns={columns} state="loading" />
      </div>
      <div className="w-[440px]">
        <Table columns={columns} state="error" />
      </div>
    </div>
  ),
}
