import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'
import { Tag } from '@/components/Tag'

// Sample from the Figma component set: Lote · Actividad · Estado · Data · Unidad
// (column widths 70 / 160 / 120 / 90 / 90 = 530).
const columns = [
  { key: 'lote', header: 'Lote', width: 70 },
  { key: 'actividad', header: 'Actividad', width: 160 },
  { key: 'estado', header: 'Estado', width: 120 },
  { key: 'data', header: 'Data', width: 90 },
  { key: 'unidad', header: 'Unidad', width: 90 },
]

const rows = [
  { lote: '07', actividad: 'Cosecha', estado: <Tag color="success">Activa</Tag>, data: '250', unidad: 'Tallos' },
  { lote: '12', actividad: 'Fertilización', estado: <Tag color="warning">Pendiente</Tag>, data: '—', unidad: 'Kg/Ha' },
  { lote: '15N', actividad: 'Monitoreo', estado: <Tag color="success">Activa</Tag>, data: '98', unidad: 'Plantas' },
  { lote: '18', actividad: 'Riego', estado: <Tag color="success">Activa</Tag>, data: '7,6', unidad: 'L/Ha' },
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
