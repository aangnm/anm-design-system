import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppBar } from './AppBar'
import { Avatar } from '@/components/Avatar'
import { DateIndicator } from '@/components/DateIndicator'

const meta: Meta<typeof AppBar> = {
  title: 'Navigation/App Bar',
  component: AppBar,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[390px] bg-surface-page"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof AppBar>

// Figma: App Bar / Mobile. Show date = the center slot.
export const Playground: Story = {
  render: () => (
    <AppBar center={<DateIndicator date="Wed, May 27, 2026" tag="WK 22" />} trailing={<Avatar initials="LR" size="md" />} />
  ),
}
export const WithoutDate: Story = {
  render: () => <AppBar trailing={<Avatar initials="LR" size="md" />} />,
}
