"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample user activity data
const userActivityData = {
  "user-001": [
    {
      id: "act-001",
      action: "login",
      details: "Logged in from 192.168.1.101",
      timestamp: "2023-04-06T10:45:00",
      severity: "info",
    },
    {
      id: "act-008",
      action: "settings",
      details: "Updated network monitoring rules",
      timestamp: "2023-04-06T10:10:00",
      severity: "info",
    },
    {
      id: "act-011",
      action: "device",
      details: "Added new device: Server-Main",
      timestamp: "2023-04-06T09:55:00",
      severity: "info",
    },
    {
      id: "act-015",
      action: "security",
      details: "Reviewed security alerts",
      timestamp: "2023-04-06T09:30:00",
      severity: "info",
    },
    {
      id: "act-020",
      action: "login",
      details: "Logged in from 192.168.1.101",
      timestamp: "2023-04-05T08:45:00",
      severity: "info",
    },
  ],
  "user-002": [
    {
      id: "act-003",
      action: "user",
      details: "Created new user account for Thomas Anderson",
      timestamp: "2023-04-06T10:35:00",
      severity: "info",
    },
    {
      id: "act-010",
      action: "login",
      details: "Logged in from new location: 203.0.113.42",
      timestamp: "2023-04-06T10:00:00",
      severity: "warning",
    },
  ],
  "user-003": [
    {
      id: "act-002",
      action: "settings",
      details: "Changed security settings",
      timestamp: "2023-04-06T10:40:00",
      severity: "info",
    },
    {
      id: "act-009",
      action: "security",
      details: "Enabled two-factor authentication",
      timestamp: "2023-04-06T10:05:00",
      severity: "info",
    },
  ],
  "user-008": [
    {
      id: "act-004",
      action: "login",
      details: "Failed login attempt (3rd attempt)",
      timestamp: "2023-04-06T10:30:00",
      severity: "warning",
    },
    {
      id: "act-006",
      action: "locked",
      details: "Account locked due to multiple failed login attempts",
      timestamp: "2023-04-06T10:20:00",
      severity: "critical",
    },
  ],
  "user-012": [
    {
      id: "act-005",
      action: "security",
      details: "Reset password for user Michael Brown",
      timestamp: "2023-04-06T10:25:00",
      severity: "info",
    },
  ],
};

export function UserActivityLog({
  userId,
  limit,
}: {
  userId: string;
  limit?: number;
}) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const userActivities =
        userActivityData[userId as keyof typeof userActivityData] || [];
      setActivities(limit ? userActivities.slice(0, limit) : userActivities);
      setLoading(false);
    }, 500);
  }, [userId, limit]);

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

  if (loading) {
    return <div>Loading activity log...</div>;
  }

  if (activities.length === 0) {
    return <div>No activity log found for this user.</div>;
  }

  return (
    <div>
      {!limit && (
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
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Time</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Severity</TableHead>
              {!limit && <TableHead className="w-[50px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(activity.timestamp)}
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
                <TableCell>{getSeverityBadge(activity.severity)}</TableCell>
                {!limit && (
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
