import React from 'react';

interface AthleteInfoProps {
  name: string;
  weight: number;
  attempt: number;
}

export function AthleteInfo({ name, weight, attempt }: AthleteInfoProps) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-2">{name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-semibold">{weight} kg</div>
          <div className="text-sm text-muted-foreground">Peso</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">Intento {attempt}</div>
          <div className="text-sm text-muted-foreground">Número de Intento</div>
        </div>
      </div>
    </div>
  );
} 