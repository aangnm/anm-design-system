import type { Meta, StoryObj } from '@storybook/react-vite'
import { SmallMultiples } from './SmallMultiples'

const meta: Meta<typeof SmallMultiples> = {
  title: 'Data Display/Small Multiples',
  component: SmallMultiples,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SmallMultiples>

const panels = [
  { label: 'Sales', value: '$12,400', data: [820, 860, 910, 980, 1040, 1120, 1190, 1240] },
  { label: 'Subscriptions', value: '$8,150', data: [610, 640, 700, 690, 760, 790, 800, 815] },
  { label: 'Services', value: '$4,900', data: [520, 480, 510, 470, 500, 460, 490, 490] },
  { label: 'Commissions', value: '$2,310', data: [140, 150, 170, 190, 200, 210, 220, 231] },
  { label: 'Refunds', value: '$980', data: [60, 70, 90, 140, 120, 110, 100, 98] },
  { label: 'Other', value: '$640', data: [80, 75, 70, 66, 70, 62, 66, 64] },
]

export const Playground: Story = {
  args: { panels, range: ['Jan', 'Aug'], columns: 3, unit: 'USD', className: 'w-[640px]' },
}

/** One panel in the series colour, the rest neutral — "this one versus the field". */
export const Highlight: Story = {
  args: { ...Playground.args, highlight: 3 },
}

/** Independent scales: shape only. The footer says so, because heights no longer compare. */
export const IndependentScales: Story = {
  args: { ...Playground.args, independentScales: true },
}
