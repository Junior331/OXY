import type { Meta, StoryObj } from '@storybook/react'
import { ChatHeader } from './ChatHeader'

const meta = {
  title: 'Molecules/ChatHeader',
  component: ChatHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isAiActive: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Maria Santos',
    phone: '(11) 99999-9999',
    pacientes: 'Rex, Luna',
    isAiActive: true,
  },
}

export const AiInactive: Story = {
  args: {
    name: 'João Silva',
    phone: '(11) 98888-8888',
    pacientes: 'Bob',
    isAiActive: false,
  },
}

export const NoPacientes: Story = {
  args: {
    name: 'Ana Paula Oliveira',
    phone: '(11) 97777-7777',
    isAiActive: true,
  },
}

export const NoPhone: Story = {
  args: {
    name: 'Carlos Costa',
    pacientes: 'Max, Bella, Thor',
    isAiActive: true,
  },
}

export const LongName: Story = {
  args: {
    name: 'Maria Fernanda de Oliveira Santos Costa',
    phone: '(11) 96666-6666',
    pacientes: 'Rex, Luna, Max, Bella',
    isAiActive: true,
  },
}

export const WithToggle: Story = {
  args: {
    name: 'Fernanda Lima',
    phone: '(11) 95555-5555',
    pacientes: 'Nina',
    isAiActive: true,
    onToggleAi: () => alert('Toggle IA'),
  },
}
