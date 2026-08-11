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
          <SearchIcon className="size-5 text-icon-muted" />
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
