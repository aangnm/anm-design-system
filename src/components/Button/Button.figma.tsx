import figma from '@figma/code-connect'
import { Button } from './Button'

// Maps this component to the "Button" component set on the Core page of
// Iankha-Design-System-New. Publish with `npx figma connect publish` once
// FIGMA_ACCESS_TOKEN is configured — see README.
figma.connect(
  Button,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2097-56',
  {
    props: {
      children: figma.string('Button'),
      variant: figma.enum('Type', {
        Primary: 'primary',
        Secondary: 'secondary',
        Outline: 'outline',
        Ghost: 'ghost',
      }),
      size: figma.enum('Size', {
        SM: 'sm',
        MD: 'md',
        LG: 'lg',
      }),
      loading: figma.enum('State', {
        Loading: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      leadingIcon: figma.boolean('Leading icon', {
        true: figma.instance('Leading icon'),
        false: undefined,
      }),
    },
    example: ({ children, variant, size, loading, disabled, leadingIcon }) => (
      <Button variant={variant} size={size} loading={loading} disabled={disabled} leadingIcon={leadingIcon}>
        {children}
      </Button>
    ),
  },
)
