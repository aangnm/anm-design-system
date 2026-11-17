import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart3, Search, Table2, TrendingUp } from 'lucide-react'
import { Suggestions } from './Suggestions'

const meta: Meta<typeof Suggestions> = {
  title: 'AI/Suggestions',
  component: Suggestions,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { onSelect: () => {} },
}
export default meta
type Story = StoryObj<typeof Suggestions>

/** Prompt starters on an empty chat, written as questions the person could have typed. */
export const Playground: Story = {
  args: {
    'aria-label': 'Suggested questions',
    items: [
      { label: 'Compare Q1 and Q2 sales', icon: <BarChart3 /> },
      { label: 'Which accounts are at risk?', icon: <Search /> },
      { label: 'Forecast revenue for June', icon: <TrendingUp /> },
      { label: 'Show refunds by category', icon: <Table2 /> },
    ],
  },
}

/** Follow-ups under an answer, without icons. */
export const FollowUps: Story = {
  args: {
    'aria-label': 'Follow-up questions',
    items: [{ label: 'Break this down by region' }, { label: 'Forecast June for Subscriptions' }, { label: 'Show the three accounts in a table' }],
  },
}
