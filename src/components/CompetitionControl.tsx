import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompetitionPlatforms } from "@/hooks/useCompetitions";
import { useCompetitionAthletes } from "@/hooks/useAthletes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNotifications } from "@/hooks/use-notifications";
import { Timer } from "@/components/Timer";
import { cn } from "@/lib/utils";

type AthleteStatus = "waiting" | "current" | "completed";

interface AthleteWithStatus {
  id: string;
  name: string;
  gender: string;
  weight: number;
  platform: {
    id: string;
    name: string;
  } | null;
  status: AthleteStatus;
  currentAttempt: number;
  currentLift: "squat" | "bench" | "deadlift";
}

export const CompetitionControl = ({ competitionId }: { competitionId: string }) => {
  const { data: platforms = [] } = useCompetitionPlatforms(competitionId);
  const { data: athletes = [], refetch } = useCompetitionAthletes(competitionId);
  const queryClient = useQueryClient();
  const { success, error: showError } = useNotifications();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentAthlete, setCurrentAthlete] = useState<AthleteWithStatus | null>(null);

  // Filtrar atletas por plataforma seleccionada
  const filteredAthletes = selectedPlatform === "all" 
    ? athletes 
    : athletes.filter(athlete => athlete.platform?.id === selectedPlatform);

  // Mutación para actualizar el estado del atleta
  const updateAthleteStatusMutation = useMutation({
    mutationFn: async ({ athleteId, status, attempt, lift }: { 
      athleteId: string; 
      status: AthleteStatus;
      attempt: number;
      lift: "squat" | "bench" | "deadlift";
    }) => {
      const { error } = await supabase
        .from("competition_athletes")
        .update({ 
          current_status: status,
          current_attempt: attempt,
          current_lift: lift
        })
        .eq("athlete_id", athleteId)
        .eq("competition_id", competitionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["competition-athletes", competitionId] });
    },
    onError: (error) => {
      showError(`Error actualizando estado: ${error.message}`);
    },
  });

  const handleStartAttempt = (athlete: AthleteWithStatus) => {
    setCurrentAthlete(athlete);
    setIsTimerRunning(true);
    updateAthleteStatusMutation.mutate({
      athleteId: athlete.id,
      status: "current",
      attempt: athlete.currentAttempt,
      lift: athlete.currentLift
    });
  };

  const handleCompleteAttempt = (result: "valid" | "invalid") => {
    if (!currentAthlete) return;

    // Actualizar el estado del atleta
    updateAthleteStatusMutation.mutate({
      athleteId: currentAthlete.id,
      status: "completed",
      attempt: currentAthlete.currentAttempt,
      lift: currentAthlete.currentLift
    });

    // Registrar el intento
    supabase.from("attempts").insert({
      athlete_id: currentAthlete.id,
      competition_id: competitionId,
      lift_type: currentAthlete.currentLift,
      attempt_number: currentAthlete.currentAttempt,
      result: result,
      weight: 0, // TODO: Agregar peso del intento
    });

    setCurrentAthlete(null);
    setIsTimerRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Controles de Plataforma */}
      <Card>
        <CardHeader>
          <CardTitle>Control de Competencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar Tarima" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las Tarimas</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Temporizador */}
          <div className="mb-6">
            <Timer isRunning={isTimerRunning} onComplete={() => handleCompleteAttempt("invalid")} />
          </div>

          {/* Lista de Atletas */}
          <div className="space-y-4">
            {filteredAthletes.map((athlete) => (
              <Card key={athlete.id} className={cn(
                "transition-colors",
                athlete.status === "current" && "border-power-primary",
                athlete.status === "completed" && "opacity-50"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{athlete.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {athlete.gender} - {athlete.weight}kg
                        {athlete.platform && (
                          <Badge variant="secondary" className="ml-2">
                            {athlete.platform.name}
                          </Badge>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {athlete.status === "waiting" && (
                        <Button 
                          onClick={() => handleStartAttempt(athlete)}
                          disabled={isTimerRunning}
                        >
                          Iniciar Intento
                        </Button>
                      )}
                      {athlete.status === "current" && (
                        <div className="flex gap-2">
                          <Button 
                            variant="destructive"
                            onClick={() => handleCompleteAttempt("invalid")}
                          >
                            Fallido
                          </Button>
                          <Button 
                            variant="default"
                            onClick={() => handleCompleteAttempt("valid")}
                          >
                            Válido
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 