import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CreditCard, Landmark, Wallet } from 'lucide-react'
import { ListRow } from './ListRow'

const meta: Meta<typeof ListRow> = {
  title: 'Core/List Row',
  component: ListRow,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[360px] bg-surface-page p-8"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof ListRow>

export const Playground: Story = {
  render: () => {
    const [sel, setSel] = useState('4021')
    const rows = [
      { id: '4021', title: 'Cuenta 4021', subtitle: 'Ahorros · USD', icon: <Wallet /> },
      { id: '4035', title: 'Cuenta 4035', subtitle: 'Corriente · USD', icon: <Landmark /> },
      { id: '4102', title: 'Tarjeta 4102', subtitle: 'Crédito · EUR', icon: <CreditCard /> },
    ]
    return (
      <div className="flex flex-col gap-8px">
        {rows.map((r) => (
          <ListRow key={r.id} title={r.title} subtitle={r.subtitle} icon={r.icon} selected={sel === r.id} onClick={() => setSel(r.id)} />
        ))}
      </div>
    )
  },
}

// Mirrors the Figma variants: Default / Focus (forced) / Disabled / Selected.
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8px">
      <ListRow title="Título" subtitle="Subtítulo" icon={<Wallet />} />
      <ListRow title="Título" subtitle="Subtítulo" icon={<Wallet />} className="focus-ring!" />
      <ListRow title="Título" subtitle="Subtítulo" icon={<Wallet />} disabled />
      <ListRow title="Título" subtitle="Subtítulo" icon={<Wallet />} selected />
    </div>
  ),
}
