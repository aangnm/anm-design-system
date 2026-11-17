import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react'
import { ToggleGroup } from './ToggleGroup'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Core/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ToggleGroup>

function Series() {
  const [value, setValue] = useState<string[]>(['sales', 'refunds'])
  return (
    <ToggleGroup
      type="multiple"
      aria-label="Series shown"
      value={value}
      onChange={setValue}
      items={[
        { value: 'sales', label: 'Sales' },
        { value: 'subscriptions', label: 'Subscriptions' },
        { value: 'refunds', label: 'Refunds' },
      ]}
    />
  )
}

/** Several on at once — which series a chart shows. */
export const Playground: Story = { render: () => <Series /> }

function Formatting() {
  const [marks, setMarks] = useState<string[]>(['bold'])
  const [align, setAlign] = useState<string | null>('left')
  return (
    <div className="flex flex-wrap gap-16px">
      <ToggleGroup
        type="multiple"
        iconOnly
        aria-label="Text style"
        value={marks}
        onChange={setMarks}
        items={[
          { value: 'bold', label: 'Bold', icon: <Bold /> },
          { value: 'italic', label: 'Italic', icon: <Italic /> },
          { value: 'underline', label: 'Underline', icon: <Underline /> },
        ]}
      />
      <ToggleGroup
        type="single"
        iconOnly
        size="sm"
        aria-label="Alignment"
        value={align}
        onChange={setAlign}
        items={[
          { value: 'left', label: 'Align left', icon: <AlignLeft /> },
          { value: 'center', label: 'Align center', icon: <AlignCenter /> },
          { value: 'right', label: 'Align right', icon: <AlignRight /> },
        ]}
      />
    </div>
  )
}

/** Icon-only items keep a label as their name and tooltip. Single allows none. */
export const IconOnly: Story = {
  render: () => <Formatting />,
  play: async ({ canvasElement }) => {
    const italic = within(canvasElement).getByRole('button', { name: 'Italic' })
    await userEvent.click(italic)
    await expect(italic).toHaveAttribute('aria-pressed', 'true')
  },
}
