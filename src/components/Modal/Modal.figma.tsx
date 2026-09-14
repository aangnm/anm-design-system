import figma from '@figma/code-connect'
import { Modal } from './Modal'

figma.connect(
  Modal,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2225-36',
  {
    props: {
      type: figma.enum('Type', {
        Default: 'default',
        Destructive: 'destructive',
      }),
    },
    example: ({ type }) => (
      <Modal type={type} title="Confirmar acción">
        ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer.
      </Modal>
    ),
  },
)
