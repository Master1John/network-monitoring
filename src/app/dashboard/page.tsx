import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/dashboard/overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DeviceStats } from "@/components/dashboard/device-stats";
import { NetworkStatus } from "@/components/dashboard/network-status";
import { AlertsOverview } from "@/components/dashboard/alerts-overview";

// const chartData = [
//   {
//     name: "Mon",
//     "Network Traffic": 4000,
//     "Keylog Events": 2400,
//   },
//   {
//     name: "Tue",
//     "Network Traffic": 3000,
//     "Keylog Events": 1398,
//   },
//   {
//     name: "Wed",
//     "Network Traffic": 2000,
//     "Keylog Events": 9800,
//   },
//   {
//     name: "Thu",
//     "Network Traffic": 2780,
//     "Keylog Events": 3908,
//   },
//   {
//     name: "Fri",
//     "Network Traffic": 1890,
//     "Keylog Events": 4800,
//   },
//   {
//     name: "Sat",
//     "Network Traffic": 2390,
//     "Keylog Events": 3800,
//   },
//   {
//     name: "Sun",
//     "Network Traffic": 3490,
//     "Keylog Events": 4300,
//   },
// ];
export default async function DashboardPage() {
  const response = await fetch("http://localhost:3000/api/dashboard");
  const data = await response.json();
  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats?.total}</div>
            <p className="text-xs text-muted-foreground">{} from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats?.online}</div>
            <p className="text-xs text-muted-foreground">
              {(data.stats?.online / data.stats?.total) * 100} from the total
              devices
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="alerts">Alerts</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading overview...</div>}>
            <Overview data={data.chartData} />
          </Suspense>
          <div className="">
            <Card className="">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<div>Loading activity...</div>}>
                  <RecentActivity activities={data.userActivities} />
                </Suspense>
              </CardContent>
            </Card>
            {/* <Card className="col-span-3"> */}
            {/*   <CardHeader> */}
            {/*     <CardTitle>Device Stats</CardTitle> */}
            {/*     <CardDescription> */}
            {/*       CPU, Memory, and Disk usage across monitored devices */}
            {/*     </CardDescription> */}
            {/*   </CardHeader> */}
            {/*   <CardContent> */}
            {/*     <Suspense fallback={<div>Loading stats...</div>}> */}
            {/*       {/* <DeviceStats /> */}
            {/*     </Suspense> */}
            {/*   </CardContent> */}
            {/* </Card> */}
          </div>
        </TabsContent>
        {/* <TabsContent value="alerts" className="space-y-4"> */}
        {/*   <Card> */}
        {/*     <CardHeader> */}
        {/*       <CardTitle>System Alerts</CardTitle> */}
        {/*       <CardDescription>Recent alerts and notifications</CardDescription> */}
        {/*     </CardHeader> */}
        {/*     <CardContent> */}
        {/*       <Suspense fallback={<div>Loading alerts...</div>}> */}
        {/*         <AlertsOverview /> */}
        {/*       </Suspense> */}
        {/*     </CardContent> */}
        {/*   </Card> */}
        {/* </TabsContent> */}
      </Tabs>
    </div>
  );
}
