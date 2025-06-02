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

export function UserActivity({ activities }) {
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
            {filteredActivities?.map((activity) => (
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
