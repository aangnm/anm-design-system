import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { title: 'Guardado', description: 'Los cambios se guardaron correctamente.' },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: { color: 'success', onDismiss: () => {} },
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8px">
      <Toast color="success" title="Guardado" description="Los cambios se guardaron correctamente." onDismiss={() => {}} />
      <Toast color="info" title="Información" description="Hay una actualización disponible." onDismiss={() => {}} />
      <Toast color="warning" title="Advertencia" description="Revisa los campos antes de continuar." onDismiss={() => {}} />
      <Toast color="error" title="Error" description="No se pudo guardar el cambio." onDismiss={() => {}} />
    </div>
  ),
}
