import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  title: 'Core/Scroll Area',
  component: ScrollArea,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const accounts = Array.from({ length: 24 }, (_, i) => ({ id: 4021 + i * 7, amount: ((i * 37) % 97) * 12.5 + 40 }))

export const Playground: Story = {
  render: () => (
    <div className="w-full max-w-[280px] rounded-lg border border-border-subtle bg-surface-container">
      <p className="m-0 border-b border-border-subtle px-16px py-10px text-sm font-medium leading-5 text-text-primary">Accounts</p>
      <ScrollArea aria-label="Accounts" maxSize={240}>
        <ul className="m-0 list-none p-0">
          {accounts.map((a) => (
            <li key={a.id} className="flex justify-between border-b border-border-subtle px-16px py-8px text-sm leading-5 text-text-primary last:border-0">
              <span>Account {a.id}</span>
              <span className="tabular-nums text-text-secondary">${a.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  ),
}

/** Horizontal — a row of chips or cards wider than its container. */
export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-[360px] rounded-lg border border-border-subtle bg-surface-container p-12px">
      <ScrollArea aria-label="Saved views" orientation="horizontal">
        <div className="flex w-max gap-8px pb-6px">
          {['All accounts', 'Pending', 'High value', 'EUR only', 'Refunds this month', 'Subscriptions', 'Blocked'].map((v) => (
            <span key={v} className="whitespace-nowrap rounded-full border border-border-default px-12px py-4px text-text-xs leading-5 text-text-primary">{v}</span>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}
