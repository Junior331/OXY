import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from '@/components/molecules/Modal'
import { FormField } from '@/components/molecules/FormField'
import { Select } from '@/components/atoms/Select'
import { TextArea } from '@/components/atoms/TextArea'
import { Input } from '@/components/atoms/Input'
import { maskDate, dateToISO, dateFromISO } from '@/lib/masks'
import { PACIENTE_SIZE_OPTIONS_WITH_PLACEHOLDER, normalizePacienteSize } from '@/lib/pacienteSize'
import type { Paciente } from '@/types'
import type { PacienteCreate, PacienteUpdate } from '@/services/pacienteService'

export interface PacienteFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PacienteCreate | PacienteUpdate) => Promise<void>
  paciente?: Paciente | null
  clientId: string
  clinicaId: number
}

interface PacienteFormData {
  name: string
  species: string
  breed: string
  age: string
  size: string
  weight: string
  color: string
  medical_info: string
  vaccination_date: string
  last_vet_visit: string
  emergency_contact: string
}

const speciesOptions = [
  { value: '', label: 'Selecione a espécie' },
  { value: 'cachorro', label: 'Cachorro' },
  { value: 'gato', label: 'Gato' },
  { value: 'ave', label: 'Ave' },
  { value: 'roedor', label: 'Roedor' },
  { value: 'reptil', label: 'Réptil' },
  { value: 'peixe', label: 'Peixe' },
  { value: 'outro', label: 'Outro' },
]

const sizeOptions = [...PACIENTE_SIZE_OPTIONS_WITH_PLACEHOLDER]

export function PacienteFormModal({
  isOpen,
  onClose,
  onSubmit,
  paciente,
  clientId,
  clinicaId,
}: PacienteFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!paciente

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PacienteFormData>({
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      age: '',
      size: '',
      weight: '',
      color: '',
      medical_info: '',
      vaccination_date: '',
      last_vet_visit: '',
      emergency_contact: '',
    },
  })

  useEffect(() => {
    if (paciente) {
      reset({
        name: paciente.name || '',
        species: paciente.species || '',
        breed: paciente.breed || '',
        age: paciente.age?.toString() || '',
        size: normalizePacienteSize(paciente.size) ?? '',
        weight: paciente.weight?.toString() || '',
        color: paciente.color || '',
        medical_info: (typeof paciente.medical_info === 'string' ? paciente.medical_info : '') || '',
        vaccination_date: paciente.vaccination_date ? dateFromISO(paciente.vaccination_date.split('T')[0]) : '',
        last_vet_visit: paciente.last_vet_visit ? dateFromISO(paciente.last_vet_visit.split('T')[0]) : '',
        emergency_contact: paciente.emergency_contact || '',
      })
    } else {
      reset({
        name: '',
        species: '',
        breed: '',
        age: '',
        size: '',
        weight: '',
        color: '',
        medical_info: '',
        vaccination_date: '',
        last_vet_visit: '',
        emergency_contact: '',
      })
    }
  }, [paciente, reset, isOpen])

  const handleFormSubmit = async (data: PacienteFormData) => {
    setIsLoading(true)
    try {
      
      const vaccinationISO = data.vaccination_date ? dateToISO(data.vaccination_date) : undefined
      const lastVetISO = data.last_vet_visit ? dateToISO(data.last_vet_visit) : undefined

      const payload: PacienteCreate | PacienteUpdate = {
        ...(isEditing ? {} : { clinica_id: clinicaId, client_id: clientId }),
        name: data.name,
        species: data.species || undefined,
        breed: data.breed || undefined,
        age: data.age ? parseInt(data.age) : undefined,
        size: data.size || undefined,
        weight: data.weight ? parseFloat(data.weight) : undefined,
        color: data.color || undefined,
        medical_info: data.medical_info ? { conditions: [data.medical_info] } : undefined,
        vaccination_date: vaccinationISO || undefined,
        last_vet_visit: lastVetISO || undefined,
        emergency_contact: data.emergency_contact || undefined,
      }

      await onSubmit(payload)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar paciente:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Paciente' : 'Cadastrar Paciente'}
      onSubmit={handleSubmit(handleFormSubmit)}
      submitText={isEditing ? 'Salvar' : 'Cadastrar'}
      isLoading={isLoading}
      className="sm:max-w-lg"
    >
      <div className="flex flex-col gap-4">
        <FormField
          id="name"
          label="Nome do Paciente"
          required
          placeholder="Ex: Rex, Luna, Mel..."
          error={errors.name?.message}
          {...register('name', { required: 'Nome é obrigatório' })}
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#434A57] dark:text-[#c5cdd9]">
              Espécie <span className="text-red-500">*</span>
            </label>
            <Select
              options={speciesOptions}
              {...register('species', { required: 'Espécie é obrigatória' })}
            />
            {errors.species && (
              <p className="text-xs text-red-500">{errors.species.message}</p>
            )}
          </div>

          <FormField
            id="breed"
            label="Raça"
            placeholder="Ex: Labrador, Sem raça definida..."
            {...register('breed')}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField
            id="age"
            label="Idade"
            type="number"
            placeholder="Anos"
            {...register('age')}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#434A57] dark:text-[#c5cdd9]">
              Porte <span className="text-red-500">*</span>
            </label>
            <Select
              options={sizeOptions}
              {...register('size', { required: 'Porte é obrigatório' })}
            />
            {errors.size && (
              <p className="text-xs text-red-500">{errors.size.message}</p>
            )}
          </div>

          <FormField
            id="weight"
            label="Peso (kg)"
            type="number"
            step="0.1"
            placeholder="Ex: 5.5"
            {...register('weight')}
          />
        </div>

        <FormField
          id="color"
          label="Cor/Pelagem"
          placeholder="Ex: Caramelo, Preto e branco..."
          {...register('color')}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#434A57] dark:text-[#c5cdd9]">
            Informações Médicas
          </label>
          <TextArea
            placeholder="Alergias, medicações, condições especiais..."
            rows={3}
            {...register('medical_info')}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            id="vaccination_date"
            label="Última Vacinação"
            placeholder="DD/MM/AAAA"
            maxLength={10}
            {...register('vaccination_date', {
              onChange: (e) => {
                e.target.value = maskDate(e.target.value)
              }
            })}
          />

          <FormField
            id="last_vet_visit"
            label="Última Consulta"
            placeholder="DD/MM/AAAA"
            maxLength={10}
            {...register('last_vet_visit', {
              onChange: (e) => {
                e.target.value = maskDate(e.target.value)
              }
            })}
          />
        </div>

        <FormField
          id="emergency_contact"
          label="Contato de Emergência"
          placeholder="(00) 00000-0000"
          {...register('emergency_contact')}
        />
      </div>
    </Modal>
  )
}
