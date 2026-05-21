import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Server, Users, Zap, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function NiiqDashboard() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NIIQ Intelligence</h1>
          <p className="text-muted-foreground mt-2">System health, capacity analytics, and algorithmic performance.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full font-medium border border-green-200 dark:border-green-900">
          <ShieldCheck className="h-4 w-4" /> System Optimal
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,320 <span className="text-sm font-normal text-muted-foreground">min</span></div>
            <p className="text-xs text-muted-foreground mt-1 text-green-600">99.99% SLA</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Participants</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground mt-1 text-primary">Live right now</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Capacity Utilization</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground mt-1">Optimal cognitive load range</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-700">Active Interventions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">3</div>
            <p className="text-xs text-amber-600/80 mt-1">Pending provider review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Capacity Distribution Model</CardTitle>
            <CardDescription>Real-time analysis of participant workload states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium">High</div>
                <div className="flex-1 h-6 bg-muted rounded-md overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "35%" }} 
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-red-400"
                  />
                </div>
                <div className="w-12 text-right text-sm font-bold">35%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium">Medium</div>
                <div className="flex-1 h-6 bg-muted rounded-md overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "50%" }} 
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-primary"
                  />
                </div>
                <div className="w-12 text-right text-sm font-bold">50%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium">Low</div>
                <div className="flex-1 h-6 bg-muted rounded-md overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "15%" }} 
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-blue-400"
                  />
                </div>
                <div className="w-12 text-right text-sm font-bold">15%</div>
              </div>

              <div className="mt-8 bg-primary/5 p-4 rounded-md border border-primary/10 text-sm text-muted-foreground">
                <strong className="text-foreground block mb-1">NIIQ Note:</strong> The algorithm targets a 60% concentration in the Medium capacity zone for optimal therapeutic recovery and job preparation without burnout. Current distribution is within acceptable parameters, but High capacity participants (35%) are being monitored closely for overload indicators.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm border-dashed">
          <CardHeader>
            <CardTitle>Matching Algorithm Performance</CardTitle>
            <CardDescription>Success rate of adaptive role placements over 90 days.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-muted m-6 rounded-lg bg-muted/20">
            <div className="text-center space-y-2">
              <Activity className="h-8 w-8 mx-auto opacity-20" />
              <p>Visualization placeholder</p>
              <p className="text-xs">D3/Recharts component renders here in production</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
