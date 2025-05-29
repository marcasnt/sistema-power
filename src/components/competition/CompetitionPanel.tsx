import React from 'react';
import { Card } from "@/components/ui/card";
import { Timer } from "@/components/competition/Timer";
import { AthleteInfo } from "@/components/competition/AthleteInfo";
import { AttemptStatus } from "@/components/competition/AttemptStatus";

interface CompetitionPanelProps {
  currentAthlete: {
    name: string;
    weight: number;
    attempt: number;
  };
  timeRemaining: number;
  status: 'preparing' | 'attempting' | 'completed';
  result?: 'white' | 'red';
}

export function CompetitionPanel({
  currentAthlete,
  timeRemaining,
  status,
  result
}: CompetitionPanelProps) {
  return (
    <Card className="p-6 bg-background">
      <div className="grid grid-cols-1 gap-4">
        <AthleteInfo
          name={currentAthlete.name}
          weight={currentAthlete.weight}
          attempt={currentAthlete.attempt}
        />
        <Timer timeRemaining={timeRemaining} />
        <AttemptStatus status={status} result={result} />
      </div>
    </Card>
  );
} 