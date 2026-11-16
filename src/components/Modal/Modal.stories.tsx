import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Feedback & Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    overlay: false,
    title: 'Confirm action',
    children: 'Are you sure you want to continue? This can’t be undone.',
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Modal>

export const Playground: Story = {}

export const Destructive: Story = {
  args: {
    type: 'destructive',
    title: 'Delete record',
    children: 'This permanently deletes the record and can’t be undone.',
  },
}

// "Modal over scrim": the dialog on surface/scrim at opacity/scrim. The wrapper's
// transform contains the fixed layers inside the preview; clicking the scrim closes.
export const OverScrim: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true)
    return (
      <div className="relative h-[420px] overflow-hidden bg-surface-page [transform:translateZ(0)]">
        <div className="p-24px">
          <button type="button" className="text-sm text-text-primary underline" onClick={() => setOpen(true)}>
            Open modal
          </button>
        </div>
        {open ? <Modal {...args} overlay onClose={() => setOpen(false)} onCancel={() => setOpen(false)} /> : null}
      </div>
    )
  },
}

export const DestructiveOverScrim: Story = {
  args: {
    type: 'destructive',
    title: 'Delete record',
    children: 'This permanently deletes the record and can’t be undone.',
  },
  render: OverScrim.render,
}

/**
 * Keyboard behaviour, checked in CI: opening moves focus into the dialog, Tab
 * stays inside it, Escape closes it and focus returns to the trigger.
 */
export const FocusManagement: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div className="relative h-[420px] overflow-hidden bg-surface-page [transform:translateZ(0)]">
        <div className="flex gap-8px p-24px">
          <button type="button" className="text-sm text-text-primary underline" onClick={() => setOpen(true)}>
            Open modal
          </button>
          <button type="button" className="text-sm text-text-primary underline">
            Behind the modal
          </button>
        </div>
        {open ? <Modal {...args} overlay onClose={() => setOpen(false)} onCancel={() => setOpen(false)} /> : null}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Open modal' })
    await userEvent.click(trigger)
    const dialog = await canvas.findByRole('dialog')
    await expect(dialog).toContainElement(document.activeElement as HTMLElement)
    for (let i = 0; i < 4; i++) {
      await userEvent.tab()
      await expect(dialog).toContainElement(document.activeElement as HTMLElement)
    }
    await userEvent.tab({ shift: true })
    await expect(dialog).toContainElement(document.activeElement as HTMLElement)
    await userEvent.keyboard('{Escape}')
    await expect(canvas.queryByRole('dialog')).toBeNull()
    await expect(trigger).toHaveFocus()
  },
}
