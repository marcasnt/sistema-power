import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Trophy, Clock, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useCompetition } from "@/hooks/useCompetitions"
import { useNotifications } from "@/hooks/use-notifications"
import { cn } from "@/lib/utils"
import { useAthletes, useCompetitionAthletes } from "@/hooks/useAthletes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useUpdateCompetition, useCompetitionPlatforms, useCreatePlatform, useDeletePlatform } from "@/hooks/useCompetitions"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CompetitionControl } from "@/components/CompetitionControl"

const CompetitionDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: competition, isLoading, error } = useCompetition(id)
  const { success, error: showError } = useNotifications()
  const { data: allAthletes = [] } = useAthletes()
  const { data: competitionAthletes = [], refetch } = useCompetitionAthletes(id)
  const queryClient = useQueryClient()
  const updateCompetition = useUpdateCompetition()
  const { data: platforms = [], isLoading: isLoadingPlatforms, refetch: refetchPlatforms } = useCompetitionPlatforms(id)
  const createPlatformMutation = useCreatePlatform()
  const deletePlatformMutation = useDeletePlatform()

  const [newPlatformName, setNewPlatformName] = useState("")
  const [newPlatformType, setNewPlatformType] = useState("Mixto")

  const inscribirMutation = useMutation({
    mutationFn: async ({ athleteId, competitionId, platformId }: { athleteId: string; competitionId: string; platformId: string | null }) => {
      const { error } = await supabase
        .from("competition_athletes")
        .insert({
          competition_id: competitionId,
          athlete_id: athleteId,
          status: "inscrito",
          platform_id: platformId,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["competition-athletes", id] });
    },
    onError: (error) => {
      showError(`Error inscribiendo atleta: ${error.message}`);
    },
  })
  const desinscribirMutation = useMutation({
    mutationFn: async (athleteId: string) => {
      const { error } = await supabase.from("competition_athletes")
        .delete()
        .eq("competition_id", id)
        .eq("athlete_id", athleteId);
      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["competition-athletes", id] });
    },
    onError: (error) => {
      showError(`Error desinscribiendo atleta: ${error.message}`);
    },
  })

  const availableAthletes = allAthletes.filter(a => !competitionAthletes.some(ca => ca.id === a.id))

  const handleCreatePlatform = async () => {
    if (!newPlatformName || !id) return
    await createPlatformMutation.mutateAsync({ name: newPlatformName, type: newPlatformType === 'Mixto' ? null : newPlatformType, competition_id: id })
    setNewPlatformName("")
    setNewPlatformType("Mixto")
    refetchPlatforms()
  }

  const handleDeletePlatform = async (platformId: string) => {
    await deletePlatformMutation.mutateAsync(platformId)
    refetchPlatforms()
  }

  const handleInscribirAtleta = async (athleteId: string, platformId: string | null) => {
    if (!id || !athleteId) {
      showError("ID de competencia o atleta faltante.");
      return;
    }
    await inscribirMutation.mutateAsync({ athleteId, competitionId: id as string, platformId });
  }
  
  const handleDesinscribirAtleta = async (athleteId: string) => {
    await desinscribirMutation.mutateAsync(athleteId)
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6 max-w-7xl mx-auto"
      >
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">Cargando detalles de la competencia...</div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (error || !competition) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6 max-w-7xl mx-auto"
      >
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2 text-power-error">Error al cargar la competencia</h3>
            <p className="text-muted-foreground">
              {error?.message || "No se encontró la competencia"}
            </p>
            <Button
              onClick={() => navigate("/competitions")}
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Competencias
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Próximo":
        return "bg-power-info text-white"
      case "En Progreso":
        return "bg-power-success text-white"
      case "Finalizado":
        return "bg-muted text-muted-foreground"
      case "Cancelado":
        return "bg-power-error text-white"
      default:
        return "bg-muted text-muted-foreground"
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
        <div className="space-y-1">
          <Button
            variant="ghost"
            onClick={() => navigate("/competitions")}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{competition.name}</h1>
          <p className="text-muted-foreground">{competition.description}</p>
          {/* Botón Iniciar competencia */}
          {competition.status === "Próximo" && (
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => updateCompetition.mutate({ id: competition.id, status: "En Progreso" })}
            >
              Iniciar competencia
            </Button>
          )}
        </div>
        <Badge className={cn("text-lg px-4 py-2", getStatusColor(competition.status))}>
          {competition.status}
        </Badge>
      </motion.div>

      {/* Información Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-power-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Fecha</div>
                <div className="font-semibold">{formatDate(competition.date)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-power-info rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Ubicación</div>
                <div className="font-semibold">{competition.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-power-success rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Atletas Registrados</div>
                <div className="font-semibold">{competition.athleteCount || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Contenido */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="athletes">Atletas</TabsTrigger>
          <TabsTrigger value="schedule">Programación</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Competencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Estado Actual</div>
                  <div className="font-semibold">{competition.status}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Fecha de Creación</div>
                  <div className="font-semibold">{formatDate(competition.created_at)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="athletes">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Atletas por Tarima</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Gestión de Plataformas */}
              <div className="mb-6 border-b pb-4">
                <h4 className="text-lg font-semibold mb-2">Tarimas / Racks</h4>
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Nombre de Tarima (ej: Tarima 1)"
                    value={newPlatformName}
                    onChange={(e) => setNewPlatformName(e.target.value)}
                    className="flex-grow"
                  />
                  <Select value={newPlatformType} onValueChange={setNewPlatformType}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Mixto">Mixto</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleCreatePlatform} disabled={!newPlatformName || createPlatformMutation.isPending}>
                    <Plus className="w-4 h-4 mr-2" /> Crear Tarima
                  </Button>
                </div>
                {isLoadingPlatforms ? (
                  <div className="text-muted-foreground">Cargando tarimas...</div>
                ) : platforms.length === 0 ? (
                  <div className="text-muted-foreground">No hay tarimas creadas para esta competencia.</div>
                ) : (
                  <ul className="space-y-2">
                    {platforms.map((platform: any) => (
                      <li key={platform.id} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                        <span>{platform.name} {platform.type && `(${platform.type})`}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePlatform(platform.id)} disabled={deletePlatformMutation.isPending}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Listas de Atletas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Atletas Inscritos */}
                <div>
                  <h4 className="font-semibold mb-2">Atletas Inscritos</h4>
                  {competitionAthletes.length === 0 ? (
                    <div className="text-muted-foreground">No hay atletas inscritos.</div>
                  ) : (
                    <ul className="space-y-2">
                      {competitionAthletes.map((athlete: any) => (
                        <li key={athlete.id} className="flex items-center justify-between border-b py-2">
                          <span>
                            {athlete.name} ({athlete.gender}, {athlete.weight}kg)
                            {athlete.platform && <Badge className="ml-2" variant="secondary">{athlete.platform.name}</Badge>}
                          </span>
                          <Button size="sm" variant="destructive" onClick={() => handleDesinscribirAtleta(athlete.id)}>
                            Quitar
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Atletas Disponibles */}
                <div>
                  <h4 className="font-semibold mb-2">Disponibles para inscribir</h4>
                  {availableAthletes.length === 0 ? (
                    <div className="text-muted-foreground">No hay atletas disponibles.</div>
                  ) : (
                    <ul className="space-y-2">
                      {availableAthletes.map((athlete: any) => (
                        <li key={athlete.id} className="flex items-center justify-between border-b py-2">
                          <span>{athlete.name} ({athlete.gender}, {athlete.weight}kg)</span>
                          <Select onValueChange={(platformId) => handleInscribirAtleta(athlete.id, platformId === 'none' ? null : platformId)}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Seleccionar Tarima" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Sin Tarima</SelectItem>
                              {platforms.map((platform: any) => (
                                <SelectItem key={platform.id} value={platform.id}>{platform.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Programación del Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Cronograma detallado de la competencia
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Resultados y clasificaciones
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control">
          <Card>
            <CardHeader>
              <CardTitle>Control de Competencia</CardTitle>
            </CardHeader>
            <CardContent>
              {competition.status === "En Progreso" ? (
                <CompetitionControl competitionId={competition.id} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    El control de competencia solo está disponible cuando la competencia está en progreso.
                  </p>
                  {competition.status === "Próximo" && (
                    <Button
                      className="mt-4"
                      onClick={() => updateCompetition.mutate({ id: competition.id, status: "En Progreso" })}
                    >
                      Iniciar Competencia
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default CompetitionDetails 