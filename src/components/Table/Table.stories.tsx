import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'
import { Tag } from '@/components/Tag'

// Sample from the Figma component set: Cuenta · Categoría · Estado · Monto · Moneda
// (column widths 70 / 160 / 120 / 90 / 90 = 530).
const columns = [
  { key: 'cuenta', header: 'Cuenta', width: 70 },
  { key: 'categoria', header: 'Categoría', width: 160 },
  { key: 'estado', header: 'Estado', width: 120 },
  { key: 'data', header: 'Monto', width: 90 },
  { key: 'unidad', header: 'Moneda', width: 90 },
]

const rows = [
  { cuenta: '4021', categoria: 'Ventas', estado: <Tag color="success">Activa</Tag>, data: '250', unidad: 'USD' },
  { cuenta: '4035', categoria: 'Suscripciones', estado: <Tag color="warning">Pendiente</Tag>, data: '—', unidad: 'USD' },
  { cuenta: '4102', categoria: 'Reembolsos', estado: <Tag color="success">Activa</Tag>, data: '98', unidad: 'EUR' },
  { cuenta: '4118', categoria: 'Comisiones', estado: <Tag color="success">Activa</Tag>, data: '76', unidad: 'USD' },
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
        <Table columns={columns} rows={rows} />
      </div>
      <div className="w-[530px]">
        <Table columns={columns} state="empty" />
      </div>
      <div className="w-[530px]">
        <Table columns={columns} state="loading" loadingRows={4} />
      </div>
      <div className="w-[530px]">
        <Table columns={columns} state="error" />
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
