import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from './Timeline'

const entries = [
  { title: 'Pago recibido', time: 'Today · 09:12', detail: '$250 credited to account 4021.', tone: 'success' as const },
  { title: 'Reconciliation', time: 'Yesterday · 18:40', detail: 'Scheduled reconciliation completed, 45 min.', tone: 'info' as const },
  { title: 'Transfer', time: '3 days ago', detail: 'International transfer sent from account 4035.', tone: 'warning' as const },
]

const meta: Meta<typeof Timeline> = {
  title: 'Product Patterns/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Timeline>

// Mirrors the Figma component: payment received (success), reconciliation (info), transfer (warning).
export const Playground: Story = {
  args: { entries },
}

export const SingleEntry: Story = {
  args: { entries: entries.slice(0, 1) },
}
