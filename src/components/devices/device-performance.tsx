"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample performance data by device
const devicePerformanceData = {
  "device-003": {
    cpu: [
      { time: "10:00", value: 35 },
      { time: "10:05", value: 42 },
      { time: "10:10", value: 38 },
      { time: "10:15", value: 45 },
      { time: "10:20", value: 50 },
      { time: "10:25", value: 48 },
      { time: "10:30", value: 42 },
    ],
    memory: [
      { time: "10:00", value: 55 },
      { time: "10:05", value: 58 },
      { time: "10:10", value: 62 },
      { time: "10:15", value: 65 },
      { time: "10:20", value: 68 },
      { time: "10:25", value: 70 },
      { time: "10:30", value: 65 },
    ],
    disk: [
      { time: "10:00", value: 52 },
      { time: "10:05", value: 53 },
      { time: "10:10", value: 55 },
      { time: "10:15", value: 56 },
      { time: "10:20", value: 57 },
      { time: "10:25", value: 58 },
      { time: "10:30", value: 58 },
    ],
    network: [
      { time: "10:00", value: 25 },
      { time: "10:05", value: 35 },
      { time: "10:10", value: 45 },
      { time: "10:15", value: 30 },
      { time: "10:20", value: 20 },
      { time: "10:25", value: 40 },
      { time: "10:30", value: 35 },
    ],
    processes: [
      { name: "chrome.exe", cpu: 15, memory: 350 },
      { name: "word.exe", cpu: 8, memory: 120 },
      { name: "explorer.exe", cpu: 5, memory: 85 },
      { name: "outlook.exe", cpu: 7, memory: 180 },
      { name: "teams.exe", cpu: 12, memory: 280 },
    ],
  },
  "device-004": {
    cpu: [
      { time: "09:15", value: 0 },
      { time: "09:20", value: 0 },
      { time: "09:25", value: 0 },
      { time: "09:30", value: 0 },
      { time: "09:35", value: 0 },
      { time: "09:40", value: 0 },
      { time: "09:45", value: 0 },
    ],
    memory: [
      { time: "09:15", value: 0 },
      { time: "09:20", value: 0 },
      { time: "09:25", value: 0 },
      { time: "09:30", value: 0 },
      { time: "09:35", value: 0 },
      { time: "09:40", value: 0 },
      { time: "09:45", value: 0 },
    ],
    disk: [
      { time: "09:15", value: 72 },
      { time: "09:20", value: 72 },
      { time: "09:25", value: 72 },
      { time: "09:30", value: 72 },
      { time: "09:35", value: 72 },
      { time: "09:40", value: 72 },
      { time: "09:45", value: 72 },
    ],
    network: [
      { time: "09:15", value: 0 },
      { time: "09:20", value: 0 },
      { time: "09:25", value: 0 },
      { time: "09:30", value: 0 },
      { time: "09:35", value: 0 },
      { time: "09:40", value: 0 },
      { time: "09:45", value: 0 },
    ],
    processes: [],
  },
  "device-006": {
    cpu: [
      { time: "10:10", value: 65 },
      { time: "10:15", value: 72 },
      { time: "10:20", value: 78 },
      { time: "10:25", value: 85 },
      { time: "10:30", value: 82 },
      { time: "10:35", value: 75 },
      { time: "10:40", value: 78 },
    ],
    memory: [
      { time: "10:10", value: 70 },
      { time: "10:15", value: 75 },
      { time: "10:20", value: 80 },
      { time: "10:25", value: 85 },
      { time: "10:30", value: 88 },
      { time: "10:35", value: 85 },
      { time: "10:40", value: 85 },
    ],
    disk: [
      { time: "10:10", value: 55 },
      { time: "10:15", value: 58 },
      { time: "10:20", value: 60 },
      { time: "10:25", value: 62 },
      { time: "10:30", value: 62 },
      { time: "10:35", value: 62 },
      { time: "10:40", value: 62 },
    ],
    network: [
      { time: "10:10", value: 45 },
      { time: "10:15", value: 55 },
      { time: "10:20", value: 65 },
      { time: "10:25", value: 60 },
      { time: "10:30", value: 50 },
      { time: "10:35", value: 45 },
      { time: "10:40", value: 40 },
    ],
    processes: [
      { name: "nginx", cpu: 25, memory: 450 },
      { name: "mysql", cpu: 35, memory: 850 },
      { name: "php-fpm", cpu: 18, memory: 320 },
      { name: "sshd", cpu: 2, memory: 45 },
      { name: "cron", cpu: 1, memory: 30 },
    ],
  },
  "device-007": {
    cpu: [
      { time: "10:00", value: 25 },
      { time: "10:05", value: 30 },
      { time: "10:10", value: 35 },
      { time: "10:15", value: 32 },
      { time: "10:20", value: 35 },
    ],
    memory: [
      { time: "10:00", value: 40 },
      { time: "10:05", value: 42 },
      { time: "10:10", value: 45 },
      { time: "10:15", value: 48 },
      { time: "10:20", value: 48 },
    ],
    disk: [
      { time: "10:00", value: 70 },
      { time: "10:05", value: 72 },
      { time: "10:10", value: 73 },
      { time: "10:15", value: 75 },
      { time: "10:20", value: 75 },
    ],
    network: [
      { time: "10:00", value: 15 },
      { time: "10:05", value: 25 },
      { time: "10:10", value: 35 },
      { time: "10:15", value: 20 },
      { time: "10:20", value: 15 },
    ],
    processes: [
      { name: "Mail", cpu: 8, memory: 150 },
      { name: "Safari", cpu: 12, memory: 280 },
      { name: "Messages", cpu: 5, memory: 120 },
      { name: "Photos", cpu: 10, memory: 200 },
    ],
  },
};

export function DevicePerformance({
  deviceId,
  detailed = false,
}: {
  deviceId: string;
  detailed?: boolean;
}) {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("hour");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPerformanceData(
        devicePerformanceData[deviceId as keyof typeof devicePerformanceData] ||
          null,
      );
      setLoading(false);
    }, 500);
  }, [deviceId]);

  if (loading) {
    return <div>Loading performance data...</div>;
  }

  if (!performanceData) {
    return <div>No performance data available for this device.</div>;
  }

  // Combine data for overview chart
  const combinedData = performanceData.cpu.map((item: any, index: number) => ({
    time: item.time,
    CPU: item.value,
    Memory: performanceData.memory[index]?.value || 0,
    Disk: performanceData.disk[index]?.value || 0,
    Network: performanceData.network[index]?.value || 0,
  }));

  if (!detailed) {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="CPU"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Memory"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Disk"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Network"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cpu-memory">CPU & Memory</TabsTrigger>
          <TabsTrigger value="disk">Disk</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="CPU"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Memory"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Disk"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Network"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {performanceData.processes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Top Processes</CardTitle>
                <CardDescription>
                  Processes with highest resource usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData.processes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="hsl(var(--primary))"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="hsl(var(--secondary))"
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="cpu"
                        name="CPU %"
                        fill="hsl(var(--primary))"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="memory"
                        name="Memory (MB)"
                        fill="hsl(var(--secondary))"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cpu-memory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CPU Usage</CardTitle>
                <CardDescription>CPU utilization over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData.cpu}>
                      <defs>
                        <linearGradient
                          id="cpuGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#cpuGradient)"
                        name="CPU %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Memory Usage</CardTitle>
                <CardDescription>Memory utilization over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData.memory}>
                      <defs>
                        <linearGradient
                          id="memoryGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--secondary))"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--secondary))"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--secondary))"
                        fillOpacity={1}
                        fill="url(#memoryGradient)"
                        name="Memory %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Disk Usage</CardTitle>
              <CardDescription>Disk utilization over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData.disk}>
                    <defs>
                      <linearGradient
                        id="diskGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--accent))"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--accent))"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--accent))"
                      fillOpacity={1}
                      fill="url(#diskGradient)"
                      name="Disk %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Activity</CardTitle>
              <CardDescription>Network utilization over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData.network}>
                    <defs>
                      <linearGradient
                        id="networkGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--destructive))"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--destructive))"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--destructive))"
                      fillOpacity={1}
                      fill="url(#networkGradient)"
                      name="Network Mbps"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
