import figma from '@figma/code-connect'
import { FormField } from './FormField'

figma.connect(
  FormField,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2122-21',
  {
    props: {
      label: figma.string('Etiqueta'),
      error: figma.enum('State', { Error: true }),
      helperText: figma.enum('State', {
        Default: 'Texto de ayuda opcional',
        Error: 'Este campo es obligatorio',
      }),
    },
    example: ({ label, error, helperText }) => (
      <FormField label={label} error={error} helperText={helperText} placeholder="Placeholder" />
    ),
  },
)
