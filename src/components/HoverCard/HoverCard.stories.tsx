import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '@/components/Avatar'
import { Link } from '@/components/Link'
import { HoverCard } from './HoverCard'

const meta: Meta<typeof HoverCard> = {
  title: 'Feedback & Overlays/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="h-[220px]"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof HoverCard>

const card = (
  <div className="flex gap-12px">
    <Avatar initials="LR" size="md" />
    <div className="flex flex-col gap-4px">
      <p className="m-0 text-sm font-semibold leading-5 text-text-primary">Laura Romero</p>
      <p className="m-0 text-text-xs leading-5 text-text-secondary">Account owner · Sales</p>
      <p className="m-0 text-text-xs leading-5 text-text-secondary">Owns 18 accounts, $128,450 this quarter.</p>
    </div>
  </div>
)

export const Playground: Story = {
  render: () => (
    <p className="m-0 text-sm leading-5 text-text-primary">
      Assigned to <HoverCard trigger={<Link href="#owner">Laura Romero</Link>}>{card}</HoverCard> on May 27, 2026.
    </p>
  ),
}

/** Open — checked with axe in every theme. */
export const Open: Story = {
  render: () => (
    <HoverCard defaultOpen trigger={<Link href="#account">Account 4021</Link>}>
      <div className="flex flex-col gap-6px">
        <p className="m-0 text-sm font-semibold leading-5 text-text-primary">Account 4021</p>
        <p className="m-0 text-text-xs leading-5 text-text-secondary">Subscriptions · USD · Active since Jan 2025</p>
        <p className="m-0 text-text-xs leading-5 text-text-secondary">Last 30 days: $12,650 (+8.2%)</p>
      </div>
    </HoverCard>
  ),
}
