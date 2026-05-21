import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Info, Save, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const categories = [
  {
    id: "comm",
    title: "Communication",
    items: [
      { id: "c1", label: "Reading Comprehension", desc: "Understanding written instructions and emails." },
      { id: "c2", label: "Verbal Expression", desc: "Explaining ideas clearly in meetings or calls." }
    ]
  },
  {
    id: "tech",
    title: "Technical Skills",
    items: [
      { id: "t1", label: "Computer Navigation", desc: "Using standard office software and finding files." },
      { id: "t2", label: "Data Entry", desc: "Typing information accurately into systems." }
    ]
  },
  {
    id: "prof",
    title: "Professional Skills",
    items: [
      { id: "p1", label: "Time Management", desc: "Keeping track of deadlines and schedules." },
      { id: "p2", label: "Task Organization", desc: "Breaking down large tasks into smaller steps." }
    ]
  },
  {
    id: "inter",
    title: "Interpersonal Skills",
    items: [
      { id: "i1", label: "Team Collaboration", desc: "Working smoothly with others on shared goals." },
      { id: "i2", label: "Conflict Resolution", desc: "Handling disagreements professionally." }
    ]
  }
];

export function Skills() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Progress Saved",
      description: "Your assessment answers have been saved.",
    });
  };

  const handleFinish = () => {
    toast({
      title: "Assessment Completed",
      description: "Great job! We are updating your job matches.",
    });
    // would redirect
  };

  const currentCategory = categories[currentStep];
  const progress = ((currentStep) / categories.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills Assessment</h1>
          <p className="text-muted-foreground mt-2">Help us understand your current capabilities to find the right adaptive roles.</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-muted-foreground">Step {currentStep + 1} of {categories.length}</span>
        </div>
      </div>
      
      <Progress value={progress === 0 ? 5 : progress} className="h-2" />

      {currentStep === 0 && Object.keys(answers).length === 0 && (
        <Card className="bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800">
          <CardContent className="p-4 flex gap-4">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300">Why we ask this</h3>
              <p className="text-sm text-blue-800/80 dark:text-blue-400/80 mt-1">
                Your answers help our system automatically decompose standard jobs into adaptive roles that match your specific cognitive profile. There are no right or wrong answers—honesty leads to better job matches. Time required: ~10 mins.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-2xl">{currentCategory.title}</CardTitle>
            <CardDescription>Rate your comfort level with the following activities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentCategory.items.map(item => (
              <div key={item.id} className="space-y-4">
                <div>
                  <h4 className="text-base font-medium">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <RadioGroup 
                  onValueChange={(val) => setAnswers(prev => ({...prev, [item.id]: val}))}
                  value={answers[item.id] || ""}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {[
                    { val: "beginner", label: "Need Support", desc: "I struggle with this or need help." },
                    { val: "intermediate", label: "Comfortable", desc: "I can do this independently." },
                    { val: "advanced", label: "Strong", desc: "I excel at this naturally." }
                  ].map(level => (
                    <div key={level.val}>
                      <RadioGroupItem value={level.val} id={`${item.id}-${level.val}`} className="peer sr-only" />
                      <Label
                        htmlFor={`${item.id}-${level.val}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center"
                      >
                        <span className="font-semibold text-sm">{level.label}</span>
                        <span className="text-xs text-muted-foreground mt-1 font-normal">{level.desc}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6 bg-muted/20">
            <Button variant="outline" onClick={handleSave} data-testid="btn-save-progress">
              <Save className="mr-2 h-4 w-4" /> Save Draft
            </Button>
            
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep < categories.length - 1 ? (
                <Button 
                  onClick={() => setCurrentStep(prev => Math.min(categories.length - 1, prev + 1))}
                  disabled={currentCategory.items.some(i => !answers[i.id])}
                  data-testid="btn-next-step"
                >
                  Next Category
                </Button>
              ) : (
                <Button 
                  onClick={handleFinish}
                  disabled={currentCategory.items.some(i => !answers[i.id])}
                  className="bg-primary"
                  data-testid="btn-finish-assessment"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Finish Assessment
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
