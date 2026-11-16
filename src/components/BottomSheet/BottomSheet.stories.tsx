import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BottomSheet } from './BottomSheet'
import { Counter } from '@/components/Counter'
import { Button } from '@/components/Button'

const meta: Meta<typeof BottomSheet> = {
  title: 'Feedback & Overlays/Bottom Sheet',
  component: BottomSheet,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof BottomSheet>

// Body only (overlay off), as the Figma component is drawn.
export const Default: Story = {
  render: () => {
    const [v, setV] = useState(12)
    return (
      <div className="bg-surface-page p-8">
        <BottomSheet overlay={false} title="Sheet title" context="Contexto · detalle corto">
          <Counter value={v} onChange={setV} />
        </BottomSheet>
      </div>
    )
  },
}

// "Bottom Sheet over scrim": fixed to the viewport bottom; Escape or the scrim closes it.
export const OverScrim: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const [open, setOpen] = useState(true)
    const [v, setV] = useState(3)
    return (
      <div className="min-h-[600px] bg-surface-page p-8">
        <Button onClick={() => setOpen(true)}>Open sheet</Button>
        {open ? (
          <BottomSheet title="Unidades" context="Account 4021 · Sales" onClose={() => setOpen(false)} onConfirm={() => setOpen(false)}>
            <Counter value={v} onChange={setV} />
          </BottomSheet>
        ) : null}
      </div>
    )
  },
}
