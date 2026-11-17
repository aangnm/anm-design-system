import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fireEvent, userEvent, within } from 'storybook/test'
import { Copy, Download, Pencil, Trash2 } from 'lucide-react'
import { ContextMenu } from './ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/Context Menu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ContextMenu>

const items = [
  { label: 'Edit record', icon: <Pencil />, shortcut: ['E'] },
  { label: 'Duplicate', icon: <Copy />, shortcut: ['⌘', 'D'] },
  { label: 'Export row', icon: <Download /> },
  { label: 'Delete', icon: <Trash2 />, destructive: true, separator: true, shortcut: ['⌫'] },
]

const area = (
  <div tabIndex={0} className="flex h-[200px] w-[420px] items-center justify-center rounded-lg border border-dashed border-border-default text-sm text-text-secondary outline-none focus-visible:focus-ring">
    Right-click here, or focus and press Shift+F10
  </div>
)

export const Playground: Story = { render: () => <ContextMenu label="Row actions" items={items}>{area}</ContextMenu> }

/** Open — checked with axe in every theme; arrows move between items. */
export const Open: Story = {
  render: () => <div className="h-[320px]"><ContextMenu label="Row actions" items={items}>{area}</ContextMenu></div>,
  play: async ({ canvasElement }) => {
    const target = canvasElement.querySelector<HTMLElement>('[tabindex="0"]')!
    const r = target.getBoundingClientRect()
    fireEvent.contextMenu(target, { clientX: r.left + 40, clientY: r.top + 40 })
    const menu = await within(canvasElement).findByRole('menu', { name: 'Row actions' })
    await userEvent.keyboard('{ArrowDown}')
    await expect(within(menu).getByRole('menuitem', { name: /Duplicate/ })).toHaveFocus()
  },
}
