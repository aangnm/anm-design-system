import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search as SearchIcon } from 'lucide-react'
import { Navbar, NavbarLink } from './Navbar'
import { Avatar } from '@/components/Avatar'

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Navbar>

export const Playground: Story = {
  render: () => (
    <Navbar
      brand={<span className="text-sm font-semibold text-text-primary">iankha</span>}
      actions={
        <>
          <button
            type="button"
            aria-label="Buscar"
            className="inline-flex size-24px items-center justify-center rounded-xs text-icon-muted outline-none transition-colors hover:text-text-primary focus-visible:ring-1 focus-visible:ring-focus-ring"
          >
            <SearchIcon className="size-5" />
          </button>
          <Avatar initials="IK" size="md" />
        </>
      }
    >
      <NavbarLink href="#" active>
        Panel
      </NavbarLink>
      <NavbarLink href="#">Registros</NavbarLink>
      <NavbarLink href="#">Análisis</NavbarLink>
    </Navbar>
  ),
}
