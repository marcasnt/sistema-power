
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Activity, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()

  const stats = [
    {
      title: "Atletas Registrados",
      value: "124",
      change: "+12 este mes",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Competencias Activas",
      value: "3",
      change: "2 en progreso",
      icon: Calendar,
      color: "bg-powerlifting-red"
    },
    {
      title: "Total de Intentos",
      value: "1,847",
      change: "+234 hoy",
      icon: Activity,
      color: "bg-powerlifting-gold"
    },
    {
      title: "Records Establecidos",
      value: "23",
      change: "7 este mes",
      icon: Check,
      color: "bg-green-500"
    }
  ]

  const recentCompetitions = [
    {
      name: "Nacional Juvenil 2024",
      date: "15 Ene 2024",
      status: "Completado",
      athletes: 45
    },
    {
      name: "Regional Centro",
      date: "28 Ene 2024",
      status: "En Progreso",
      athletes: 67
    },
    {
      name: "Copa Primavera",
      date: "10 Feb 2024",
      status: "Próximo",
      athletes: 38
    }
  ]

  const quickActions = [
    {
      title: "Nuevo Atleta",
      description: "Registrar un nuevo competidor",
      action: () => navigate("/athletes"),
      color: "bg-blue-500"
    },
    {
      title: "Nueva Competencia",
      description: "Organizar un nuevo evento",
      action: () => navigate("/competitions"),
      color: "bg-powerlifting-red"
    },
    {
      title: "Control en Vivo",
      description: "Gestionar competencia activa",
      action: () => navigate("/competition-control"),
      color: "bg-powerlifting-gold"
    },
    {
      title: "Ver Resultados",
      description: "Pantalla pública de resultados",
      action: () => navigate("/public-results"),
      color: "bg-green-500"
    }
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema de gestión de competencias de powerlifting
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acciones Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Acceso directo a las funciones principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={action.action}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${action.color}`} />
                  <div>
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Ir
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Competencias Recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Competencias Recientes</CardTitle>
            <CardDescription>
              Eventos programados y en curso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCompetitions.map((comp, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{comp.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{comp.date}</span>
                    <span>•</span>
                    <span>{comp.athletes} atletas</span>
                  </div>
                </div>
                <Badge 
                  variant={
                    comp.status === "Completado" ? "secondary" :
                    comp.status === "En Progreso" ? "default" : "outline"
                  }
                  className={
                    comp.status === "En Progreso" ? "bg-powerlifting-red text-white" : ""
                  }
                >
                  {comp.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Banner de información */}
      <Card className="bg-gradient-to-r from-powerlifting-red/10 to-powerlifting-gold/10 border-powerlifting-red/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-powerlifting-red rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Sistema PowerLifter Pro</h3>
              <p className="text-muted-foreground">
                Gestión completa de competencias de powerlifting con control en tiempo real,
                seguimiento de atletas y resultados automáticos.
              </p>
            </div>
            <Button className="bg-powerlifting-red hover:bg-powerlifting-red-dark">
              Ver Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
