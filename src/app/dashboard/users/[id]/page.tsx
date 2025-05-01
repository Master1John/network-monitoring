import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/components/users/user-profile";
import { UserDevices } from "@/components/users/user-devices";
import { UserPermissions } from "@/components/users/user-permissions";
import { UserLoginHistory } from "@/components/users/user-login-history";
import { UserActivityLog } from "@/components/users/user-activity-log";

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const userId = params.id;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/users">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to users</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
      </div>

      <Suspense fallback={<div>Loading user profile...</div>}>
        <UserProfile userId={userId} />
      </Suspense>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="login-history">Login History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions performed by this user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading activity...</div>}>
                  <UserActivityLog userId={userId} limit={5} />
                </Suspense>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assigned Devices</CardTitle>
                <CardDescription>
                  Devices associated with this user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading devices...</div>}>
                  <UserDevices userId={userId} limit={5} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Logins</CardTitle>
              <CardDescription>Login history for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading login history...</div>}>
                <UserLoginHistory userId={userId} limit={5} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Devices</CardTitle>
              <CardDescription>
                All devices associated with this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading devices...</div>}>
                <UserDevices userId={userId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>
                Manage user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading permissions...</div>}>
                <UserPermissions userId={userId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Complete activity history for this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading activity log...</div>}>
                <UserActivityLog userId={userId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>
                Complete login history for this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading login history...</div>}>
                <UserLoginHistory userId={userId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
