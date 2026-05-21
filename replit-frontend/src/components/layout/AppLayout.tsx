import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  User, Shield, Stethoscope, Briefcase, Activity, 
  LogOut, Settings, Bell, Menu, Home, Map, BookOpen, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const portals = [
  { name: "Employee App", href: "/dashboard", icon: User, match: ["/dashboard", "/journey", "/skills", "/jobs"] },
  { name: "Admin Dashboard", href: "/admin", icon: Shield, match: ["/admin"] },
  { name: "Provider Console", href: "/provider", icon: Stethoscope, match: ["/provider"] },
  { name: "Employer Portal", href: "/employer", icon: Briefcase, match: ["/employer"] },
  { name: "NIIQ Intelligence", href: "/niiq", icon: Activity, match: ["/niiq"] }
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  if (location === "/login" || location === "/") {
    return <>{children}</>;
  }

  const currentPortal = portals.find(p => p.match.some(m => location.startsWith(m))) || portals[0];

  const renderNavLinks = () => (
    <div className="flex flex-col gap-2">
      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Portals
      </div>
      {portals.map((portal) => {
        const isActive = portal.name === currentPortal.name;
        return (
          <Link key={portal.name} href={portal.href} className="w-full">
            <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-primary text-primary-foreground font-medium shadow-sm" : "hover:bg-muted text-foreground"}`} data-testid={`nav-${portal.name.toLowerCase().replace(' ', '-')}`}>
              <portal.icon className="h-5 w-5" />
              {portal.name}
            </div>
          </Link>
        );
      })}

      {currentPortal.name === "Employee App" && (
        <>
          <div className="px-3 py-2 mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Employee Menu
          </div>
          {[
            { name: "Home", href: "/dashboard", icon: Home },
            { name: "My Journey", href: "/journey", icon: Map },
            { name: "Skills Assessment", href: "/skills", icon: BookOpen },
            { name: "Job Matches", href: "/jobs", icon: Search },
          ].map(link => {
            const isActive = location === link.href;
            return (
              <Link key={link.name} href={link.href} className="w-full">
                <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-muted text-foreground"}`} data-testid={`nav-employee-${link.name.toLowerCase().replace(' ', '-')}`}>
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </div>
              </Link>
            )
          })}
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2 font-bold text-lg text-primary">
          <currentPortal.icon className="h-6 w-6" />
          {currentPortal.name}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4 flex flex-col gap-4">
            <div className="font-bold text-xl text-primary mb-4">TBI Pathways</div>
            {renderNavLinks()}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card h-screen sticky top-0 shrink-0">
        <div className="p-6">
          <div className="font-bold text-xl text-primary flex items-center gap-2">
            <Activity className="h-6 w-6" />
            TBI Pathways
          </div>
        </div>
        <div className="px-4 flex-1 overflow-auto">
          {renderNavLinks()}
        </div>
        <div className="p-4 border-t">
          <Link href="/login">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-destructive/10 text-destructive cursor-pointer" data-testid="nav-logout">
              <LogOut className="h-5 w-5" />
              Sign Out
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 font-semibold text-lg text-foreground">
            <currentPortal.icon className="h-5 w-5 text-primary" />
            {currentPortal.name}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              JS
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
