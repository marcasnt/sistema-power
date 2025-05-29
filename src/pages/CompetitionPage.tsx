import React, { useState, useEffect } from 'react';
import { CompetitionPanel } from '@/components/competition/CompetitionPanel';
import { ResultsTable } from '@/components/competition/ResultsTable';
import { CompetitionControl } from '@/components/competition/CompetitionControl';

export function CompetitionPage() {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isPaused, setIsPaused] = useState(false);
  const [currentAthlete, setCurrentAthlete] = useState({
    name: "Juan Pérez",
    weight: 150,
    attempt: 1
  });
  const [status, setStatus] = useState<'preparing' | 'attempting' | 'completed'>('preparing');
  const [result, setResult] = useState<'white' | 'red' | undefined>(undefined);

  const [athletes] = useState([
    {
      id: "1",
      name: "Juan Pérez",
      position: 1,
      bestAttempt: 150,
      totalPoints: 450,
      attemptsRemaining: 2
    },
    {
      id: "2",
      name: "María García",
      position: 2,
      bestAttempt: 145,
      totalPoints: 435,
      attemptsRemaining: 2
    }
  ]);

  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused, timeRemaining]);

  const handleStartAttempt = () => {
    setStatus('attempting');
    setTimeRemaining(60);
  };

  const handleMarkAttempt = (result: 'white' | 'red') => {
    setStatus('completed');
    setResult(result);
  };

  const handlePauseCompetition = () => {
    setIsPaused(!isPaused);
  };

  const handleNextAthlete = () => {
    setStatus('preparing');
    setResult(undefined);
    setTimeRemaining(60);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CompetitionPanel
            currentAthlete={currentAthlete}
            timeRemaining={timeRemaining}
            status={status}
            result={result}
          />
          <div className="mt-4">
            <ResultsTable athletes={athletes} />
          </div>
        </div>
        <div>
          <CompetitionControl
            onStartAttempt={handleStartAttempt}
            onMarkAttempt={handleMarkAttempt}
            onPauseCompetition={handlePauseCompetition}
            onNextAthlete={handleNextAthlete}
            isPaused={isPaused}
          />
        </div>
      </div>
    </div>
  );
}

export default CompetitionPage; 