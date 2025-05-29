import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItem {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  index: number;
}

interface CompetitionStatsProps {
  stats: StatItem[];
}

export function CompetitionStats({ stats }: CompetitionStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: stat.index * 0.1 }}
        >
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                  stat.color
                )}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.title}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 