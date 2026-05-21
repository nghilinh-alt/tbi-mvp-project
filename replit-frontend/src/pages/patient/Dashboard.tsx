import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Map, Search, ArrowRight, CheckCircle2, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Dashboard() {
  return (
    <div className="space-y-8 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Sarah</h1>
          <p className="text-muted-foreground mt-1">You're making great progress on your journey to employment.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-card">Contact Provider</Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Modules</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/12</div>
            <p className="text-xs text-muted-foreground mt-1">33% of your pathway completed</p>
            <Progress value={33} className="mt-3 h-2" />
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5</div>
            <p className="text-xs text-muted-foreground mt-1">+2.5 hours this week</p>
            <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden flex">
              <div className="h-full bg-primary w-[40%]"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-primary-foreground/90">Next Step</CardTitle>
            <Zap className="h-4 w-4 text-primary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold leading-tight">Skills Assessment</div>
            <p className="text-sm text-primary-foreground/80 mt-1">Ready to complete</p>
            <Link href="/skills">
              <Button size="sm" variant="secondary" className="mt-4 w-full" data-testid="btn-start-assessment">
                Start Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card className="col-span-full border-dashed bg-muted/30">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue where you left off or explore new areas.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/journey">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group" data-testid="action-card-journey">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Map className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">View Journey</h3>
                  <p className="text-xs text-muted-foreground mt-1">See your overall progress and upcoming milestones.</p>
                </div>
              </div>
            </Link>
            
            <Link href="/skills">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group" data-testid="action-card-skills">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Update Skills</h3>
                  <p className="text-xs text-muted-foreground mt-1">Refine your profile to get better job matches.</p>
                </div>
              </div>
            </Link>
            
            <Link href="/jobs">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group sm:col-span-2 lg:col-span-1" data-testid="action-card-jobs">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Explore Jobs</h3>
                  <p className="text-xs text-muted-foreground mt-1">Browse open roles matched to your current abilities.</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold tracking-tight mb-4">Platform Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Personalized Pathway", desc: "A plan built around your unique recovery timeline and goals." },
            { title: "Structured Learning", desc: "Bite-sized modules designed for cognitive accessibility." },
            { title: "Job Matching", desc: "Connect with employers who understand and accommodate." },
            { title: "Community Support", desc: "Direct access to providers and peers on similar journeys." },
          ].map((feature, i) => (
            <Card key={i} className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
