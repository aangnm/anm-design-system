import figma from '@figma/code-connect'
import type { ReactElement } from 'react'
import { Navbar, NavbarLink } from './Navbar'
import { Avatar } from '@/components/Avatar'

// The Figma Navbar has no variant props — it's one fixed composition. The
// example fills the same slots the same way, so Dev Mode shows a
// like-for-like reference rather than a different arrangement.
figma.connect(
  Navbar,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2126-19',
  {
    example: () => (
      <Navbar brand={<Logo />} actions={<Avatar initials="IK" size="md" />}>
        <NavbarLink href="#" active>
          Panel
        </NavbarLink>
        <NavbarLink href="#">Registros</NavbarLink>
        <NavbarLink href="#">Análisis</NavbarLink>
      </Navbar>
    ),
  },
)

// Placeholder for the consuming app's own logo — the design system doesn't
// ship the Iankha lockup as a React component (it lives in Figma as vector
// artwork), so the brand slot is filled by the app.
declare function Logo(): ReactElement
