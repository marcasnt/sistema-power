import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimerProps {
  isRunning: boolean;
  onComplete: () => void;
  duration?: number; // duración en segundos
}

export const Timer = ({ isRunning, onComplete, duration = 60 }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  useEffect(() => {
    if (isRunning) {
      setTimeLeft(duration);
    }
  }, [isRunning, duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className={cn(
      "transition-colors",
      timeLeft <= 10 && "border-red-500",
      timeLeft <= 5 && "bg-red-50"
    )}>
      <CardContent className="p-6">
        <div className="text-center">
          <div className="text-4xl font-bold font-mono">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {isRunning ? "Tiempo restante" : "Temporizador detenido"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 