import figma from '@figma/code-connect'
import { MultiSelect } from './MultiSelect'

figma.connect(
  MultiSelect,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2324-55',
  {
    example: () => (
      <MultiSelect
        options={[
          { label: 'Cosecha', value: 'harvest' },
          { label: 'Riego', value: 'irrigation' },
        ]}
        value={['harvest', 'irrigation']}
        onChange={() => {}}
      />
    ),
  },
)
