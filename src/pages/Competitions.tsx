import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Plus, Users, MapPin, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCompetitions, useCreateCompetition } from "@/hooks/useCompetitions"
import { useToast } from "@/hooks/use-toast"
import { CompetitionCard } from "@/components/ui/competition-card"
import { CompetitionStats } from "@/components/ui/competition-stats"
import { motion } from "framer-motion"

const Competitions = () => {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: competitions = [], isLoading, error } = useCompetitions()
  const createCompetition = useCreateCompetition()

  const [newCompetition, setNewCompetition] = useState({
    name: "",
    date: "",
    location: "",
    description: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newCompetition.name || !newCompetition.date || !newCompetition.location) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    try {
      await createCompetition.mutateAsync({
        name: newCompetition.name,
        date: newCompetition.date,
        location: newCompetition.location,
        description: newCompetition.description || null,
        status: "Próximo"
      })

      toast({
        title: "Competencia creada",
        description: `${newCompetition.name} ha sido programada exitosamente.`,
      })

      setNewCompetition({
        name: "",
        date: "",
        location: "",
        description: ""
      })
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al crear la competencia. Intente nuevamente.",
        variant: "destructive",
      })
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Próximo":
        return "bg-blue-500"
      case "En Progreso":
        return "bg-green-500"
      case "Finalizado":
        return "bg-gray-500"
      case "Cancelado":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const stats = [
    {
      title: "Total Competencias",
      value: competitions.length,
      icon: Calendar,
      color: "bg-power-primary",
      index: 0
    },
    {
      title: "En Progreso",
      value: competitions.filter(comp => comp.status === "En Progreso").length,
      icon: Calendar,
      color: "bg-power-success",
      index: 1
    },
    {
      title: "Próximas",
      value: competitions.filter(comp => comp.status === "Próximo").length,
      icon: Calendar,
      color: "bg-power-info",
      index: 2
    }
  ]

  const filteredCompetitions = competitions.filter(comp => 
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6 max-w-7xl mx-auto"
      >
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2 text-power-error">Error al cargar competencias</h3>
            <p className="text-muted-foreground">
              Error: {error.message}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Competencias</h1>
          <p className="text-muted-foreground">
            Organización y administración de eventos de powerlifting
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-power-primary hover:bg-power-primary/90">
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
                <Label htmlFor="name">Nombre de la Competencia *</Label>
                <Input
                  id="name"
                  value={newCompetition.name}
                  onChange={(e) => setNewCompetition({...newCompetition, name: e.target.value})}
                  placeholder="Ej: Nacional Abierto 2024"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newCompetition.date}
                  onChange={(e) => setNewCompetition({...newCompetition, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
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
                <Button 
                  type="submit" 
                  className="flex-1 bg-power-primary hover:bg-power-primary/90"
                  disabled={createCompetition.isPending}
                >
                  {createCompetition.isPending ? "Creando..." : "Crear Competencia"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Estadísticas */}
      <CompetitionStats stats={stats} />

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar competencias..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Lista de competencias */}
      {isLoading ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">Cargando competencias...</div>
          </CardContent>
        </Card>
      ) : filteredCompetitions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              {searchQuery ? "No se encontraron competencias" : "No hay competencias registradas"}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((competition, index) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              onViewDetails={(id) => console.log("Ver detalles:", id)}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Banner de información */}
      <Card className="bg-gradient-to-r from-powerlifting-gold/10 to-powerlifting-red/10 border-powerlifting-gold/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-powerlifting-gold rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Sistema Conectado</h3>
              <p className="text-muted-foreground">
                La aplicación está conectada a Supabase y lista para gestionar competencias reales.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Competitions
