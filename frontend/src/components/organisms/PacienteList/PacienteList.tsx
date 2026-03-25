import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { PacienteCard } from '@/components/molecules/PacienteCard'
import { PacienteFormModal } from '@/components/molecules/PacienteFormModal'
import { EmptyState } from '@/components/molecules/EmptyState'
import { Modal } from '@/components/molecules/Modal'
import type { Paciente } from '@/types'
import type { PacienteCreate, PacienteUpdate } from '@/services/pacienteService'

export interface PacienteListProps {
  pacientes: Paciente[]
  clientId: string
  clinicaId: number
  isLoading?: boolean
  onCreatePaciente: (data: PacienteCreate) => Promise<void>
  onUpdatePaciente: (pacienteId: string, data: PacienteUpdate) => Promise<void>
  onDeletePaciente: (pacienteId: string) => Promise<void>
}

export function PacienteList({
  pacientes,
  clientId,
  clinicaId,
  isLoading = false,
  onCreatePaciente,
  onUpdatePaciente,
  onDeletePaciente,
}: PacienteListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null)
  const [deletingPaciente, setDeletingPaciente] = useState<Paciente | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (paciente: Paciente) => {
    setEditingPaciente(paciente)
    setIsFormOpen(true)
  }

  const handleDelete = (paciente: Paciente) => {
    setDeletingPaciente(paciente)
  }

  const handleSubmit = async (data: PacienteCreate | PacienteUpdate) => {
    if (editingPaciente) {
      await onUpdatePaciente(editingPaciente.id, data as PacienteUpdate)
    } else {
      await onCreatePaciente(data as PacienteCreate)
    }
    setEditingPaciente(null)
  }

  const confirmDelete = async () => {
    if (!deletingPaciente) return
    setIsDeleting(true)
    try {
      await onDeletePaciente(deletingPaciente.id)
      setDeletingPaciente(null)
    } catch (error) {
      console.error('Erro ao excluir paciente:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingPaciente(null)
  }

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-[#F4F6F9] dark:bg-[#212225]"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#434A57] dark:text-[#f5f9fc]">
          Pacientes ({pacientes.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFormOpen(true)}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Adicionar Paciente
        </Button>
      </div>

      {pacientes.length === 0 ? (
        <EmptyState
          image="pacientes_not_found"
          title="Nenhum paciente cadastrado"
          description="Adicione o primeiro paciente deste cliente"
          buttonText="Cadastrar Paciente"
          onButtonClick={() => setIsFormOpen(true)}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {pacientes.map((paciente) => (
            <PacienteCard
              key={paciente.id}
              paciente={paciente}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {}
      <PacienteFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        paciente={editingPaciente}
        clientId={clientId}
        clinicaId={clinicaId}
      />

      {}
      <Modal
        isOpen={!!deletingPaciente}
        onClose={() => setDeletingPaciente(null)}
        title="Excluir Paciente"
        onSubmit={confirmDelete}
        submitText="Excluir"
        isLoading={isDeleting}
        className="sm:max-w-md"
      >
        <p className="text-[#727B8E] dark:text-[#8a94a6]">
          Tem certeza que deseja excluir <strong className="text-[#434A57] dark:text-[#f5f9fc]">{deletingPaciente?.name}</strong>?
          Esta ação não pode ser desfeita.
        </p>
      </Modal>
    </div>
  )
}
