import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { BarChart3, FileText, LayoutDashboard, Plus, Settings, Table2, UserPlus } from 'lucide-react'
import { Button } from '@/components/Button'
import { Kbd } from '@/components/Kbd'
import { CommandMenu, type CommandGroup } from './CommandMenu'

const meta: Meta<typeof CommandMenu> = {
  title: 'Feedback & Overlays/Command Menu',
  component: CommandMenu,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CommandMenu>

const noop = () => {}
const groups: CommandGroup[] = [
  {
    heading: 'Go to',
    items: [
      { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard />, shortcut: ['G', 'D'], onSelect: noop },
      { id: 'tx', label: 'Transactions', icon: <Table2 />, keywords: ['payments', 'records'], shortcut: ['G', 'T'], onSelect: noop },
      { id: 'reports', label: 'Reports', icon: <BarChart3 />, keywords: ['analytics', 'charts'], onSelect: noop },
      { id: 'settings', label: 'Settings', icon: <Settings />, shortcut: ['⌘', ','], onSelect: noop },
    ],
  },
  {
    heading: 'Actions',
    items: [
      { id: 'new', label: 'New record', icon: <Plus />, shortcut: ['N'], onSelect: noop },
      { id: 'invite', label: 'Invite teammate', icon: <UserPlus />, onSelect: noop },
      { id: 'export', label: 'Export report as PDF', icon: <FileText />, keywords: ['download'], onSelect: noop },
    ],
  },
]

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center gap-12px">
      <Button variant="secondary" onClick={() => setOpen(true)}>Open command menu</Button>
      <span className="text-sm text-text-secondary">or press <Kbd keys={['⌘', 'K']} /></span>
      <CommandMenu open={open} onOpenChange={setOpen} groups={groups} onAsk={noop} />
    </div>
  )
}

export const Playground: Story = { render: () => <Demo /> }

/** The panel inline — checked with axe in every theme. Arrow keys move the active row. */
export const Inline: Story = {
  render: () => <CommandMenu inline open onOpenChange={noop} groups={groups} shortcut={false} />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('combobox')
    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}')
    await expect(within(canvasElement).getByRole('option', { name: /Transactions/ })).toHaveAttribute('aria-selected', 'true')
  },
}

/** With text: Ask AI comes first, so "no match" is never a dead end. */
export const AskAI: Story = {
  render: () => <CommandMenu inline open onOpenChange={noop} groups={groups} onAsk={noop} shortcut={false} defaultQuery="export" />,
}

export const NoResults: Story = {
  render: () => <CommandMenu inline open onOpenChange={noop} groups={groups} shortcut={false} defaultQuery="forecast" />,
}
