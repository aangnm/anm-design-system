import figma from '@figma/code-connect'
import { Drawer } from './Drawer'

figma.connect(
  Drawer,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2230-28',
  {
    example: () => (
      <Drawer
        title="Detalle de tarea"
        items={[
          { label: 'Lote', value: 'Lote 07' },
          { label: 'Actividad', value: 'Cosecha' },
          { label: 'Responsable', value: 'Oscar Andrade' },
          { label: 'Notas', value: 'Revisar zona norte antes de iniciar el corte — reporte de plagas Sem 21.' },
        ]}
      />
    ),
  },
)
