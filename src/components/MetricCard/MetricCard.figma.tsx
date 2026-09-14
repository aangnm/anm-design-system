import figma from '@figma/code-connect'
import { MetricCard } from './MetricCard'

figma.connect(
  MetricCard,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2339-10',
  {
    example: () => (
      <MetricCard
        title="Producción total"
        context="Captura global · Semana 22"
        value="1,284 t"
        valueContext="2.5 M tallos acumulados"
        tagLabel="Global"
      />
    ),
  },
)
