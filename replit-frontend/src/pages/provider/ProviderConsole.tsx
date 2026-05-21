import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, TrendingDown, Clock, Phone, Settings, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const alerts = [
  {
    id: 1,
    employee: "Alex Thompson",
    type: "Risk of disengagement",
    severity: "high",
    time: "2h ago",
    trend: "Missed 3 consecutive check-ins. Platform activity down 80% this week.",
    systemActions: ["Paused new module assignments", "Sent automated check-in SMS"],
    recommendations: ["Call participant immediately", "Review current workload capacity"]
  },
  {
    id: 2,
    employee: "Jamie Chen",
    type: "Cognitive overload detected",
    severity: "high",
    time: "1h ago",
    trend: "Task completion time increased by 300% on Module 4. Multiple rapid corrections observed.",
    systemActions: ["Reduced daily workload cap", "Simplified interface mode activated", "Extra time buffer added to deadlines"],
    recommendations: ["Adjust support plan", "Discuss Module 4 difficulties in next session"]
  },
  {
    id: 3,
    employee: "Sarah Johnson",
    type: "Energy declining 5 days",
    severity: "medium",
    time: "3h ago",
    trend: "Self-reported energy levels consistently dropping. Sessions ending earlier than usual.",
    systemActions: ["Suggested 2-day break", "Notified employer of potential adjusted hours"],
    recommendations: ["Review role configuration with employer", "Assess sleep patterns"]
  }
];

export function ProviderConsole() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(alerts[0].id);

  const activeAlert = alerts.find(a => a.id === selectedAlert);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Provider Console</h1>
          <p className="text-muted-foreground mt-2">Monitor employee progress and intervene when NIIQ detects risks.</p>
        </div>
        <div className="flex gap-4 items-center bg-card px-4 py-2 rounded-md border text-sm">
          <span className="font-semibold text-muted-foreground mr-2">Priority Legend:</span>
          <span className="flex items-center gap-1 text-red-600"><AlertTriangle className="h-4 w-4" /> High</span>
          <span className="flex items-center gap-1 text-amber-600"><AlertCircle className="h-4 w-4" /> Medium</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Active Alerts ({alerts.length})
          </h3>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={`cursor-pointer transition-all hover:border-primary/50 ${selectedAlert === alert.id ? 'border-primary shadow-sm bg-primary/5' : 'bg-card'}`}
                onClick={() => setSelectedAlert(alert.id)}
                data-testid={`alert-item-${alert.id}`}
              >
                <CardContent className="p-4 flex gap-3">
                  <div className="shrink-0 mt-1">
                    {alert.severity === 'high' ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm">{alert.employee}</h4>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {alert.time}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground/80">{alert.type}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {activeAlert && (
              <motion.div
                key={activeAlert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Card className="h-full bg-card border-primary/20 shadow-sm flex flex-col">
                  <CardHeader className="border-b bg-muted/20 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={activeAlert.severity === 'high' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                            {activeAlert.severity.toUpperCase()} PRIORITY
                          </Badge>
                          <span className="text-sm text-muted-foreground">{activeAlert.time}</span>
                        </div>
                        <CardTitle className="text-2xl">{activeAlert.employee}</CardTitle>
                        <CardDescription className="text-base text-foreground mt-1 font-medium">{activeAlert.type}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm"><Activity className="mr-2 h-4 w-4" /> View Full Record</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 flex-1">
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2 text-primary">
                        <TrendingDown className="h-4 w-4" /> Detected Trend
                      </h4>
                      <div className="bg-muted p-4 rounded-md text-sm border">
                        {activeAlert.trend}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2 text-primary">
                        <Settings className="h-4 w-4" /> System Actions Taken (Auto)
                      </h4>
                      <ul className="space-y-2">
                        {activeAlert.systemActions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span className="text-muted-foreground">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2 text-primary">
                        <AlertCircle className="h-4 w-4" /> Recommended Provider Actions
                      </h4>
                      <div className="bg-primary/5 border border-primary/20 p-4 rounded-md space-y-3">
                        {activeAlert.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <div className="h-5 w-5 rounded-full bg-background border flex items-center justify-center text-xs shrink-0">{i+1}</div>
                              {rec}
                            </div>
                            <Button size="sm" variant="secondary" className="h-7 text-xs">Acknowledge</Button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-3 border-t bg-muted/10 mt-auto">
                    <Button className="flex-1 bg-primary text-primary-foreground"><Phone className="mr-2 h-4 w-4" /> Call Employee</Button>
                    <Button variant="outline" className="flex-1">Adjust Plan Settings</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
