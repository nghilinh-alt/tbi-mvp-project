import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Building, Stethoscope, ShieldAlert, Filter, MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialUsers = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "participant", department: "Rehab Alpha", lastActive: "2 hours ago", status: "active" },
  { id: 2, name: "Marcus Williams", email: "mwilliams@example.com", role: "participant", department: "Rehab Beta", lastActive: "1 day ago", status: "active" },
  { id: 3, name: "TechCorp HR Team", email: "hr@techcorp.com", role: "employer", department: "Tech", lastActive: "5 hours ago", status: "active" },
  { id: 4, name: "DataFlow HR", email: "careers@dataflow.io", role: "employer", department: "Logistics", lastActive: "3 days ago", status: "suspended" },
  { id: 5, name: "Alex Rivera", email: "arivera@rehab.org", role: "provider", department: "Occupational Therapy", lastActive: "Just now", status: "active" },
  { id: 6, name: "Dr. Emily Chen", email: "echen@rehab.org", role: "provider", department: "Neurology", lastActive: "4 hours ago", status: "active" },
  { id: 7, name: "Jennifer Martinez", email: "jmartinez@admin.tbip.org", role: "admin", department: "System Operations", lastActive: "Online", status: "active" },
  { id: 8, name: "David Kim", email: "dkim@admin.tbip.org", role: "admin", department: "Compliance", lastActive: "Online", status: "active" }
];

export function AdminDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id && u.role !== "admin") {
        return { ...u, status: u.status === "active" ? "suspended" : "active" };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Administration</h1>
        <p className="text-muted-foreground mt-2">Manage users, roles, and platform health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Employers</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Providers</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-9" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className={`h-2.5 w-2.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} title={user.status} />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        user.role === 'admin' ? 'bg-slate-100 text-slate-800 border-slate-300' :
                        user.role === 'provider' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        user.role === 'employer' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{user.department}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                          {user.role !== "admin" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => toggleStatus(user.id)}
                                className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}
                              >
                                {user.status === 'active' ? <><UserX className="mr-2 h-4 w-4" /> Suspend User</> : <><UserCheck className="mr-2 h-4 w-4" /> Reactivate User</>}
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
