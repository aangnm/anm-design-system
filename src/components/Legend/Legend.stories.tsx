import type { Meta, StoryObj } from '@storybook/react-vite'
import { Legend } from './Legend'

const meta: Meta<typeof Legend> = {
  title: 'Data Display/Legend',
  component: Legend,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Legend>

export const Playground: Story = {
  args: {
    items: [
      { label: 'NDVI', series: 1 },
      { label: 'GNDVI', series: 2 },
      { label: 'NDRE', series: 3 },
    ],
  },
}
