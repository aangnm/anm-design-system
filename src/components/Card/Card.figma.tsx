import figma from '@figma/code-connect'
import { Card, CardTitle, CardDescription } from './Card'

figma.connect(
  Card,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2220-29',
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
      <Card state={state}>
        <CardTitle>Título de la tarjeta</CardTitle>
        <CardDescription>Contenido de la tarjeta con una descripción breve del elemento mostrado.</CardDescription>
      </Card>
    ),
  },
)
