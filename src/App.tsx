import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import Athletes from "./pages/Athletes";
import Competitions from "./pages/Competitions";
import CompetitionControl from "./pages/CompetitionControl";
import PublicResults from "./pages/PublicResults";
import NotFound from "./pages/NotFound";
import CompetitionDetails from "@/pages/CompetitionDetails";
import Settings from "@/pages/Settings";
import { NotificationContainer } from "@/components/ui/notification";
import { useNotifications } from "@/hooks/use-notifications";
import { CompetitionPage } from './pages/CompetitionPage';

const queryClient = new QueryClient();

const App = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="powerlift-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <header className="h-14 border-b bg-card flex items-center px-4">
                    <SidebarTrigger />
                    <div className="ml-4">
                      <h1 className="text-lg font-semibold text-foreground">PowerLifter Pro</h1>
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/athletes" element={<Athletes />} />
                      <Route path="/competitions" element={<Competitions />} />
                      <Route path="/competitions/:id" element={<CompetitionDetails />} />
                      <Route path="/competition-control" element={<CompetitionControl />} />
                      <Route path="/public-results" element={<PublicResults />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/competition-page" element={<CompetitionPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
          <NotificationContainer
            notifications={notifications}
            onClose={removeNotification}
          />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
