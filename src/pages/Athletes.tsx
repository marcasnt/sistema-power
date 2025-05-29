
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Athletes = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [athletes, setAthletes] = useState<any[]>([])

  const [newAthlete, setNewAthlete] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    club: "",
    category: "",
    squat: "",
    bench: "",
    deadlift: ""
  })

  const categories = {
    "Masculino": ["59kg", "66kg", "74kg", "83kg", "93kg", "105kg", "120kg", "+120kg"],
    "Femenino": ["47kg", "52kg", "57kg", "63kg", "69kg", "76kg", "84kg", "+84kg"]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const athlete = {
      id: athletes.length + 1,
      name: newAthlete.name,
      age: parseInt(newAthlete.age),
      gender: newAthlete.gender,
      weight: parseFloat(newAthlete.weight),
      club: newAthlete.club,
      category: newAthlete.category,
      squat: parseInt(newAthlete.squat),
      bench: parseInt(newAthlete.bench),
      deadlift: parseInt(newAthlete.deadlift)
    }

    setAthletes([...athletes, athlete])
    setNewAthlete({
      name: "",
      age: "",
      gender: "",
      weight: "",
      club: "",
      category: "",
      squat: "",
      bench: "",
      deadlift: ""
    })
    setIsDialogOpen(false)
    
    toast({
      title: "Atleta registrado",
      description: `${athlete.name} ha sido registrado exitosamente.`,
    })
  }

  const filteredAthletes = athletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.club.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-powerlifting-red hover:bg-powerlifting-red-dark">
              <UserPlus className="w-4 h-4 mr-2" />
              Nuevo Atleta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Atleta</DialogTitle>
              <DialogDescription>
                Complete la información del competidor
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={newAthlete.name}
                    onChange={(e) => setNewAthlete({...newAthlete, name: e.target.value})}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newAthlete.age}
                    onChange={(e) => setNewAthlete({...newAthlete, age: e.target.value})}
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Sexo</Label>
                  <Select
                    value={newAthlete.gender}
                    onValueChange={(value) => setNewAthlete({...newAthlete, gender: value, category: ""})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newAthlete.weight}
                    onChange={(e) => setNewAthlete({...newAthlete, weight: e.target.value})}
                    placeholder="75.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="club">Club</Label>
                  <Input
                    id="club"
                    value={newAthlete.club}
                    onChange={(e) => setNewAthlete({...newAthlete, club: e.target.value})}
                    placeholder="Iron Gym"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={newAthlete.category}
                    onValueChange={(value) => setNewAthlete({...newAthlete, category: value})}
                    disabled={!newAthlete.gender}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {newAthlete.gender && categories[newAthlete.gender as keyof typeof categories].map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pesos Iniciales (kg)</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Squat"
                    type="number"
                    value={newAthlete.squat}
                    onChange={(e) => setNewAthlete({...newAthlete, squat: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Bench"
                    type="number"
                    value={newAthlete.bench}
                    onChange={(e) => setNewAthlete({...newAthlete, bench: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Deadlift"
                    type="number"
                    value={newAthlete.deadlift}
                    onChange={(e) => setNewAthlete({...newAthlete, deadlift: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-powerlifting-red hover:bg-powerlifting-red-dark">
                  Registrar Atleta
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Búsqueda y filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nombre o club..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {filteredAthletes.length} atletas
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Lista de atletas */}
      {athletes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay atletas registrados</h3>
            <p className="text-muted-foreground mb-4">
              Comienza registrando tu primer atleta para las competencias
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-powerlifting-red hover:bg-powerlifting-red-dark"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Registrar Primer Atleta
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Atletas Registrados</CardTitle>
            <CardDescription>
              Lista completa de competidores en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Edad/Sexo</TableHead>
                  <TableHead>Peso/Categoría</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Squat</TableHead>
                  <TableHead>Bench</TableHead>
                  <TableHead>Deadlift</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAthletes.map((athlete) => (
                  <TableRow key={athlete.id}>
                    <TableCell className="font-medium">{athlete.name}</TableCell>
                    <TableCell>
                      {athlete.age} años, {athlete.gender[0]}
                    </TableCell>
                    <TableCell>
                      {athlete.weight}kg / {athlete.category}
                    </TableCell>
                    <TableCell>{athlete.club}</TableCell>
                    <TableCell>{athlete.squat}kg</TableCell>
                    <TableCell>{athlete.bench}kg</TableCell>
                    <TableCell>{athlete.deadlift}kg</TableCell>
                    <TableCell className="font-semibold">
                      {athlete.squat + athlete.bench + athlete.deadlift}kg
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Athletes
