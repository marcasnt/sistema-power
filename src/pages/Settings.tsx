import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const defaultConfig = {
  eventName: "Powerlift Arena",
  attemptTime: 60,
  theme: "dark",
};

export default function Settings() {
  const [config, setConfig] = useState(defaultConfig);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    // Aquí podrías guardar en localStorage, Supabase o donde prefieras
    setSaved(true);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Nombre del Evento</label>
            <Input
              name="eventName"
              value={config.eventName}
              onChange={handleChange}
              placeholder="Nombre del evento"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tiempo por intento (segundos)</label>
            <Input
              name="attemptTime"
              type="number"
              min={30}
              max={300}
              value={config.attemptTime}
              onChange={handleChange}
            />
          </div>
          {/* Puedes agregar más configuraciones aquí */}
          <Button className="mt-4" onClick={handleSave}>
            Guardar configuración
          </Button>
          {saved && <div className="text-green-600 mt-2">¡Configuración guardada!</div>}
        </CardContent>
      </Card>
    </div>
  );
} 