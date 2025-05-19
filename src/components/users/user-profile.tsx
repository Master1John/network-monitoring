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

type UserProfileData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  lastActive: string;
  location: string;
  department: string;
  position: string;
  joinDate: string;
  twoFactorEnabled: boolean;
};

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleLockUnlock = async () => {
    if (!user) return;

    try {
      const newStatus = user.status === "locked" ? "active" : "locked";

      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser({
          ...user,
          status: newStatus,
        });
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

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
                <Button variant="default" size="sm" onClick={handleLockUnlock}>
                  Unlock Account
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLockUnlock}
                >
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
