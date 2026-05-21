import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export function Login() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLocation("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 text-primary">
            <Activity className="h-10 w-10" />
            <h1 className="text-3xl font-bold">TBI Pathways</h1>
          </div>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to continue your employment journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-primary/5 border-primary/20 text-primary mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Demo Mode Active</AlertTitle>
              <AlertDescription>
                You can sign in with any credentials to explore the platform.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required defaultValue="demo@tbipathways.org" data-testid="input-email" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required defaultValue="password123" data-testid="input-password" />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading} data-testid="button-submit-login">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center">
            <div className="text-sm text-muted-foreground">
              Need help accessing your account? <br />
              <Link href="#" className="text-primary hover:underline">Contact your support provider</Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
