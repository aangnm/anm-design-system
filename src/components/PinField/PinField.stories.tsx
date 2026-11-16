import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PinField } from './PinField'

const meta: Meta<typeof PinField> = {
  title: 'Core/PIN Field',
  component: PinField,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="bg-surface-page p-8"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof PinField>

export const Playground: Story = {
  render: () => {
    const [v, setV] = useState('')
    return <PinField label="PIN de 4 dígitos" helperText="Los 4 dígitos de tu clave de acceso." value={v} onChange={setV} />
  },
}

// Mirrors the Figma grid: State (Default / Error / Disabled) x Filled 0–4.
// Focus: click or Tab into a field — the next empty box takes the ring.
export const StateByFilled: Story = {
  render: () => (
    <div className="flex flex-col gap-24px">
      {(['default', 'error', 'disabled'] as const).map((state) => (
        <div key={state} className="flex gap-24px">
          {[0, 2, 4].map((n) => (
            <PinField
              key={n}
              label="PIN de 4 dígitos"
              value={'1234'.slice(0, n)}
              onChange={() => {}}
              helperText="Los 4 dígitos de tu clave de acceso."
              error={state === 'error' ? 'PIN incorrecto. Intenta de nuevo.' : undefined}
              disabled={state === 'disabled'}
              className="w-[280px]"
            />
          ))}
        </div>
      ))}
    </div>
  ),
}
