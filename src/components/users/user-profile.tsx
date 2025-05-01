"use client";

import { useEffect, useState } from "react";
import {
  CircleCheck,
  CircleX,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldAlert,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample user data
const userData = {
  "user-001": {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T10:45:00",
    location: "New York, USA",
    department: "IT",
    position: "System Administrator",
    joinDate: "2022-01-15",
    twoFactorEnabled: true,
  },
  "user-002": {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T10:30:00",
    location: "San Francisco, USA",
    department: "IT",
    position: "Network Administrator",
    joinDate: "2022-02-10",
    twoFactorEnabled: true,
  },
  "user-003": {
    id: "user-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T09:15:00",
    location: "Chicago, USA",
    department: "IT",
    position: "IT Director",
    joinDate: "2021-11-05",
    twoFactorEnabled: true,
  },
  "user-008": {
    id: "user-008",
    name: "Lisa Wilson",
    email: "lisa.wilson@example.com",
    phone: "+1 (555) 234-5678",
    role: "user",
    status: "locked",
    lastActive: "2023-04-04T14:20:00",
    location: "Boston, USA",
    department: "Marketing",
    position: "Marketing Specialist",
    joinDate: "2022-06-20",
    twoFactorEnabled: false,
  },
  "user-012": {
    id: "user-012",
    name: "Jennifer White",
    email: "jennifer.white@example.com",
    phone: "+1 (555) 876-5432",
    role: "security",
    status: "active",
    lastActive: "2023-04-06T10:05:00",
    location: "Seattle, USA",
    department: "Security",
    position: "Security Analyst",
    joinDate: "2022-04-15",
    twoFactorEnabled: true,
  },
};

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser(userData[userId as keyof typeof userData] || null);
      setLoading(false);
    }, 500);
  }, [userId]);

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
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
        return <Shield className="h-5 w-5 text-primary" />;
      case "security":
        return <ShieldAlert className="h-5 w-5 text-destructive" />;
      default:
        return <User className="h-5 w-5 text-muted-foreground" />;
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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold">{user.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  {getRoleIcon(user.role)}
                  <span className="capitalize">{user.role}</span>
                </div>
                {getStatusBadge(user.status)}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.position} • {user.department}
              </p>
            </div>
          </div>

          <div className="ml-auto flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Reset Password
              </Button>
              {user.status === "locked" ? (
                <Button variant="default" size="sm">
                  Unlock Account
                </Button>
              ) : (
                <Button variant="destructive" size="sm">
                  Lock Account
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Member since {formatDate(user.joinDate)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t pt-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-2">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-2">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-2">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{user.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-2">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Two-Factor Authentication
              </p>
              <p className="font-medium">
                {user.twoFactorEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-2">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Active</p>
              <p className="font-medium">{formatDate(user.lastActive)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
