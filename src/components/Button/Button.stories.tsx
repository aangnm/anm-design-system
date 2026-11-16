import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    children: 'Button',
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: { variant: 'primary', size: 'md' },
}

const types = ['primary', 'secondary', 'outline', 'ghost'] as const
const sizes = ['sm', 'md', 'lg'] as const

// Hover/Focus are CSS pseudo-states and can't be triggered from markup, so the
// grid forces them with the same classes the pseudo-states apply.
const forcedHover = {
  primary: 'state-hover',
  secondary: 'state-hover',
  outline: 'state-hover',
  ghost: 'state-hover',
} as const
const forcedFocus = 'focus-ring!'

/** Mirrors the Figma grid: Type x Size rows, State columns (Default, Hover, Focus, Disabled, Loading). */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8">
      <div className="grid grid-cols-[96px_repeat(5,120px)] gap-x-16px text-text-caption leading-4 text-text-secondary">
        <span />
        {['Default', 'Hover', 'Focus', 'Disabled', 'Loading'].map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      {types.flatMap((variant) =>
        sizes.map((size) => (
          <div key={`${variant}-${size}`} className="grid grid-cols-[96px_repeat(5,120px)] items-center gap-x-16px">
            <span className="text-text-caption leading-4 text-text-secondary">
              {variant} / {size}
            </span>
            <div><Button variant={variant} size={size}>Button</Button></div>
            <div><Button variant={variant} size={size} className={forcedHover[variant]}>Button</Button></div>
            <div><Button variant={variant} size={size} className={forcedFocus}>Button</Button></div>
            <div><Button variant={variant} size={size} disabled>Button</Button></div>
            <div><Button variant={variant} size={size} loading>Button</Button></div>
          </div>
        )),
      )}
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-16px bg-surface-page p-8">
      <Button size="sm" leadingIcon={<Plus className="size-4" />}>Nuevo</Button>
      <Button leadingIcon={<Plus className="size-4" />}>Nuevo</Button>
      <Button size="lg" leadingIcon={<Plus className="size-4" />}>Nuevo</Button>
    </div>
  ),
}
