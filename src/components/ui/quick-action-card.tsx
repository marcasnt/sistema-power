import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickAction {
  title: string;
  description: string;
  action: () => void;
  color: string;
}

interface QuickActionCardProps {
  actions: QuickAction[];
}

export function QuickActionCard({ actions }: QuickActionCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>
          Acceso directo a las funciones principales
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <div
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-all duration-300 cursor-pointer group-hover:shadow-md"
              onClick={action.action}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full transition-transform group-hover:scale-125", action.color)} />
                <div>
                  <h4 className="font-medium group-hover:text-power-primary transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Ir
              </Button>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
} 