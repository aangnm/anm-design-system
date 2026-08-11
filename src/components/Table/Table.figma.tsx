import figma from '@figma/code-connect'
import { Table } from './Table'
import { Tag } from '@/components/Tag'

figma.connect(
  Table,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2221-5436',
  {
    props: {
      state: figma.enum('State', {
        Default: 'default',
        Empty: 'empty',
        Loading: 'loading',
        Error: 'error',
      }),
    },
    example: ({ state }) => (
      <Table
        state={state}
        columns={[
          { key: 'lote', header: 'Lote', width: 70 },
          { key: 'actividad', header: 'Actividad', width: 160 },
          { key: 'estado', header: 'Estado', width: 120 },
          { key: 'valor', header: 'Valor', width: 90 },
        ]}
        rows={[
          { lote: '07', actividad: 'Cosecha', estado: <Tag color="success">Activa</Tag>, valor: '1,284 t' },
          { lote: '12', actividad: 'Fertilización', estado: <Tag color="warning">Pendiente</Tag>, valor: '—' },
          { lote: '15N', actividad: 'Monitoreo', estado: <Tag color="success">Activa</Tag>, valor: '98 pts' },
        ]}
      />
    ),
  },
)
