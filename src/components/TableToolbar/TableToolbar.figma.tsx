import figma from '@figma/code-connect'
import { Download } from 'lucide-react'
import { TableToolbar } from './TableToolbar'
import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'

// The Figma component has no variant props — it is one fixed composition (search,
// two chips, export, add). In code the chips are data and the actions are slots.
figma.connect(
  TableToolbar,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2404-72',
  {
    example: () => (
      <TableToolbar
        searchPlaceholder="Buscar lote…"
        filters={[
          { id: 'cosecha', label: 'Cosecha' },
          { id: 'moderado', label: 'Moderado' },
        ]}
        onRemoveFilter={() => {}}
        secondaryAction={<IconButton variant="secondary" icon={<Download />} aria-label="Exportar" />}
        primaryAction={<Button>Añadir lote</Button>}
      />
    ),
  },
)
