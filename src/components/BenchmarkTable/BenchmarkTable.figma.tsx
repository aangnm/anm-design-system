import figma from '@figma/code-connect'
import { BenchmarkTable } from './BenchmarkTable'

figma.connect(
  BenchmarkTable,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2342-66',
  {
    example: () => (
      <BenchmarkTable
        rows={[
          { lote: 'Lote 07', actividad: 'Cosecha', rate: 612, tier: 'moderado' },
          { lote: 'Lote 12', actividad: 'Cosecha', rate: 340, tier: 'critico' },
          { lote: 'Lote 15N', actividad: 'Cosecha', rate: 845, tier: 'saludable' },
          { lote: 'Lote 18', actividad: 'Cosecha', rate: 810, tier: 'saludable' },
        ]}
      />
    ),
  },
)
