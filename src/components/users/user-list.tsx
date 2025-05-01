"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  CircleCheck,
  CircleX,
  Eye,
  Lock,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  User,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample user data
const users = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T10:45:00",
    devices: 2,
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T10:30:00",
    devices: 1,
  },
  {
    id: "user-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T09:15:00",
    devices: 3,
  },
  {
    id: "user-004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T10:20:00",
    devices: 1,
  },
  {
    id: "user-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T08:45:00",
    devices: 2,
  },
  {
    id: "user-006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    status: "inactive",
    lastActive: "2023-04-05T16:30:00",
    devices: 1,
  },
  {
    id: "user-007",
    name: "David Miller",
    email: "david.miller@example.com",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T09:50:00",
    devices: 1,
  },
  {
    id: "user-008",
    name: "Lisa Wilson",
    email: "lisa.wilson@example.com",
    role: "user",
    status: "locked",
    lastActive: "2023-04-04T14:20:00",
    devices: 1,
  },
  {
    id: "user-009",
    name: "James Taylor",
    email: "james.taylor@example.com",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T10:10:00",
    devices: 1,
  },
  {
    id: "user-010",
    name: "Patricia Moore",
    email: "patricia.moore@example.com",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T09:30:00",
    devices: 2,
  },
  {
    id: "user-011",
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    role: "user",
    status: "inactive",
    lastActive: "2023-04-05T11:45:00",
    devices: 1,
  },
  {
    id: "user-012",
    name: "Jennifer White",
    email: "jennifer.white@example.com",
    role: "security",
    status: "active",
    lastActive: "2023-04-06T10:05:00",
    devices: 2,
  },
];

export function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-primary" />;
      case "security":
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <CircleCheck className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <CircleX className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        );
      case "locked":
        return (
          <Badge variant="destructive">
            <Lock className="mr-1 h-3 w-3" />
            Locked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewUser = (userId: string) => {
    router.push(`/dashboard/users/${userId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>Add User</span>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>User</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Devices</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewUser(user.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{formatDate(user.lastActive)}</TableCell>
                <TableCell>{user.devices}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewUser(user.id);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>Edit User</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "locked" ? (
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <CircleCheck className="mr-2 h-4 w-4" />
                          <span>Unlock Account</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Lock className="mr-2 h-4 w-4" />
                          <span>Lock Account</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
