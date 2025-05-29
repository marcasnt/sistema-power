import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Trophy,
  PlayCircle,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Atletas",
    href: "/athletes",
    icon: Users,
  },
  {
    name: "Competencias",
    href: "/competitions",
    icon: Trophy,
  },
  {
    name: "Control de Competencia",
    href: "/competition-control",
    icon: PlayCircle,
  },
  {
    name: "Resultados Públicos",
    href: "/public-results",
    icon: BarChart2,
  },
];

const settings = [
  {
    name: "Configuración",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <img
          src="/logo.png"
          alt="PowerLifter Pro"
          className="h-8 w-8"
        />
        <span className="ml-2 text-lg font-semibold">PowerLifter Pro</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-power-primary text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-white" : "text-muted-foreground"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <div className="space-y-1">
          {settings.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
