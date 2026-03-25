import { api } from '@/lib/api'
import type { Clinica, ClinicaUpdate } from '@/types'

type ClinicaCreate = {
  company_id?: number
  phone: string
  name?: string
  address?: string
  cep?: string
  owner_phone?: string
  emergency_contact?: string
  assistant_name?: string
}

export const clinicaService = {
  async createClinica(data: ClinicaCreate): Promise<Clinica> {
    const response = await api.post<Clinica>('/clinicas', data)
    return response.data
  },

  async listClinicas(params?: { skip?: number; limit?: number; is_active?: boolean }): Promise<Clinica[]> {
    const response = await api.get<Clinica[]>('/clinicas', { params })
    return response.data
  },

  async getClinica(clinicaId: number): Promise<Clinica> {
    const response = await api.get<Clinica>(`/clinicas/${clinicaId}`)
    return response.data
  },

  async updateClinica(clinicaId: number, data: ClinicaUpdate): Promise<Clinica> {
    const response = await api.patch<Clinica>(`/clinicas/${clinicaId}`, data)
    return response.data
  },
}
