import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, Tab } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Playground: Story = {
  render: () => (
    <Tabs>
      <Tab active>Etiqueta</Tab>
      <Tab>Etiqueta</Tab>
      <Tab>Etiqueta</Tab>
    </Tabs>
  ),
}

export const States: Story = {
  render: () => (
    <div className="bg-surface-page p-8">
      <Tabs>
        <Tab>Etiqueta</Tab>
        <Tab active>Etiqueta</Tab>
        <Tab disabled>Etiqueta</Tab>
      </Tabs>
    </div>
  ),
}
