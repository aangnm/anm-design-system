import figma from '@figma/code-connect'
import { EmptyState } from './EmptyState'
import { Button } from '@/components/Button'

figma.connect(
  EmptyState,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2405-74',
  {
    example: () => (
      <EmptyState
        title="Aún no hay lotes registrados"
        description="Registra tu primer lote para empezar a monitorear cosechas y rendimiento."
        action={<Button>Añadir lote</Button>}
      />
    ),
  },
)
