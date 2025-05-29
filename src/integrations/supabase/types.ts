export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      athletes: {
        Row: {
          age: number
          bench_opener: number | null
          category_id: string | null
          club: string
          created_at: string
          deadlift_opener: number | null
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          name: string
          squat_opener: number | null
          updated_at: string
          weight: number
        }
        Insert: {
          age: number
          bench_opener?: number | null
          category_id?: string | null
          club: string
          created_at?: string
          deadlift_opener?: number | null
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          name: string
          squat_opener?: number | null
          updated_at?: string
          weight: number
        }
        Update: {
          age?: number
          bench_opener?: number | null
          category_id?: string | null
          club?: string
          created_at?: string
          deadlift_opener?: number | null
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          name?: string
          squat_opener?: number | null
          updated_at?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "athletes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "weight_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      attempts: {
        Row: {
          athlete_id: string
          attempt_number: number
          competition_id: string
          created_at: string
          id: string
          lift_type: Database["public"]["Enums"]["lift_type"]
          result: Database["public"]["Enums"]["attempt_result"]
          timestamp: string | null
          weight: number
        }
        Insert: {
          athlete_id: string
          attempt_number: number
          competition_id: string
          created_at?: string
          id?: string
          lift_type: Database["public"]["Enums"]["lift_type"]
          result?: Database["public"]["Enums"]["attempt_result"]
          timestamp?: string | null
          weight: number
        }
        Update: {
          athlete_id?: string
          attempt_number?: number
          competition_id?: string
          created_at?: string
          id?: string
          lift_type?: Database["public"]["Enums"]["lift_type"]
          result?: Database["public"]["Enums"]["attempt_result"]
          timestamp?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "attempts_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempts_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_athletes: {
        Row: {
          athlete_id: string
          category_id: string | null
          competition_id: string
          created_at: string
          id: string
          lot_number: number | null
          weigh_in_weight: number | null
<<<<<<< HEAD
          platform_id: string | null
          current_status: "waiting" | "current" | "completed" | null
          current_attempt: number | null
          current_lift: Database["public"]["Enums"]["lift_type"] | null
=======
>>>>>>> 9b5e8b02af396b1f28e0a6c0323df126efd1bb46
        }
        Insert: {
          athlete_id: string
          category_id?: string | null
          competition_id: string
          created_at?: string
          id?: string
          lot_number?: number | null
          weigh_in_weight?: number | null
<<<<<<< HEAD
          platform_id?: string | null
          current_status?: "waiting" | "current" | "completed" | null
          current_attempt?: number | null
          current_lift?: Database["public"]["Enums"]["lift_type"] | null
=======
>>>>>>> 9b5e8b02af396b1f28e0a6c0323df126efd1bb46
        }
        Update: {
          athlete_id?: string
          category_id?: string | null
          competition_id?: string
          created_at?: string
          id?: string
          lot_number?: number | null
          weigh_in_weight?: number | null
<<<<<<< HEAD
          platform_id?: string | null
          current_status?: "waiting" | "current" | "completed" | null
          current_attempt?: number | null
          current_lift?: Database["public"]["Enums"]["lift_type"] | null
=======
>>>>>>> 9b5e8b02af396b1f28e0a6c0323df126efd1bb46
        }
        Relationships: [
          {
            foreignKeyName: "competition_athletes_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_athletes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "weight_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_athletes_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
<<<<<<< HEAD
          {
            foreignKeyName: "competition_athletes_platform_id_fkey",
            columns: ["platform_id"],
            isOneToOne: false,
            referencedRelation: "platforms",
            referencedColumns: ["id"]
          }
=======
>>>>>>> 9b5e8b02af396b1f28e0a6c0323df126efd1bb46
        ]
      }
      competition_results: {
        Row: {
          athlete_id: string
          best_bench: number | null
          best_deadlift: number | null
          best_squat: number | null
          category_id: string
          competition_id: string
          created_at: string
          id: string
          position: number | null
          total: number | null
          updated_at: string
        }
        Insert: {
          athlete_id: string
          best_bench?: number | null
          best_deadlift?: number | null
          best_squat?: number | null
          category_id: string
          competition_id: string
          created_at?: string
          id?: string
          position?: number | null
          total?: number | null
          updated_at?: string
        }
        Update: {
          athlete_id?: string
          best_bench?: number | null
          best_deadlift?: number | null
          best_squat?: number | null
          category_id?: string
          competition_id?: string
          created_at?: string
          id?: string
          position?: number | null
          total?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_results_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_results_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "weight_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_results_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          created_at: string
          current_lift: Database["public"]["Enums"]["lift_type"] | null
          current_round: number | null
          date: string
          description: string | null
          id: string
          location: string
          name: string
          status: Database["public"]["Enums"]["competition_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_lift?: Database["public"]["Enums"]["lift_type"] | null
          current_round?: number | null
          date: string
          description?: string | null
          id?: string
          location: string
          name: string
          status?: Database["public"]["Enums"]["competition_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_lift?: Database["public"]["Enums"]["lift_type"] | null
          current_round?: number | null
          date?: string
          description?: string | null
          id?: string
          location?: string
          name?: string
          status?: Database["public"]["Enums"]["competition_status"]
          updated_at?: string
        }
        Relationships: []
      }
<<<<<<< HEAD
      platforms: {
        Row: {
          id: string
          name: string
          competition_id: string | null
          type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          competition_id?: string | null
          type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          competition_id?: string | null
          type?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platforms_competition_id_fkey",
            columns: ["competition_id"],
            isOneToOne: false,
            referencedRelation: "competitions",
            referencedColumns: ["id"]
          }
        ]
      }
=======
>>>>>>> 9b5e8b02af396b1f28e0a6c0323df126efd1bb46
      weight_categories: {
        Row: {
          created_at: string
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          max_weight: number | null
          min_weight: number | null
          name: string
        }
        Insert: {
          created_at?: string
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          max_weight?: number | null
          min_weight?: number | null
          name: string
        }
        Update: {
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          max_weight?: number | null
          min_weight?: number | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      attempt_result: "valid" | "invalid" | "pending"
      competition_status: "Próximo" | "En Progreso" | "Finalizado" | "Cancelado"
      gender_type: "Masculino" | "Femenino"
      lift_type: "squat" | "bench" | "deadlift"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attempt_result: ["valid", "invalid", "pending"],
      competition_status: ["Próximo", "En Progreso", "Finalizado", "Cancelado"],
      gender_type: ["Masculino", "Femenino"],
      lift_type: ["squat", "bench", "deadlift"],
    },
  },
} as const
