import type { Meta, StoryObj } from '@storybook/react'
import { AppointmentItem } from './AppointmentItem'

const meta = {
  title: 'Molecules/AppointmentItem',
  component: AppointmentItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['concluido', 'confirmado', 'pendente', 'cancelado'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppointmentItem>

export default meta
type Story = StoryObj<typeof meta>

export const Confirmed: Story = {
  args: {
    pacienteName: 'Rex',
    service: 'Banho e Tosa',
    date: '15/01/2024',
    time: '14:00',
    price: 'R$ 80,00',
    status: 'confirmado',
  },
}

export const Pending: Story = {
  args: {
    pacienteName: 'Luna',
    service: 'Banho',
    date: '16/01/2024',
    time: '10:30',
    price: 'R$ 50,00',
    status: 'pendente',
  },
}

export const Completed: Story = {
  args: {
    pacienteName: 'Bob',
    service: 'Tosa na Tesoura',
    date: '14/01/2024',
    time: '09:00',
    price: 'R$ 120,00',
    status: 'concluido',
  },
}

export const Cancelled: Story = {
  args: {
    pacienteName: 'Max',
    service: 'Consulta Veterinária',
    date: '13/01/2024',
    time: '16:00',
    price: 'R$ 150,00',
    status: 'cancelado',
  },
}

export const CustomInitials: Story = {
  args: {
    pacienteName: 'Thor',
    pacienteInitials: 'TH',
    service: 'Banho e Hidratação',
    date: '17/01/2024',
    time: '11:00',
    price: 'R$ 95,00',
    status: 'confirmado',
  },
}

export const AllStatuses: Story = {
  args: {
    pacienteName: 'Rex',
    service: 'Banho e Tosa',
    date: '15/01',
    time: '14:00',
    price: 'R$ 80,00',
    status: 'confirmado',
  },
  render: () => (
    <div className="flex flex-col gap-3 w-[500px]">
      <AppointmentItem
        pacienteName="Rex"
        service="Banho e Tosa"
        date="15/01"
        time="14:00"
        price="R$ 80,00"
        status="confirmado"
      />
      <AppointmentItem
        pacienteName="Luna"
        service="Banho"
        date="15/01"
        time="15:00"
        price="R$ 50,00"
        status="pendente"
      />
      <AppointmentItem
        pacienteName="Bob"
        service="Tosa"
        date="15/01"
        time="16:00"
        price="R$ 60,00"
        status="concluido"
      />
      <AppointmentItem
        pacienteName="Max"
        service="Consulta"
        date="15/01"
        time="17:00"
        price="R$ 150,00"
        status="cancelado"
      />
    </div>
  ),
}
