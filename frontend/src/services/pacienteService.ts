import { api } from '@/lib/api'
import type { Paciente } from '@/types'

export interface PacienteCreate {
  clinica_id: number
  client_id: string
  name: string
  species?: string
  breed?: string
  age?: number
  birthDate?: string
  birth_date?: string
  size?: string
  weight?: number
  weightKg?: number
  weight_kg?: number
  color?: string
  notes?: string
  medical_info?: {
    allergies?: string[]
    medications?: string[]
    conditions?: string[]
  }
  vaccination_date?: string
  last_vet_visit?: string
  emergency_contact?: string
  photo_url?: string
}

export interface PacienteUpdate {
  name?: string
  species?: string
  breed?: string
  age?: number
  birthDate?: string
  birth_date?: string
  size?: string
  weight?: number
  weightKg?: number
  weight_kg?: number
  color?: string
  notes?: string
  medical_info?: {
    allergies?: string[]
    medications?: string[]
    conditions?: string[]
  }
  vaccination_date?: string
  last_vet_visit?: string
  emergency_contact?: string
  photo_url?: string
}

export const pacienteService = {
  async listPacientes(params?: {
    clinica_id?: number
    client_id?: string
    species?: string
    limit?: number
    offset?: number
  }): Promise<Paciente[]> {
    const response = await api.get<Paciente[]>('/pacientes', { params })
    return response.data
  },
  async getPaciente(pacienteId: string): Promise<Paciente> {
    const response = await api.get<Paciente>(`/pacientes/${pacienteId}`)
    return response.data
  },
  async createPaciente(pacienteData: PacienteCreate): Promise<Paciente> {
    const { clinica_id, ...body } = pacienteData
    const response = await api.post<Paciente>('/pacientes', body, {
      params: { clinica_id },
    })
    return response.data
  },
  async updatePaciente(pacienteId: string, updates: PacienteUpdate): Promise<Paciente> {
    const response = await api.put<Paciente>(`/pacientes/${pacienteId}`, updates)
    return response.data
  },
  async deletePaciente(pacienteId: string): Promise<void> {
    await api.delete(`/pacientes/${pacienteId}`)
  },
  async getClientPacientes(clientId: string, clinicaId?: number): Promise<Paciente[]> {
    const response = await api.get<Paciente[]>(`/clients/${clientId}/pacientes`, {
      params: clinicaId ? { clinica_id: clinicaId } : {},
    })
    return response.data
  },
}
