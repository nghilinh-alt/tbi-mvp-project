import { CheckCircle2, Circle, Lock, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";

const steps = [
  {
    id: 1,
    title: "Profile Setup",
    description: "Basic information and background gathered.",
    status: "completed",
    icon: CheckCircle2,
    color: "text-primary"
  },
  {
    id: 2,
    title: "Skills Assessment",
    description: "Identify your current strengths and areas for growth.",
    status: "ready",
    icon: PlayCircle,
    color: "text-blue-500",
    action: "/skills"
  },
  {
    id: 3,
    title: "Job Matching",
    description: "Review adaptive roles that fit your profile.",
    status: "pending",
    icon: Circle,
    color: "text-muted-foreground",
    action: "/jobs"
  },
  {
    id: 4,
    title: "Training & Preparation",
    description: "Complete modules required for your target roles.",
    status: "locked",
    icon: Lock,
    color: "text-muted-foreground"
  },
  {
    id: 5,
    title: "Application Review",
    description: "Prepare and submit your adaptive role applications.",
    status: "locked",
    icon: Lock,
    color: "text-muted-foreground"
  },
  {
    id: 6,
    title: "Employment Success",
    description: "Begin your new role with ongoing provider support.",
    status: "locked",
    icon: Lock,
    color: "text-muted-foreground"
  }
];

export function Journey() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Employment Journey</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A structured, step-by-step path back to fulfilling work. Take it at your own pace.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="relative pl-6 border-l-2 border-muted ml-4 space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${step.status === 'locked' ? 'opacity-60' : ''}`}
                data-testid={`journey-step-${step.id}`}
              >
                <div className="absolute -left-[35px] bg-background p-1 rounded-full">
                  <step.icon className={`h-6 w-6 ${step.color} ${step.status === 'ready' ? 'fill-blue-100 dark:fill-blue-900/30' : ''}`} />
                </div>
                
                <Card className={`bg-card transition-shadow ${step.status === 'ready' ? 'border-blue-200 dark:border-blue-800 shadow-md ring-1 ring-blue-500/20' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      {step.status === "completed" && <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">Done</span>}
                      {step.status === "ready" && <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full uppercase tracking-wider animate-pulse">Next</span>}
                    </div>
                    <CardDescription className="text-sm mt-1">{step.description}</CardDescription>
                  </CardHeader>
                  
                  {(step.status === "ready" || step.status === "pending") && step.action && (
                    <CardContent className="pt-0">
                      <Link href={step.action}>
                        <Button 
                          variant={step.status === "ready" ? "default" : "secondary"} 
                          size="sm"
                          data-testid={`btn-action-step-${step.id}`}
                        >
                          {step.status === "ready" ? "Start Step" : "View"} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20 sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Tips for Success
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Pace Yourself</h4>
                <p className="text-sm text-muted-foreground">Don't rush. The platform saves your progress automatically. Return whenever you have energy.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Be Honest</h4>
                <p className="text-sm text-muted-foreground">In assessments, answer based on how you feel today, not your pre-injury abilities.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Ask for Help</h4>
                <p className="text-sm text-muted-foreground">If a step feels overwhelming, your provider gets an alert and will reach out to adjust your plan.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
