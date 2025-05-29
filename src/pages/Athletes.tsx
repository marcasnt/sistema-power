import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Plus, UserCheck, Download, Upload } from "lucide-react"
import { useAthletes, useCreateAthlete } from "@/hooks/useAthletes"
import { AthleteForm } from "@/components/AthleteForm"
import * as XLSX from "xlsx"

const Athletes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: athletes = [], isLoading, error } = useAthletes()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const createAthlete = useCreateAthlete()

  const formatWeight = (weight: number) => `${weight}kg`

  const getGenderBadgeColor = (gender: string) => {
    return gender === "Masculino" ? "bg-blue-500" : "bg-pink-500"
  }

  // Exportar plantilla
  const handleExportTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        name: "Nombre Apellido",
        age: 25,
        gender: "Masculino/Femenino",
        weight: 83,
        club: "Nombre del Club",
        category: "83kg",
        squat_opener: 100,
        bench_opener: 60,
        deadlift_opener: 120
      }
    ])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Atletas")
    XLSX.writeFile(wb, "plantilla_atletas.xlsx")
  }

  // Importar atletas
  const handleImportAthletes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (evt) => {
      const data = evt.target?.result
      if (!data) return
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json(sheet)
      let successCount = 0;
      let errorCount = 0;
      for (const athlete of json) {
        try {
          // Ajusta los campos según tu modelo de Supabase
          await createAthlete.mutateAsync({
            name: athlete["name"] || "",
            age: Number(athlete["age"]) || 0,
            gender: athlete["gender"] || "",
            weight: Number(athlete["weight"]) || 0,
            club: athlete["club"] || "",
            weight_category: athlete["category"] || "",
            squat_opener: Number(athlete["squat_opener"]) || 0,
            bench_opener: Number(athlete["bench_opener"]) || 0,
            deadlift_opener: Number(athlete["deadlift_opener"]) || 0
          })
          successCount++;
        } catch (err) {
          errorCount++;
        }
      }
      alert(`Importación finalizada. Exitosos: ${successCount}, Errores: ${errorCount}`)
    }
    reader.readAsBinaryString(file)
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2 text-red-600">Error al cargar atletas</h3>
            <p className="text-muted-foreground">
              Error: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Atletas</h1>
          <p className="text-muted-foreground">
            Registro y administración de competidores
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportTemplate} variant="outline">
            <Download className="w-4 h-4 mr-2" /> Exportar Plantilla
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline">
            <Upload className="w-4 h-4 mr-2" /> Importar Atletas
          </Button>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            ref={fileInputRef}
            onChange={handleImportAthletes}
            style={{ display: "none" }}
          />
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-powerlifting-red hover:bg-powerlifting-red-dark"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Atleta
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-powerlifting-red rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{athletes.length}</div>
                <div className="text-sm text-muted-foreground">Total Atletas</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {athletes.filter(a => a.gender === "Masculino").length}
                </div>
                <div className="text-sm text-muted-foreground">Masculino</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {athletes.filter(a => a.gender === "Femenino").length}
                </div>
                <div className="text-sm text-muted-foreground">Femenino</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de atletas */}
      <Card>
        <CardHeader>
          <CardTitle>Atletas Registrados</CardTitle>
          <CardDescription>
            {isLoading ? "Cargando atletas..." : `${athletes.length} atletas registrados en el sistema`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Cargando atletas...</div>
            </div>
          ) : athletes.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay atletas registrados</h3>
              <p className="text-muted-foreground mb-4">
                Comienza registrando tu primer atleta
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-powerlifting-red hover:bg-powerlifting-red-dark"
              >
                <Plus className="w-4 h-4 mr-2" />
                Registrar Primer Atleta
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Género</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Movimientos (kg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {athletes.map((athlete) => (
                  <TableRow key={athlete.id}>
                    <TableCell className="font-medium">{athlete.name}</TableCell>
                    <TableCell>{athlete.age}</TableCell>
                    <TableCell>
                      <Badge className={`${getGenderBadgeColor(athlete.gender)} text-white`}>
                        {athlete.gender}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatWeight(athlete.weight)}</TableCell>
                    <TableCell>
                      {athlete.weight_categories?.name || "Sin categoría"}
                    </TableCell>
                    <TableCell>{athlete.club}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex gap-2">
                        <span>S: {athlete.squat_opener || "-"}</span>
                        <span>B: {athlete.bench_opener || "-"}</span>
                        <span>D: {athlete.deadlift_opener || "-"}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AthleteForm open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

export default Athletes
