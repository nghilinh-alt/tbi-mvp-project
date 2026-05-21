import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Wand2, CheckCircle2, ListChecks, CalendarClock, Eye } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

export function EmployerPortal() {
  const [jobTitle, setJobTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<boolean>(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResult(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Adaptive Role</h1>
        <p className="text-muted-foreground mt-2">Upload a standard job description to automatically generate structured, accessible roles.</p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Wand2 className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">NIIQ Task Decomposition</AlertTitle>
        <AlertDescription>
          Our system analyzes complex roles and breaks them down into isolated task clusters based on cognitive load, environmental demands, and sensory inputs.
        </AlertDescription>
      </Alert>

      {!result ? (
        <Card className="bg-card shadow-sm border-primary/10">
          <form onSubmit={handleGenerate}>
            <CardHeader>
              <CardTitle>Role Details</CardTitle>
              <CardDescription>Provide the base role you want to adapt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Standard Job Title</Label>
                <Input id="title" required value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Administrative Assistant" />
              </div>
              
              <div className="space-y-2">
                <Label>Job Description Document</Label>
                <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Click to upload or drag and drop</h3>
                  <p className="text-sm text-muted-foreground">PDF, DOCX, or TXT up to 5MB</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t p-6">
              <Button type="submit" disabled={isGenerating || !jobTitle} className="w-full" size="lg" data-testid="btn-generate-role">
                {isGenerating ? (
                  <span className="flex items-center gap-2 animate-pulse">
                    <Wand2 className="h-4 w-4 animate-spin" /> Decomposing Tasks...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4" /> Generate Adaptive Role
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Generated Adaptive Role</h2>
              <Button variant="outline" onClick={() => setResult(false)}>Start Over</Button>
            </div>

            <Card className="bg-card border-primary">
              <CardHeader className="bg-primary/5 border-b pb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary hover:bg-primary">Ready to Post</Badge>
                  <CardTitle>Adaptive {jobTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                    <ListChecks className="h-5 w-5 text-primary" /> Task Clusters
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-md p-4 bg-muted/10 border-l-4 border-l-green-500">
                      <h4 className="font-semibold text-sm text-green-700 dark:text-green-400 mb-2">Low Complexity (Core)</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                        <li>Data entry into primary CRM</li>
                        <li>Digital filing of processed forms</li>
                        <li>Mail sorting by department</li>
                      </ul>
                    </div>
                    <div className="border rounded-md p-4 bg-muted/10 border-l-4 border-l-amber-500">
                      <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-2">Medium Complexity (Optional)</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                        <li>Drafting standard email replies</li>
                        <li>Supply inventory counts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                    <CalendarClock className="h-5 w-5 text-primary" /> Suggested Onboarding Structure
                  </h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-sm">W1</div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border p-4 rounded-md shadow-sm">
                        <h4 className="font-semibold text-sm text-primary mb-1">Phase 1: Stabilization</h4>
                        <p className="text-sm text-muted-foreground">Start with low complexity tasks only. Monitor daily first week to establish routine and assess fatigue.</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-sm">W3</div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border p-4 rounded-md shadow-sm">
                        <h4 className="font-semibold text-sm mb-1">Phase 2: Expansion</h4>
                        <p className="text-sm text-muted-foreground">Introduce medium complexity tasks one at a time. Shift to twice-weekly check-ins.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </CardContent>
              <CardFooter className="bg-muted/20 border-t p-6 flex gap-4">
                <Button variant="outline" className="flex-1 bg-card"><Eye className="mr-2 h-4 w-4" /> Preview Listing</Button>
                <Button className="flex-1 bg-primary text-primary-foreground" data-testid="btn-approve-post"><CheckCircle2 className="mr-2 h-4 w-4" /> Approve & Post to Network</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
