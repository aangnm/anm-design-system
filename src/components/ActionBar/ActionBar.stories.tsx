import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionBar } from './ActionBar'

const meta: Meta<typeof ActionBar> = {
  title: 'Navigation/Action Bar',
  component: ActionBar,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[390px] bg-surface-page"><Story /></div>],
  args: { summary: '2 filters applied · 26 results', primaryLabel: 'Continuar' },
}
export default meta
type Story = StoryObj<typeof ActionBar>

export const Playground: Story = {}
export const WithSecondary: Story = { args: { secondaryLabel: 'Save draft' } }
export const PrimaryOnly: Story = { args: { summary: undefined } }
