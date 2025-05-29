import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Activity, Check, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAthletes } from "@/hooks/useAthletes"
import { useCompetitions } from "@/hooks/useCompetitions"
import { StatCard } from "@/components/ui/stat-card"
import { QuickActionCard } from "@/components/ui/quick-action-card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Dashboard = () => {
  const navigate = useNavigate()
  const { data: athletes = [] } = useAthletes()
  const { data: competitions = [] } = useCompetitions()

  const activeCompetitions = competitions.filter(comp => comp.status === "En Progreso")
  const totalAttempts = 0 // Will be calculated from attempts table later
  const totalRecords = 0 // Will be calculated from records table later

  const stats = [
    {
      title: "Atletas Registrados",
      value: athletes.length.toString(),
      change: athletes.length === 0 ? "Ninguno registrado" : `${athletes.length} registrados`,
      icon: Users,
      color: "bg-power-info"
    },
    {
      title: "Competencias Activas",
      value: activeCompetitions.length.toString(),
      change: activeCompetitions.length === 0 ? "Ninguna activa" : `${activeCompetitions.length} en progreso`,
      icon: Calendar,
      color: "bg-power-primary"
    },
    {
      title: "Total de Intentos",
      value: totalAttempts.toString(),
      change: "Sin intentos registrados",
      icon: Activity,
      color: "bg-power-accent"
    },
    {
      title: "Records Establecidos",
      value: totalRecords.toString(),
      change: "Sin records",
      icon: Check,
      color: "bg-power-success"
    }
  ]

  const quickActions = [
    {
      title: "Nuevo Atleta",
      description: "Registrar un nuevo competidor",
      action: () => navigate("/athletes"),
      color: "bg-power-info"
    },
    {
      title: "Nueva Competencia",
      description: "Organizar un nuevo evento",
      action: () => navigate("/competitions"),
      color: "bg-power-primary"
    },
    {
      title: "Control en Vivo",
      description: "Gestionar competencia activa",
      action: () => navigate("/competition-control"),
      color: "bg-power-accent"
    },
    {
      title: "Ver Resultados",
      description: "Pantalla pública de resultados",
      action: () => navigate("/public-results"),
      color: "bg-power-success"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema de gestión de competencias de powerlifting
        </p>
      </motion.div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acciones Rápidas */}
        <QuickActionCard actions={quickActions} />

        {/* Estado de la aplicación */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Estado del Sistema</CardTitle>
            <CardDescription>
              Información sobre el estado actual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-medium">Base de Datos</h4>
                <p className="text-sm text-muted-foreground">
                  Conectado a Supabase
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-power-success animate-pulse"></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-medium">Datos</h4>
                <p className="text-sm text-muted-foreground">
                  {athletes.length + competitions.length > 0 ? "Con datos" : "Sin datos"}
                </p>
              </div>
              <div className={cn(
                "w-3 h-3 rounded-full",
                athletes.length + competitions.length > 0 ? "bg-power-success" : "bg-power-warning"
              )}></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-medium">Competencias Activas</h4>
                <p className="text-sm text-muted-foreground">
                  {activeCompetitions.length} en progreso
                </p>
              </div>
              <div className={cn(
                "w-3 h-3 rounded-full",
                activeCompetitions.length > 0 ? "bg-power-success" : "bg-muted"
              )}></div>
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Banner de información */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-power-primary/10 to-power-accent/10 border-power-primary/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-power-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Sistema PowerLifter Pro Conectado</h3>
                <p className="text-muted-foreground">
                  {athletes.length === 0 && competitions.length === 0 
                    ? "Sistema conectado y listo para comenzar. Registra atletas y crea competencias." 
                    : `Sistema operativo con ${athletes.length} atletas y ${competitions.length} competencias registradas.`
                  }
                </p>
              </div>
              <Button 
                className="bg-power-primary hover:bg-power-primary/90 transition-colors group"
                onClick={() => navigate(athletes.length === 0 ? "/athletes" : "/competitions")}
              >
                {athletes.length === 0 ? "Registrar Atletas" : "Ver Competencias"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
