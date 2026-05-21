import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, DollarSign, Briefcase, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const jobs = [
  {
    id: 1,
    title: "Data Organization Specialist",
    employer: "TechCorp Solutions",
    location: "Remote",
    salary: "$22/hr",
    type: "Part-time",
    match: 94,
    description: "Adaptive role focused on cleaning and sorting database entries. Highly structured work with minimal context-switching required.",
    requirements: ["Basic computer skills", "Attention to detail", "Reliable internet"],
    benefits: ["Flexible hours", "Asynchronous communication", "Weekly check-ins"],
  },
  {
    id: 2,
    title: "Digital Archiver",
    employer: "City Library System",
    location: "Hybrid - Seattle, CA",
    salary: "$25/hr",
    type: "Part-time",
    match: 88,
    description: "Scanning and categorizing historical documents. Quiet environment with clear, repeatable processes.",
    requirements: ["Ability to handle delicate items", "Basic typing"],
    benefits: ["Quiet workspace", "No customer interaction", "Predictable routine"],
  },
  {
    id: 3,
    title: "Inventory Auditor",
    employer: "FreshFoods Logistics",
    location: "On-site - Warehouse",
    salary: "$20/hr",
    type: "Full-time",
    match: 82,
    description: "Counting and verifying warehouse stock using a tablet. Active role requiring light physical movement but low cognitive load.",
    requirements: ["Stand for 4 hours", "Use simple tablet app"],
    benefits: ["Clear task completion", "Active movement", "Audio accommodations"],
  },
  {
    id: 4,
    title: "Customer Success Responder",
    employer: "SupportWing",
    location: "Remote",
    salary: "$24/hr",
    type: "Part-time",
    match: 65,
    description: "Answering customer emails using pre-written templates. Requires moderate reading comprehension and empathy.",
    requirements: ["Strong reading skills", "Empathetic tone"],
    benefits: ["Template library provided", "No phone calls", "Extended response times allowed"],
  },
  {
    id: 5,
    title: "Content Moderator",
    employer: "SocialSphere",
    location: "Remote",
    salary: "$21/hr",
    type: "Full-time",
    match: 55,
    description: "Reviewing user-submitted images against community guidelines. Fast-paced visual processing required.",
    requirements: ["Quick visual processing", "Emotional resilience"],
    benefits: ["Full health coverage", "Regular breaks mandated"],
  },
  {
    id: 6,
    title: "Office Coordinator",
    employer: "Apex Consulting",
    location: "On-site - Downtown",
    salary: "$28/hr",
    type: "Full-time",
    match: 45,
    description: "Managing front desk, greeting visitors, and handling incoming calls. High cognitive load and frequent interruptions.",
    requirements: ["Multitasking", "Strong verbal communication"],
    benefits: ["Central location", "Social environment", "Career growth"],
  }
];

export function Jobs() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Matches</h1>
          <p className="text-muted-foreground mt-2">Roles customized and scored based on your current skills assessment.</p>
        </div>
      </div>

      <Card className="bg-card shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search job titles or keywords..." className="pl-9 bg-background" />
            </div>
            <div className="w-full md:w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, i) => {
          const isHighMatch = job.match >= 80;
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`h-full flex flex-col hover:shadow-md transition-all ${isHighMatch ? 'border-primary/50 bg-primary/[0.02]' : 'bg-card'}`} data-testid={`job-card-${job.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    {isHighMatch ? (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 font-semibold px-2 py-1 flex items-center gap-1">
                        <Zap className="h-3 w-3 fill-primary" /> {job.match}% Match
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground font-medium">
                        {job.match}% Match
                      </Badge>
                    )}
                    <Badge variant="secondary" className="font-normal">{job.type}</Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{job.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-foreground/80">{job.employer}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" /> {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 shrink-0" /> {job.salary}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 line-clamp-3">{job.description}</p>
                  
                  {isHighMatch && (
                    <div className="bg-card border rounded-md p-3 text-xs space-y-2 mt-4">
                      <div className="font-semibold flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> Top features for you:</div>
                      <ul className="list-disc pl-4 text-muted-foreground space-y-1">
                        {job.benefits.slice(0,2).map(b => <li key={b}>{b}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-4 border-t flex gap-2">
                  <Button variant="outline" className="flex-1 bg-card" data-testid={`btn-details-${job.id}`}>Details</Button>
                  <Button className="flex-1" data-testid={`btn-apply-${job.id}`}>Apply</Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
