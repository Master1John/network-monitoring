"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpDown,
  Check,
  Clock,
  Globe,
  MoreHorizontal,
  Shield,
  X,
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

// Sample user login history data
const userLoginHistoryData = {
  "user-001": [
    {
      id: "login-001",
      timestamp: "2023-04-06T10:45:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-005",
      timestamp: "2023-04-05T08:45:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-010",
      timestamp: "2023-04-04T09:30:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-015",
      timestamp: "2023-04-03T10:15:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-020",
      timestamp: "2023-04-02T08:30:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
  ],
  "user-002": [
    {
      id: "login-002",
      timestamp: "2023-04-06T10:30:00",
      ipAddress: "192.168.1.102",
      location: "San Francisco, USA",
      device: "macOS / Safari",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-006",
      timestamp: "2023-04-06T10:00:00",
      ipAddress: "203.0.113.42",
      location: "Los Angeles, USA",
      device: "macOS / Safari",
      status: "success",
      twoFactor: true,
    },
  ],
  "user-003": [
    {
      id: "login-003",
      timestamp: "2023-04-06T09:15:00",
      ipAddress: "192.168.1.103",
      location: "Chicago, USA",
      device: "Windows 10 / Firefox",
      status: "success",
      twoFactor: true,
    },
  ],
  "user-008": [
    {
      id: "login-004",
      timestamp: "2023-04-06T10:30:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "failed",
      twoFactor: false,
      reason: "Invalid password",
    },
    {
      id: "login-007",
      timestamp: "2023-04-06T10:25:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "failed",
      twoFactor: false,
      reason: "Invalid password",
    },
    {
      id: "login-008",
      timestamp: "2023-04-06T10:20:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "failed",
      twoFactor: false,
      reason: "Invalid password",
    },
    {
      id: "login-009",
      timestamp: "2023-04-04T14:20:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "success",
      twoFactor: false,
    },
  ],
  "user-012": [
    {
      id: "login-011",
      timestamp: "2023-04-06T10:05:00",
      ipAddress: "192.168.1.112",
      location: "Seattle, USA",
      device: "Windows 11 / Edge",
      status: "success",
      twoFactor: true,
    },
  ],
};

export function UserLoginHistory({
  userId,
  limit,
}: {
  userId: string;
  limit?: number;
}) {
  const [loginHistory, setLoginHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const history =
        userLoginHistoryData[userId as keyof typeof userLoginHistoryData] || [];
      setLoginHistory(limit ? history.slice(0, limit) : history);
      setLoading(false);
    }, 500);
  }, [userId, limit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  if (loading) {
    return <div>Loading login history...</div>;
  }

  if (loginHistory.length === 0) {
    return <div>No login history found for this user.</div>;
  }

  return (
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
            <TableHead>IP Address</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>2FA</TableHead>
            {!limit && <TableHead className="w-[50px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loginHistory.map((login) => (
            <TableRow key={login.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {formatDate(login.timestamp)}
                </div>
              </TableCell>
              <TableCell>{login.ipAddress}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  {login.location}
                </div>
              </TableCell>
              <TableCell>{login.device}</TableCell>
              <TableCell>
                {login.status === "success" ? (
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-500"
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Success
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <X className="mr-1 h-3 w-3" />
                    Failed
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {login.twoFactor ? (
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    <Shield className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline">Not Used</Badge>
                )}
              </TableCell>
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
  );
}
