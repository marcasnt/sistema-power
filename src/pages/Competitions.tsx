
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Plus, MapPin, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Competitions = () => {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      name: "Nacional Juvenil 2024",
      date: "2024-01-15",
      location: "Centro Deportivo Nacional",
      status: "Completado",
      athletes: 45,
      description: "Campeonato nacional de la categoría juvenil"
    },
    {
      id: 2,
      name: "Regional Centro",
      date: "2024-01-28",
      location: "Gimnasio Municipal",
      status: "En Progreso",
      athletes: 67,
      description: "Competencia regional zona centro del país"
    },
    {
      id: 3,
      name: "Copa Primavera",
      date: "2024-02-10",
      location: "Club Atlético",
      status: "Próximo",
      athletes: 38,
      description: "Torneo de primavera categoría abierta"
    }
  ])

  const [newCompetition, setNewCompetition] = useState({
    name: "",
    date: "",
    location: "",
    description: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const competition = {
      id: competitions.length + 1,
      name: newCompetition.name,
      date: newCompetition.date,
      location: newCompetition.location,
      status: "Próximo" as const,
      athletes: 0,
      description: newCompetition.description
    }

    setCompetitions([...competitions, competition])
    setNewCompetition({
      name: "",
      date: "",
      location: "",
      description: ""
    })
    setIsDialogOpen(false)
    
    toast({
      title: "Competencia creada",
      description: `${competition.name} ha sido programada exitosamente.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-500"
      case "En Progreso":
        return "bg-powerlifting-red"
      case "Próximo":
        return "bg-powerlifting-gold"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Competencias</h1>
          <p className="text-muted-foreground">
            Organización y administración de eventos de powerlifting
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-powerlifting-red hover:bg-powerlifting-red-dark">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Competencia
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nueva Competencia</DialogTitle>
              <DialogDescription>
                Configure los detalles del evento
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Competencia</Label>
                <Input
                  id="name"
                  value={newCompetition.name}
                  onChange={(e) => setNewCompetition({...newCompetition, name: e.target.value})}
                  placeholder="Ej: Nacional Abierto 2024"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={newCompetition.date}
                  onChange={(e) => setNewCompetition({...newCompetition, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={newCompetition.location}
                  onChange={(e) => setNewCompetition({...newCompetition, location: e.target.value})}
                  placeholder="Ej: Centro Deportivo Nacional"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newCompetition.description}
                  onChange={(e) => setNewCompetition({...newCompetition, description: e.target.value})}
                  placeholder="Descripción breve del evento"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-powerlifting-red hover:bg-powerlifting-red-dark">
                  Crear Competencia
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-powerlifting-red rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{competitions.length}</div>
                <div className="text-sm text-muted-foreground">Total Competencias</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-powerlifting-gold rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {competitions.reduce((sum, comp) => sum + comp.athletes, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Atletas Participando</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {competitions.filter(comp => comp.status === "En Progreso").length}
                </div>
                <div className="text-sm text-muted-foreground">En Progreso</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de competencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitions.map((competition) => (
          <Card key={competition.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{competition.name}</CardTitle>
                  <CardDescription>{competition.description}</CardDescription>
                </div>
                <Badge 
                  className={`${getStatusColor(competition.status)} text-white`}
                >
                  {competition.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(competition.date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{competition.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{competition.athletes} atletas registrados</span>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalles
                </Button>
                {competition.status === "En Progreso" && (
                  <Button size="sm" className="flex-1 bg-powerlifting-red hover:bg-powerlifting-red-dark">
                    Control en Vivo
                  </Button>
                )}
                {competition.status === "Próximo" && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Gestionar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Banner de información */}
      <Card className="bg-gradient-to-r from-powerlifting-gold/10 to-powerlifting-red/10 border-powerlifting-gold/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-powerlifting-gold rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Próximas Funciones</h3>
              <p className="text-muted-foreground">
                Pronto podrás gestionar vuelos de competencia, asignar jueces automaticamente
                y generar reportes detallados de cada evento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Competitions
