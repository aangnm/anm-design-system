import figma from '@figma/code-connect'
import { Timeline } from './Timeline'

figma.connect(
  Timeline,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2406-76',
  {
    example: () => (
      <Timeline
        entries={[
          { title: 'Cosecha', time: 'Hoy · 09:12', detail: '250 Tallos recolectados en Lote 07.', tone: 'success' },
          { title: 'Riego', time: 'Ayer · 18:40', detail: 'Riego programado completado, 45 min.', tone: 'info' },
          { title: 'Tratamiento', time: 'Hace 3 días', detail: 'Aplicación de fungicida en Lote 12.', tone: 'warning' },
        ]}
      />
    ),
  },
)
