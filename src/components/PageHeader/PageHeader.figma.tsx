import figma from '@figma/code-connect'
import { Bell } from 'lucide-react'
import { PageHeader } from './PageHeader'
import { IconButton } from '@/components/IconButton'
import { Button } from '@/components/Button'

figma.connect(
  PageHeader,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2341-59',
  {
    example: () => (
      <PageHeader
        title="Radiometría"
        subtitle="Hacienda Santa Clara · 61,91 ha · Semana 22"
        actions={
          <>
            <IconButton variant="secondary" icon={<Bell />} aria-label="Notificaciones" />
            <Button variant="primary">Nuevo registro</Button>
          </>
        }
      />
    ),
  },
)
