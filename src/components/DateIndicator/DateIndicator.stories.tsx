import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateIndicator } from './DateIndicator'

const meta: Meta<typeof DateIndicator> = {
  title: 'Navigation/Date Indicator',
  component: DateIndicator,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="bg-surface-page p-8"><Story /></div>],
  args: { date: 'Miércoles, 27 may 2026', tag: 'SEM 22' },
}
export default meta
type Story = StoryObj<typeof DateIndicator>

export const Playground: Story = {}
export const WithoutTag: Story = { args: { tag: undefined } }
