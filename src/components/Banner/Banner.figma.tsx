import figma from '@figma/code-connect'
import { Banner } from './Banner'

figma.connect(
  Banner,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2133-29',
  {
    props: {
      color: figma.enum('Color', {
        Info: 'info',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
      }),
      // "Title" / "Action" are booleans in Figma; the code props carry the text,
      // so the text property is only passed through when its boolean is on.
      title: figma.boolean('Title', { true: figma.string('Title text'), false: undefined }),
      actionLabel: figma.boolean('Action', { true: figma.string('Action label'), false: undefined }),
    },
    example: ({ color, title, actionLabel }) => (
      <Banner
        color={color}
        title={title}
        action={actionLabel ? { label: actionLabel, onClick: () => {} } : undefined}
        message="Mensaje para el usuario."
        onDismiss={() => {}}
      />
    ),
  },
)
