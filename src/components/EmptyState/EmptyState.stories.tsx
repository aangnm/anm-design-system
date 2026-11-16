import type { Meta, StoryObj } from '@storybook/react-vite'
import { MapPin } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from '@/components/Button'

const meta: Meta<typeof EmptyState> = {
  title: 'Product Patterns/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[480px] bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof EmptyState>

// Mirrors the Figma component (480 x 320): icon badge, heading, guidance, one action.
export const Playground: Story = {
  args: {
    title: 'No accounts yet',
    description: 'Add your first account to start tracking revenue and performance.',
    action: <Button>Add account</Button>,
  },
}

export const CustomIcon: Story = {
  args: {
    icon: <MapPin />,
    title: 'No saved reports yet',
    description: 'Save your first report to share it with the team.',
    action: <Button>Add account</Button>,
  },
}

export const WithoutAction: Story = {
  args: {
    title: 'No results',
    description: 'Try another account or remove a filter.',
  },
}
