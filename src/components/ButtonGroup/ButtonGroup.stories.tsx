import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'
import { ButtonGroup } from './ButtonGroup'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Core/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Playground: Story = {
  render: () => (
    <ButtonGroup aria-label="Period">
      <Button variant="secondary" leadingIcon={<ChevronLeft />}>Previous</Button>
      <Button variant="secondary">Today</Button>
      <Button variant="secondary" trailingIcon={<ChevronRight />}>Next</Button>
    </ButtonGroup>
  ),
}

/** A split button: the main action and a menu of its variants. */
export const SplitButton: Story = {
  render: () => (
    <ButtonGroup aria-label="Export">
      <Button variant="secondary">Export CSV</Button>
      <IconButton variant="secondary" icon={<ChevronDown />} aria-label="More export formats" />
    </ButtonGroup>
  ),
}

export const SizesAndOrientation: Story = {
  render: () => (
    <div className="flex items-start gap-32px">
      <ButtonGroup aria-label="Zoom" size="sm">
        <IconButton variant="secondary" size="sm" icon={<Minus />} aria-label="Zoom out" />
        <Button variant="secondary" size="sm">100%</Button>
        <IconButton variant="secondary" size="sm" icon={<Plus />} aria-label="Zoom in" />
      </ButtonGroup>
      <ButtonGroup aria-label="Sort" orientation="vertical">
        <Button variant="secondary">Newest</Button>
        <Button variant="secondary">Oldest</Button>
        <Button variant="secondary">Largest</Button>
      </ButtonGroup>
    </div>
  ),
}
