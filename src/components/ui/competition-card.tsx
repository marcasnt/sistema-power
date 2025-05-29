import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompetitionCardProps {
  competition: {
    id: string;
    name: string;
    date: string;
    location: string;
    status: string;
    description?: string | null;
    athleteCount?: number;
  };
  onViewDetails: (id: string) => void;
  index: number;
}

export function CompetitionCard({ competition, onViewDetails, index }: CompetitionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Próximo":
        return "bg-power-info text-white";
      case "En Progreso":
        return "bg-power-success text-white";
      case "Finalizado":
        return "bg-muted text-muted-foreground";
      case "Cancelado":
        return "bg-power-error text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl group-hover:text-power-primary transition-colors">
                {competition.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(competition.date)}</span>
              </div>
            </div>
            <Badge className={cn("transition-colors", getStatusColor(competition.status))}>
              {competition.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{competition.location}</span>
            </div>
            
            {competition.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {competition.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{competition.athleteCount || 0} atletas</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="group-hover:text-power-primary transition-colors"
                onClick={() => onViewDetails(competition.id)}
              >
                Ver detalles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 