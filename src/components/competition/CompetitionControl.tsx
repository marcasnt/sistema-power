import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CompetitionControlProps {
  onStartAttempt: () => void;
  onMarkAttempt: (result: 'white' | 'red') => void;
  onPauseCompetition: () => void;
  onNextAthlete: () => void;
  isPaused: boolean;
}

export function CompetitionControl({
  onStartAttempt,
  onMarkAttempt,
  onPauseCompetition,
  onNextAthlete,
  isPaused
}: CompetitionControlProps) {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={onStartAttempt}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Iniciar Intento
        </Button>
        
        <Button
          onClick={onPauseCompetition}
          className={isPaused ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}
        >
          {isPaused ? "Reanudar" : "Pausar"}
        </Button>

        <Button
          onClick={() => onMarkAttempt('white')}
          className="bg-green-500 hover:bg-green-600"
        >
          Marcar Válido
        </Button>

        <Button
          onClick={() => onMarkAttempt('red')}
          className="bg-red-500 hover:bg-red-600"
        >
          Marcar No Válido
        </Button>

        <Button
          onClick={onNextAthlete}
          className="col-span-2 bg-purple-500 hover:bg-purple-600"
        >
          Siguiente Atleta
        </Button>
      </div>
    </Card>
  );
} 