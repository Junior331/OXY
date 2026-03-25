import { useState, useCallback } from 'react'
import { pacienteService, PacienteCreate, PacienteUpdate } from '@/services/pacienteService'
import type { Paciente } from '@/types'

interface UsePacientesReturn {
  pacientes: Paciente[]
  loading: boolean
  error: string | null
  fetchPacientes: (params?: {
    clinica_id?: number
    client_id?: string
    species?: string
    limit?: number
    offset?: number
  }) => Promise<Paciente[]>
  getPaciente: (id: string) => Promise<Paciente>
  createPaciente: (data: PacienteCreate) => Promise<Paciente>
  updatePaciente: (id: string, updates: PacienteUpdate) => Promise<Paciente>
  deletePaciente: (id: string) => Promise<void>
  getClientPacientes: (clientId: string, clinicaId?: number) => Promise<Paciente[]>
}

export function usePacientes(): UsePacientesReturn {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPacientes = useCallback(
    async (params?: {
      clinica_id?: number
      client_id?: string
      species?: string
      limit?: number
      offset?: number
    }) => {
      try {
        setLoading(true)
        setError(null)
        const data = await pacienteService.listPacientes(params)
        setPacientes(data)
        return data
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Erro ao carregar pacientes')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getPaciente = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      return await pacienteService.getPaciente(id)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao carregar paciente')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createPaciente = useCallback(async (data: PacienteCreate) => {
    try {
      setLoading(true)
      setError(null)
      const newPaciente = await pacienteService.createPaciente(data)
      setPacientes((prev) => [...prev, newPaciente])
      return newPaciente
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar paciente')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePaciente = useCallback(async (id: string, updates: PacienteUpdate) => {
    try {
      setLoading(true)
      setError(null)
      const updated = await pacienteService.updatePaciente(id, updates)
      setPacientes((prev) => prev.map((p) => (p.id === id ? updated : p)))
      return updated
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao atualizar paciente')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePaciente = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      await pacienteService.deletePaciente(id)
      setPacientes((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao remover paciente')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getClientPacientes = useCallback(
    async (clientId: string, clinicaId?: number) => {
      try {
        setLoading(true)
        setError(null)
        const data = await pacienteService.getClientPacientes(clientId, clinicaId)
        setPacientes(data)
        return data
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Erro ao carregar pacientes do cliente')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    pacientes,
    loading,
    error,
    fetchPacientes,
    getPaciente,
    createPaciente,
    updatePaciente,
    deletePaciente,
    getClientPacientes,
  }
}
