import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, X, Play, Pause, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAthletes } from "@/hooks/useAthletes"
import { useActiveCompetition } from "@/hooks/useCompetitions"
import { useCompetitionAthletes } from "@/hooks/useAthletes"

const CompetitionControl = () => {
  const { toast } = useToast()
  const [timeLeft, setTimeLeft] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [currentLift, setCurrentLift] = useState("squat")
  const [currentRound, setCurrentRound] = useState(1)
  
  // Obtener competencia activa
  const { data: activeCompetition, isLoading: isLoadingCompetition } = useActiveCompetition()
  // Obtener atletas inscritos a la competencia activa
  const { data: lifters = [], isLoading: isLoadingLifters } = useCompetitionAthletes(activeCompetition?.id)

  const [attempts, setAttempts] = useState([])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      toast({
        title: "Tiempo agotado",
        description: "El tiempo para el intento ha terminado",
        variant: "destructive"
      })
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, toast])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleTimer = (action: 'start' | 'pause' | 'reset') => {
    switch (action) {
      case 'start':
        setIsRunning(true)
        break
      case 'pause':
        setIsRunning(false)
        break
      case 'reset':
        setIsRunning(false)
        setTimeLeft(60)
        break
    }
  }

  const recordAttempt = (result: 'valid' | 'invalid') => {
    const currentLifter = lifters.find(l => l.status === "ready")
    if (!currentLifter) return

    const newAttempt = {
      lifter: currentLifter.name,
      lift: currentLift,
      attempt: currentLifter.attempt,
      weight: currentLifter.weight,
      result,
      timestamp: new Date().toLocaleTimeString()
    }

    setAttempts([newAttempt, ...attempts])
    handleTimer('reset')
    
    toast({
      title: result === 'valid' ? "Intento válido" : "Intento inválido",
      description: `${currentLifter.name} - ${currentLifter.weight}kg`,
      variant: result === 'valid' ? "default" : "destructive"
    })
  }

  const progressPercentage = ((60 - timeLeft) / 60) * 100

  if (!activeCompetition) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">No hay competencia en curso</h2>
        <p className="text-muted-foreground">Inicia una competencia para gestionar los levantadores.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Control de Competencia</h1>
        <p className="text-muted-foreground">
          Gestión en tiempo real de la competencia activa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de control principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timer y controles */}
          <Card>
            <CardHeader>
              <CardTitle>Timer de Competencia</CardTitle>
              <CardDescription>Control de tiempo para intentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-powerlifting-red mb-4">
                  {formatTime(timeLeft)}
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-3 mb-4"
                />
                <div className="flex justify-center gap-3">
                  <Button
                    onClick={() => handleTimer('start')}
                    disabled={isRunning}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar
                  </Button>
                  <Button
                    onClick={() => handleTimer('pause')}
                    disabled={!isRunning}
                    variant="outline"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                  <Button
                    onClick={() => handleTimer('reset')}
                    variant="outline"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reiniciar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Levantador actual */}
          <Card>
            <CardHeader>
              <CardTitle>Levantador Actual</CardTitle>
            </CardHeader>
            <CardContent>
              {lifters.filter(l => l.status === "ready").map(lifter => (
                <div key={lifter.id} className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">{lifter.name}</h3>
                    <p className="text-muted-foreground">Categoría {lifter.category}</p>
                    <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                      <div className="text-lg">
                        <Badge className="mr-2 bg-powerlifting-gold text-white">
                          {lifter.lift.toUpperCase()}
                        </Badge>
                        Intento {lifter.attempt} - {lifter.weight}kg
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => recordAttempt('valid')}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3"
                      size="lg"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Válido
                    </Button>
                    <Button
                      onClick={() => recordAttempt('invalid')}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
                      size="lg"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Inválido
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Orden de levantadores */}
          <Card>
            <CardHeader>
              <CardTitle>Orden de Levantadores</CardTitle>
              <CardDescription>Secuencia actual de la competencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lifters.map((lifter, index) => (
                  <div 
                    key={lifter.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      lifter.status === 'ready' 
                        ? 'bg-powerlifting-red/10 border-powerlifting-red' 
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        lifter.status === 'ready' 
                          ? 'bg-powerlifting-red text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{lifter.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {lifter.category} • {lifter.lift} • Intento {lifter.attempt}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">
                      {lifter.weight}kg
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Estado de la competencia */}
          <Card>
            <CardHeader>
              <CardTitle>Estado Actual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Disciplina:</span>
                  <Badge className="bg-powerlifting-gold text-white">
                    {currentLift.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Ronda:</span>
                  <span>{currentRound}</span>
                </div>
                <div className="flex justify-between">
                  <span>Competidores:</span>
                  <span>{lifters.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intentos recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Intentos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attempts.slice(0, 5).map((attempt, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{attempt.lifter}</div>
                      <div className="text-muted-foreground">
                        {attempt.lift} • {attempt.weight}kg
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          attempt.result === 'valid' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }
                      >
                        {attempt.result === 'valid' ? 'Válido' : 'Inválido'}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {attempt.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Controles de disciplina */}
          <Card>
            <CardHeader>
              <CardTitle>Cambiar Disciplina</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['squat', 'bench', 'deadlift'].map((lift) => (
                <Button
                  key={lift}
                  variant={currentLift === lift ? "default" : "outline"}
                  className={`w-full ${
                    currentLift === lift 
                      ? 'bg-powerlifting-red hover:bg-powerlifting-red-dark' 
                      : ''
                  }`}
                  onClick={() => setCurrentLift(lift)}
                >
                  {lift.charAt(0).toUpperCase() + lift.slice(1)}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CompetitionControl
