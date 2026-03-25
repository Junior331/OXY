import type { Meta, StoryObj } from '@storybook/react'
import { BlogCard } from './BlogCard'

const meta = {
  title: 'Molecules/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
    },
    author: {
      control: 'text',
    },
    date: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    excerpt: {
      control: 'text',
    },
  },
} satisfies Meta<typeof BlogCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tag: 'DICAS',
    author: 'Equipe Oxy',
    date: '15 Jan 2024',
    title: 'Como aumentar a retenção de clientes',
    excerpt: 'Descubra estratégias comprovadas para manter seus clientes voltando ao seu clinica. Fidelização é a chave para o sucesso.',
  },
}

export const Marketing: Story = {
  args: {
    tag: 'MARKETING',
    author: 'Ana Paula',
    date: '10 Jan 2024',
    title: 'WhatsApp para Clinicas',
    excerpt: 'Aprenda como usar o WhatsApp de forma profissional para agendar serviços e se comunicar com seus clientes.',
  },
}

export const Tutorial: Story = {
  args: {
    tag: 'TUTORIAL',
    author: 'Carlos Silva',
    date: '5 Jan 2024',
    title: 'Guia completo do Oxy',
    excerpt: 'Passo a passo para configurar sua conta e começar a automatizar seus agendamentos hoje mesmo.',
  },
}

export const BlogGrid: Story = {
  args: {
    tag: 'DICAS',
    author: 'Equipe Oxy',
    date: '15 Jan 2024',
    title: 'Aumentar retenção de clientes',
    excerpt: 'Estratégias para manter seus clientes.',
  },
  render: () => (
    <div className="flex gap-6">
      <BlogCard
        tag="DICAS"
        author="Equipe Oxy"
        date="15 Jan 2024"
        title="Aumentar retenção de clientes"
        excerpt="Estratégias para manter seus clientes."
      />
      <BlogCard
        tag="MARKETING"
        author="Ana Paula"
        date="10 Jan 2024"
        title="WhatsApp para Clinicas"
        excerpt="Use o WhatsApp de forma profissional."
      />
      <BlogCard
        tag="NOVIDADES"
        author="Carlos Silva"
        date="5 Jan 2024"
        title="Novos recursos do Oxy"
        excerpt="Confira as últimas atualizações."
      />
    </div>
  ),
}
