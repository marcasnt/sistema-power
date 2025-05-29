import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Tables, TablesInsert } from "@/integrations/supabase/types"

export type Athlete = Tables<"athletes"> & {
  weight_categories?: Tables<"weight_categories">
}

export type AthleteInsert = TablesInsert<"athletes">

export const useAthletes = () => {
  return useQuery({
    queryKey: ["athletes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("athletes")
        .select(`
          *,
          weight_categories (
            name,
            gender
          )
        `)
        .order("name")

      if (error) throw error
      return data as Athlete[]
    },
  })
}

export const useCreateAthlete = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (athlete: AthleteInsert) => {
      const { data, error } = await supabase
        .from("athletes")
        .insert(athlete)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] })
    },
  })
}

export const useWeightCategories = () => {
  return useQuery({
    queryKey: ["weight-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weight_categories")
        .select("*")
        .order("gender", { ascending: true })
        .order("max_weight", { ascending: true, nullsLast: true })

      if (error) throw error
      return data
    },
  })
}

export const useCompetitionAthletes = (competitionId?: string) => {
  return useQuery({
    queryKey: ["competition-athletes", competitionId],
    queryFn: async () => {
      if (!competitionId) return [];
      const { data, error } = await supabase
        .from("competition_athletes")
        .select(`
          *,
          athlete:athlete_id (*, weight_categories (name, gender)),
          platform:platform_id (id, name, type)
        `)
        .eq("competition_id", competitionId)
        .eq("status", "inscrito");
      if (error) throw error;
      // Mapear para devolver los datos del atleta y la tarima
      return (data || []).map((row: any) => ({
        ...row.athlete,
        platform: row.platform,
        status: row.current_status || "waiting",
        currentAttempt: row.current_attempt || 1,
        currentLift: row.current_lift || "squat"
      }));
    },
    enabled: !!competitionId,
  });
};
