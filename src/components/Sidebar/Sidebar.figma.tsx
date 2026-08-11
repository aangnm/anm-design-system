import figma from '@figma/code-connect'
import type { ReactElement } from 'react'
import { Sidebar, SidebarBrand, SidebarItem } from './Sidebar'

figma.connect(
  Sidebar,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2227-286',
  {
    props: {
      collapsed: figma.enum('State', { Collapsed: true }),
    },
    example: ({ collapsed }) => (
      <Sidebar collapsed={collapsed} brand={<SidebarBrand logo={<Logo />} name="Santa Fe" />} footer={<UserFooter />}>
        <SidebarItem active>Panel</SidebarItem>
        <SidebarItem>Registros</SidebarItem>
        <SidebarItem>Análisis</SidebarItem>
      </Sidebar>
    ),
  },
)

// Filled by the consuming app — the design system ships the shell, not the
// brand artwork or the specific user block.
declare function Logo(): ReactElement
declare function UserFooter(): ReactElement
