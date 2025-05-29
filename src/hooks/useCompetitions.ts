
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Tables, TablesInsert } from "@/integrations/supabase/types"

export type Competition = Tables<"competitions">
export type CompetitionInsert = TablesInsert<"competitions">

export const useCompetitions = () => {
  return useQuery({
    queryKey: ["competitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .order("date", { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export const useCreateCompetition = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (competition: CompetitionInsert) => {
      const { data, error } = await supabase
        .from("competitions")
        .insert(competition)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["competitions"] })
    },
  })
}

export const useActiveCompetition = () => {
  return useQuery({
    queryKey: ["active-competition"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .eq("status", "En Progreso")
        .single()

      if (error && error.code !== "PGRST116") throw error
      return data
    },
  })
}
