import figma from '@figma/code-connect'
import { Avatar } from './Avatar'

figma.connect(
  Avatar,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2105-8',
  {
    props: {
      initials: figma.string('IK'),
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      status: figma.enum('Status', { None: 'none', Online: 'online', Offline: 'offline' }),
    },
    example: ({ initials, size, status }) => <Avatar initials={initials} size={size} status={status} />,
  },
)
