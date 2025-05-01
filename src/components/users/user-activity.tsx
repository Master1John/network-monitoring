"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Clock,
  Filter,
  Laptop,
  Lock,
  MoreHorizontal,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample activity data
const activities = [
  {
    id: "act-001",
    userId: "user-001",
    userName: "John Doe",
    action: "login",
    details: "Logged in from 192.168.1.101",
    timestamp: "2023-04-06T10:45:00",
    severity: "info",
  },
  {
    id: "act-002",
    userId: "user-003",
    userName: "Robert Johnson",
    action: "settings",
    details: "Changed security settings",
    timestamp: "2023-04-06T10:40:00",
    severity: "info",
  },
  {
    id: "act-003",
    userId: "user-002",
    userName: "Jane Smith",
    action: "user",
    details: "Created new user account for Thomas Anderson",
    timestamp: "2023-04-06T10:35:00",
    severity: "info",
  },
  {
    id: "act-004",
    userId: "user-008",
    userName: "Lisa Wilson",
    action: "login",
    details: "Failed login attempt (3rd attempt)",
    timestamp: "2023-04-06T10:30:00",
    severity: "warning",
  },
  {
    id: "act-005",
    userId: "user-012",
    userName: "Jennifer White",
    action: "security",
    details: "Reset password for user Michael Brown",
    timestamp: "2023-04-06T10:25:00",
    severity: "info",
  },
  {
    id: "act-006",
    userId: "user-008",
    userName: "Lisa Wilson",
    action: "locked",
    details: "Account locked due to multiple failed login attempts",
    timestamp: "2023-04-06T10:20:00",
    severity: "critical",
  },
  {
    id: "act-007",
    userId: "user-004",
    userName: "Sarah Williams",
    action: "device",
    details: "Added new device: MacBook Pro",
    timestamp: "2023-04-06T10:15:00",
    severity: "info",
  },
  {
    id: "act-008",
    userId: "user-001",
    userName: "John Doe",
    action: "settings",
    details: "Updated network monitoring rules",
    timestamp: "2023-04-06T10:10:00",
    severity: "info",
  },
  {
    id: "act-009",
    userId: "user-003",
    userName: "Robert Johnson",
    action: "security",
    details: "Enabled two-factor authentication",
    timestamp: "2023-04-06T10:05:00",
    severity: "info",
  },
  {
    id: "act-010",
    userId: "user-002",
    userName: "Jane Smith",
    action: "login",
    details: "Logged in from new location: 203.0.113.42",
    timestamp: "2023-04-06T10:00:00",
    severity: "warning",
  },
];

export function UserActivity() {
  const [filter, setFilter] = useState("all");

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.severity === filter);

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

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <User className="h-4 w-4" />;
      case "settings":
        return <Settings className="h-4 w-4" />;
      case "security":
        return <AlertTriangle className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      case "device":
        return <Laptop className="h-4 w-4" />;
      case "locked":
        return <Lock className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Warning
          </Badge>
        );
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Filter:</span>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="h-8"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            size="sm"
            className="h-8"
            onClick={() => setFilter("critical")}
          >
            Critical
          </Button>
          <Button
            variant={filter === "warning" ? "default" : "outline"}
            size="sm"
            className="h-8"
            onClick={() => setFilter("warning")}
          >
            Warning
          </Button>
          <Button
            variant={filter === "info" ? "default" : "outline"}
            size="sm"
            className="h-8"
            onClick={() => setFilter("info")}
          >
            Info
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {getInitials(activity.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{activity.userName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getActionIcon(activity.action)}
                    <span className="capitalize">{activity.action}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {activity.details}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(activity.timestamp)}
                  </div>
                </TableCell>
                <TableCell>{getSeverityBadge(activity.severity)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View User</DropdownMenuItem>
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
