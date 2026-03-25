import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { clinicaService, serviceService } from "@/services";
import type { Clinica, Service } from "@/types";

interface SettingsContextType {
  // Data
  clinica: Clinica | null;
  services: Service[];
  businessHours: Clinica["businessHours"] | null;
  defaultCapacityPerHour: number | null;
  customCapacityHours: Record<string, unknown> | null;

  // Loading states
  loadingClinica: boolean;
  loadingServices: boolean;

  // Error states
  clinicaError: string | null;
  servicesError: string | null;

  // Mutations
  updateClinica: (data: any) => Promise<void>;
  createService: (data: any) => Promise<Service>;
  updateService: (id: number, data: any) => Promise<Service>;
  deleteService: (id: number) => Promise<void>;

  // Refresh
  refetchClinica: () => Promise<void>;
  refetchServices: () => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({
  children,
  clinicaId,
}: {
  children: React.ReactNode;
  clinicaId: number;
}) {
  // State
  const [clinica, setClinica] = useState<Clinica | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingClinica, setLoadingClinica] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [clinicaError, setClinicaError] = useState<string | null>(null);
  const [servicesError, setServicesError] = useState<string | null>(null);

  // Fetch clinica (com cache)
  const refetchClinica = useCallback(async () => {
    if (!clinicaId) {
      setLoadingClinica(false);
      return;
    }

    try {
      setClinicaError(null);
      const data = await clinicaService.getClinica(clinicaId);
      setClinica(data);
    } catch (error: any) {
      console.error("Erro ao carregar clinica:", error);
      setClinicaError(error?.message || "Erro ao carregar dados da clínica");
    } finally {
      setLoadingClinica(false);
    }
  }, [clinicaId]);

  // Fetch services (com cache)
  const refetchServices = useCallback(async () => {
    if (!clinicaId) {
      setLoadingServices(false);
      return;
    }

    try {
      setServicesError(null);
      const list = await serviceService.listServices();
      setServices(list);
    } catch (error: any) {
      console.error("Erro ao carregar serviços:", error);
      setServicesError(error?.message || "Erro ao carregar serviços");
    } finally {
      setLoadingServices(false);
    }
  }, [clinicaId]);

  // Load data on mount
  useEffect(() => {
    refetchClinica();
  }, [refetchClinica]);

  useEffect(() => {
    refetchServices();
  }, [refetchServices]);

  // Mutations
  const updateClinica = useCallback(
    async (data: any) => {
      if (!clinicaId) throw new Error("Clinica ID not found");

      try {
        await clinicaService.updateClinica(clinicaId, data);
        await refetchClinica();
      } catch (error) {
        throw error;
      }
    },
    [clinicaId, refetchClinica],
  );

  const createService = useCallback(async (data: any) => {
    try {
      const service = await serviceService.createService(data);
      setServices((prev) => [...prev, service]);
      return service;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateService = useCallback(async (id: number, data: any) => {
    try {
      const updated = await serviceService.updateService(id, data);
      setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
      return updated;
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteService = useCallback(async (id: number) => {
    try {
      await serviceService.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      throw error;
    }
  }, []);

  const value = useMemo<SettingsContextType>(
    () => ({
      clinica,
      services,
      businessHours: clinica?.businessHours || null,
      defaultCapacityPerHour: (clinica as any)?.defaultCapacityPerHour || null,
      customCapacityHours: (clinica as any)?.customCapacityHours || null,
      loadingClinica,
      loadingServices,
      clinicaError,
      servicesError,
      updateClinica,
      createService,
      updateService,
      deleteService,
      refetchClinica,
      refetchServices,
    }),
    [
      clinica,
      services,
      loadingClinica,
      loadingServices,
      clinicaError,
      servicesError,
      updateClinica,
      createService,
      updateService,
      deleteService,
      refetchClinica,
      refetchServices,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
