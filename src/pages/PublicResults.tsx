
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Users } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const PublicResults = () => {
  const { theme, setTheme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isProjectionMode, setIsProjectionMode] = useState(false)
  
  const results = [
    {
      position: 1,
      name: "Miguel Torres",
      category: "93kg",
      squat: [200, 210, 220],
      bench: [145, 150, 155],
      deadlift: [250, 260, 270],
      total: 645,
      club: "Beast Mode"
    },
    {
      position: 2,
      name: "Carlos Mendoza", 
      category: "83kg",
      squat: [180, 190, 200],
      bench: [120, 125, 130],
      deadlift: [220, 230, 240],
      total: 570,
      club: "Iron Gym"
    },
    {
      position: 3,
      name: "Ana Rodríguez",
      category: "63kg",
      squat: [140, 150, 160],
      bench: [85, 90, 95],
      deadlift: [170, 180, 190],
      total: 445,
      club: "Power House"
    },
    {
      position: 4,
      name: "Laura Martín",
      category: "57kg", 
      squat: [120, 130, 140],
      bench: [70, 75, 80],
      deadlift: [150, 160, 170],
      total: 390,
      club: "Fit Center"
    }
  ]

  const categories = ["all", "83kg", "93kg", "63kg", "57kg"]
  
  const filteredResults = selectedCategory === "all" 
    ? results 
    : results.filter(r => r.category === selectedCategory)

  const getBestLift = (attempts: number[]) => {
    return Math.max(...attempts.filter(attempt => attempt > 0))
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{position}</span>
    }
  }

  const ProjectionView = () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-powerlifting-red to-powerlifting-gold">
            RESULTADOS EN VIVO
          </h1>
          <h2 className="text-3xl mb-2">Regional Centro 2024</h2>
          <p className="text-xl text-gray-300">Clasificación General</p>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          {filteredResults.slice(0, 8).map((result) => (
            <div 
              key={result.position}
              className={`flex items-center justify-between p-6 rounded-lg ${
                result.position <= 3 
                  ? 'bg-gradient-to-r from-powerlifting-red/20 to-powerlifting-gold/20 border border-powerlifting-gold/30' 
                  : 'bg-gray-800/50 border border-gray-700'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="text-4xl font-bold w-16 text-center">
                  {result.position <= 3 ? getPositionIcon(result.position) : result.position}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{result.name}</h3>
                  <p className="text-lg text-gray-300">{result.club} • {result.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 text-right">
                <div>
                  <div className="text-sm text-gray-400">SQUAT</div>
                  <div className="text-xl font-bold">{getBestLift(result.squat)}kg</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">BENCH</div>
                  <div className="text-xl font-bold">{getBestLift(result.bench)}kg</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">DEADLIFT</div>
                  <div className="text-xl font-bold">{getBestLift(result.deadlift)}kg</div>
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-400">TOTAL</div>
                  <div className="text-3xl font-bold text-powerlifting-gold">{result.total}kg</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400">Actualización automática cada 30 segundos</p>
        </div>
      </div>
    </div>
  )

  if (isProjectionMode) {
    return <ProjectionView />
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resultados Públicos</h1>
          <p className="text-muted-foreground">
            Clasificaciones y resultados en tiempo real
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Modo {theme === "dark" ? "Claro" : "Oscuro"}
          </Button>
          <Button
            onClick={() => setIsProjectionMode(true)}
            className="bg-powerlifting-red hover:bg-powerlifting-red-dark"
          >
            Modo Proyección
          </Button>
        </div>
      </div>

      {/* Información de competencia */}
      <Card className="bg-gradient-to-r from-powerlifting-red/10 to-powerlifting-gold/10 border-powerlifting-red/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Regional Centro 2024</h2>
              <p className="text-muted-foreground">Gimnasio Municipal • 28 Enero 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">67</div>
                <div className="text-sm text-muted-foreground">Atletas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-powerlifting-red">LIVE</div>
                <div className="text-sm text-muted-foreground">En Vivo</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.filter(cat => cat !== "all").map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Badge variant="secondary" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {filteredResults.length} competidores
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de resultados */}
      <Card>
        <CardHeader>
          <CardTitle>Clasificación General</CardTitle>
          <CardDescription>
            Resultados ordenados por total combinado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Pos.</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Club</TableHead>
                <TableHead className="text-center">Squat</TableHead>
                <TableHead className="text-center">Bench</TableHead>
                <TableHead className="text-center">Deadlift</TableHead>
                <TableHead className="text-center font-bold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow 
                  key={result.position}
                  className={result.position <= 3 ? "bg-accent/50" : ""}
                >
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-2">
                      {getPositionIcon(result.position)}
                      {result.position > 3 && result.position}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{result.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{result.category}</Badge>
                  </TableCell>
                  <TableCell>{result.club}</TableCell>
                  <TableCell className="text-center font-mono">
                    {getBestLift(result.squat)}kg
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {getBestLift(result.bench)}kg
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {getBestLift(result.deadlift)}kg
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg">
                    {result.total}kg
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Panel de control para proyección */}
      <Card>
        <CardHeader>
          <CardTitle>Control de Pantalla</CardTitle>
          <CardDescription>
            Configuración para modo proyección en eventos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button
            onClick={() => setIsProjectionMode(true)}
            className="bg-powerlifting-red hover:bg-powerlifting-red-dark"
          >
            Activar Proyección
          </Button>
          <Button variant="outline">
            Configurar Pantalla
          </Button>
          <Button variant="outline">
            Exportar Resultados
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default PublicResults
