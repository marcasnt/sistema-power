import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Competition } from "@/integrations/supabase/types"
import { useNotifications } from "@/hooks/use-notifications"

export type CompetitionStatus = "Próximo" | "En Progreso" | "Finalizado" | "Cancelado"

export interface Competition {
  id: string
  name: string
  date: string
  location: string
  description: string | null
  status: CompetitionStatus
  created_at: string
  athleteCount?: number
}

export function useCompetitions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["competitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .order("date", { ascending: true })

      if (error) throw error
      return data as Competition[]
    },
  })

  return { data, isLoading, error }
}

export function useCompetition(id?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["competition", id],
    queryFn: async () => {
      if (!id) throw new Error("No competition ID provided")

      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error
      return data as Competition
    },
    enabled: !!id,
  })

  return { data, isLoading, error }
}

export function useCreateCompetition() {
  const queryClient = useQueryClient()
  const { success, error: showError } = useNotifications()

  return useMutation({
    mutationFn: async (newCompetition: Omit<Competition, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("competitions")
        .insert([newCompetition])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["competitions"] })
      success(
        "Competencia creada",
        "La competencia ha sido creada exitosamente"
      )
    },
    onError: (error) => {
      showError(
        "Error al crear competencia",
        error.message || "Ocurrió un error al crear la competencia"
      )
    },
  })
}

export function useUpdateCompetition() {
  const queryClient = useQueryClient()
  const { success, error: showError } = useNotifications()

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Competition> & { id: string }) => {
      const { data, error } = await supabase
        .from("competitions")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["competitions"] })
      success(
        "Competencia actualizada",
        "La competencia ha sido actualizada exitosamente"
      )
    },
    onError: (error) => {
      showError(
        "Error al actualizar competencia",
        error.message || "Ocurrió un error al actualizar la competencia"
      )
    },
  })
}

export function useDeleteCompetition() {
  const queryClient = useQueryClient()
  const { success, error: showError } = useNotifications()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("competitions")
        .delete()
        .eq("id", id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["competitions"] })
      success(
        "Competencia eliminada",
        "La competencia ha sido eliminada exitosamente"
      )
    },
    onError: (error) => {
      showError(
        "Error al eliminar competencia",
        error.message || "Ocurrió un error al eliminar la competencia"
      )
    },
  })
}

export function useActiveCompetition() {
  return useQuery({
    queryKey: ["active-competition"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .eq("status", "En Progreso")
        .order("date", { ascending: false })
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data as Competition | null;
    },
  });
}

export const useCompetitionPlatforms = (competitionId?: string) => {
  return useQuery({
    queryKey: ["competition-platforms", competitionId],
    queryFn: async () => {
      if (!competitionId) return [];
      const { data, error } = await supabase
        .from("platforms")
        .select("*")
        .eq("competition_id", competitionId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!competitionId,
  });
};

export const useCreatePlatform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPlatform: { name: string; type?: string | null; competition_id: string }) => {
      const { data, error } = await supabase
        .from("platforms")
        .insert([newPlatform])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["competition-platforms", variables.competition_id] });
    },
  });
};

export const useDeletePlatform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (platformId: string) => {
      const { error } = await supabase
        .from("platforms")
        .delete()
        .eq("id", platformId);
      if (error) throw error;
    },
    onSuccess: (data, platformId) => {
      // Invalidate all queries for platforms and competition athletes
      queryClient.invalidateQueries({ queryKey: ["competition-platforms"] });
      queryClient.invalidateQueries({ queryKey: ["competition-athletes"] }); // Athletes might be assigned to this platform
    },
  });
};
