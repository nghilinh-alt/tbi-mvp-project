import { AppLayout } from "./components/layout/AppLayout";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/patient/Dashboard";
import { Journey } from "./pages/patient/Journey";
import { Skills } from "./pages/patient/Skills";
import { Jobs } from "./pages/patient/Jobs";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ProviderConsole } from "./pages/provider/ProviderConsole";
import { EmployerPortal } from "./pages/employer/EmployerPortal";
import { NiiqDashboard } from "./pages/niiq/NiiqDashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/journey" component={Journey} />
      <Route path="/skills" component={Skills} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/provider" component={ProviderConsole} />
      <Route path="/employer" component={EmployerPortal} />
      <Route path="/niiq" component={NiiqDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout>
            <Router />
          </AppLayout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
