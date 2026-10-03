import figma from '@figma/code-connect'
import type { ReactElement } from 'react'
import { Sidebar, SidebarBrand, SidebarItem } from './Sidebar'

// State = Expanded (240) / Collapsed (72, icon-only rail). Each nav item has its
// own icon swap property in Figma (Icon · Panel, Registros, Análisis, Zonas,
// Ajustes), which maps to SidebarItem's `icon` slot.
figma.connect(
  Sidebar,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2227-286',
  {
    props: {
      collapsed: figma.enum('State', { Collapsed: true }),
      panelIcon: figma.instance('Icon · Panel'),
      registrosIcon: figma.instance('Icon · Registros'),
      analisisIcon: figma.instance('Icon · Análisis'),
      zonasIcon: figma.instance('Icon · Zonas'),
      ajustesIcon: figma.instance('Icon · Ajustes'),
    },
    example: ({ collapsed, panelIcon, registrosIcon, analisisIcon, zonasIcon, ajustesIcon }) => (
      <Sidebar collapsed={collapsed} brand={<SidebarBrand logo={<Logo />} name="Santa Fe" />} footer={<UserFooter />}>
        <SidebarItem icon={panelIcon} active>
          Panel
        </SidebarItem>
        <SidebarItem icon={registrosIcon}>Registros</SidebarItem>
        <SidebarItem icon={analisisIcon}>Análisis</SidebarItem>
        <SidebarItem icon={zonasIcon}>Zonas</SidebarItem>
        <SidebarItem icon={ajustesIcon}>Ajustes</SidebarItem>
      </Sidebar>
    ),
  },
)

// Filled by the consuming app — the design system ships the shell, not the
// brand artwork or the specific user block.
declare function Logo(): ReactElement
declare function UserFooter(): ReactElement
