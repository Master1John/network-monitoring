"use client";
import { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserList } from "@/components/users/user-list";
import { UserStats } from "@/components/users/user-stats";
import { UserActivity } from "@/components/users/user-activity";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [stats, setStats] = useState<{ total: number; active: number }>([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();

        if (data.stats) {
          setStats(data.stats);
        }

        if (data.userActivities) {
          setActivities(data.activities);
        }

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch users stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">67% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">25% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Locked Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Due to security policy
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>
              All users with access to the monitoring system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading users...</div>}>
              <UserList />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>
              User activity and role distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading statistics...</div>}>
              <UserStats />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
          <CardDescription>Latest actions performed by users</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading activity...</div>}>
            <UserActivity activitites={activities} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
