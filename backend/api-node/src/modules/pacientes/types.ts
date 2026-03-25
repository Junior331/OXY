/**
 * Paciente types and interfaces
 */

export interface CreatePacienteDTO {
  client_id: string
  name: string
  species?: string
  breed?: string
  age?: number
  size?: string
  weight?: number
  color?: string
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

export interface UpdatePacienteDTO {
  name?: string
  species?: string
  breed?: string
  age?: number
  size?: string
  weight?: number
  color?: string
  medical_info?: {
    allergies?: string[]
    medications?: string[]
    conditions?: string[]
  }
  vaccination_date?: string
  last_vet_visit?: string
  emergency_contact?: string
  photo_url?: string
  isActive?: boolean
}

export interface PacienteListQuery {
  client_id?: string
  species?: string
  limit?: number
  offset?: number
}
