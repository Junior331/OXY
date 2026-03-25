import { api } from '@/lib/api'
import type {
  AestheticService,
  AestheticBookingRequest,
  CheckInRequest,
  CompleteServiceRequest,
  AestheticStats,
  PriceCalculationRequest,
  PriceCalculationResponse,
} from '@/types'

export const aestheticsService = {

  async createBooking(
    clinicaId: number,
    bookingData: AestheticBookingRequest
  ): Promise<AestheticService> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.post<AestheticService>(
      '/aesthetics/book',
      bookingData,
      {
        params: { clinica_id: clinicaId },
      }
    )
    return response.data
  },

  async getScheduledServices(
    clinicaId: number,
    targetDate?: string
  ): Promise<AestheticService[]> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.get<AestheticService[]>(
      '/aesthetics/scheduled',
      {
        params: {
          clinica_id: clinicaId,
          ...(targetDate && { target_date: targetDate }),
        },
      }
    )
    return response.data
  },

  async getInProgressServices(
    clinicaId: number
  ): Promise<AestheticService[]> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.get<AestheticService[]>(
      '/aesthetics/in-progress',
      {
        params: { clinica_id: clinicaId },
      }
    )
    return response.data
  },

  async getCompletedServices(
    clinicaId: number,
    startDate?: string,
    endDate?: string
  ): Promise<AestheticService[]> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.get<AestheticService[]>(
      '/aesthetics/completed',
      {
        params: {
          clinica_id: clinicaId,
          ...(startDate && { start_date: startDate }),
          ...(endDate && { end_date: endDate }),
        },
      }
    )
    return response.data
  },

  async checkIn(
    bookingId: string,
    clinicaId: number,
    checkInData: CheckInRequest
  ): Promise<AestheticService> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.put<AestheticService>(
      `/aesthetics/${bookingId}/check-in`,
      checkInData,
      {
        params: { clinica_id: clinicaId },
      }
    )
    return response.data
  },

  async startService(
    bookingId: string,
    clinicaId: number
  ): Promise<AestheticService> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.put<AestheticService>(
      `/aesthetics/${bookingId}/start`,
      {},
      {
        params: { clinica_id: clinicaId },
      }
    )
    return response.data
  },

  async completeService(
    bookingId: string,
    clinicaId: number,
    completeData: CompleteServiceRequest
  ): Promise<AestheticService> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.put<AestheticService>(
      `/aesthetics/${bookingId}/complete`,
      completeData,
      {
        params: { clinica_id: clinicaId },
      }
    )
    return response.data
  },

  async cancelBooking(
    bookingId: string,
    clinicaId: number,
    reason?: string
  ): Promise<AestheticService> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.put<AestheticService>(
      `/aesthetics/${bookingId}/cancel`,
      { reason },
      {
        params: { clinica_id: clinicaId },
      }
    )
    return response.data
  },

  async getStats(
    clinicaId: number,
    startDate?: string,
    endDate?: string
  ): Promise<AestheticStats> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.get<AestheticStats>('/aesthetics/stats', {
      params: {
        clinica_id: clinicaId,
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      },
    })
    return response.data
  },

  async calculatePrice(
    priceData: PriceCalculationRequest
  ): Promise<PriceCalculationResponse> {
    // TODO: Backend — endpoint não implementado em api-node ainda. Implementar em backend/api-node/src/modules/
    const response = await api.post<PriceCalculationResponse>(
      '/aesthetics/calculate-price',
      priceData
    )
    return response.data
  },
}
