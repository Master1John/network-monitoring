"use client";
import { useEffect, useState, Suspense } from "react";
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
import useSocketIO from "@/hooks/useSocketIO";
import { Device, Packet } from "@/types";

export default function DashboardPage() {
  const [nodes, setNodes] = useState<Array<Device>>([]);
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [userActivities, setUserActivities] = useState<any>(null);

  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    const response = await fetch("/api/dashboard");

    const data = (await response.json()) as { packets: Array<Packet> };

    setData(data);
    setStats(data?.stats);
    setChartData(data?.chartData);
    setUserActivities(data?.userActivities);
    setDevices(data?.devices);
  };

  useEffect(() => {
    const socket = useSocketIO();
    fetchDashboard().finally(() => {
      socket
        .join("Admin")
        .here(() => {})
        .listen("Node", (node: Node) => {
          setNodes((nodes) => [...nodes, { ...node, id: node.socketId }]);
        })
        .listen("Nodes", (nodes: Array<Node>) => {
          setNodes(nodes.map((n) => ({ ...n, id: n.socketId })));
        });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {devices.length + nodes.length}
            </div>
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
            <div className="text-2xl font-bold text-green-500">
              {nodes.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {(nodes.length / (nodes.length + devices.length)) * 100} from the
              total devices
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
            <Overview data={chartData} />
          </Suspense>
          <div className="">
            <Card className="">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<div>Loading activity...</div>}>
                  <RecentActivity activities={userActivities} />
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
