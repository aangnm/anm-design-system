import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell } from 'lucide-react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Core/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: <Bell />, 'aria-label': 'Notificaciones' },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof IconButton>

export const Playground: Story = {
  args: { variant: 'primary', size: 'md' },
}

const forcedHover = {
  primary: 'state-hover',
  secondary: 'state-hover',
  ghost: 'state-hover',
} as const

/** Mirrors the Figma grid: Type x Size rows, State columns (Hover/Focus forced with the same tokens). */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16px">
      <div className="grid grid-cols-[96px_repeat(4,56px)] text-text-caption leading-4 text-text-secondary">
        <span />
        {['Default', 'Hover', 'Focus', 'Disabled'].map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      {(['primary', 'secondary', 'ghost'] as const).flatMap((variant) =>
        (['sm', 'md', 'lg'] as const).map((size) => (
          <div key={`${variant}-${size}`} className="grid grid-cols-[96px_repeat(4,56px)] items-center">
            <span className="text-text-caption leading-4 text-text-secondary">
              {variant} / {size}
            </span>
            <div><IconButton variant={variant} size={size} icon={<Bell />} aria-label="Notificaciones" /></div>
            <div><IconButton variant={variant} size={size} icon={<Bell />} aria-label="Notificaciones" className={forcedHover[variant]} /></div>
            <div><IconButton variant={variant} size={size} icon={<Bell />} aria-label="Notificaciones" className="focus-ring!" /></div>
            <div><IconButton variant={variant} size={size} icon={<Bell />} aria-label="Notificaciones" disabled /></div>
          </div>
        )),
      )}
    </div>
  ),
}
