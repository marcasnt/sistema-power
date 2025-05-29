
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Users, Calendar } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const PublicResults = () => {
  const { theme, setTheme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isProjectionMode, setIsProjectionMode] = useState(false)
  
  const results: any[] = []
  const categories = ["all", "83kg", "93kg", "63kg", "57kg"]
  
  const filteredResults = selectedCategory === "all" 
    ? results 
    : results.filter(r => r.category === selectedCategory)

  const ProjectionView = () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-powerlifting-red to-powerlifting-gold">
            RESULTADOS EN VIVO
          </h1>
          <h2 className="text-3xl mb-2">Sin Competencia Activa</h2>
          <p className="text-xl text-gray-300">No hay resultados para mostrar</p>
        </div>

        <div className="text-center mt-8">
          <Button 
            onClick={() => setIsProjectionMode(false)}
            className="bg-powerlifting-red hover:bg-powerlifting-red-dark"
          >
            Salir del Modo Proyección
          </Button>
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
              <h2 className="text-2xl font-bold">Sin Competencia Activa</h2>
              <p className="text-muted-foreground">No hay eventos en curso actualmente</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Atletas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">OFFLINE</div>
                <div className="text-sm text-muted-foreground">Estado</div>
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

      {/* Estado sin resultados */}
      <Card>
        <CardContent className="p-12 text-center">
          <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay resultados disponibles</h3>
          <p className="text-muted-foreground mb-4">
            Los resultados aparecerán aquí cuando haya una competencia activa
          </p>
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
          <Button variant="outline" disabled>
            Configurar Pantalla
          </Button>
          <Button variant="outline" disabled>
            Exportar Resultados
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default PublicResults
