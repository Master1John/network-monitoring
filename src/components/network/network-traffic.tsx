"use client";

import {
  Area,
  AreaChart,
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

const hourlyData = [
  { time: "00:00", inbound: 42, outbound: 28 },
  { time: "01:00", inbound: 35, outbound: 22 },
  { time: "02:00", inbound: 30, outbound: 18 },
  { time: "03:00", inbound: 27, outbound: 15 },
  { time: "04:00", inbound: 25, outbound: 14 },
  { time: "05:00", inbound: 28, outbound: 16 },
  { time: "06:00", inbound: 35, outbound: 21 },
  { time: "07:00", inbound: 45, outbound: 30 },
  { time: "08:00", inbound: 65, outbound: 45 },
  { time: "09:00", inbound: 80, outbound: 60 },
  { time: "10:00", inbound: 85, outbound: 65 },
  { time: "11:00", inbound: 82, outbound: 62 },
  { time: "12:00", inbound: 75, outbound: 55 },
  { time: "13:00", inbound: 78, outbound: 58 },
  { time: "14:00", inbound: 82, outbound: 62 },
  { time: "15:00", inbound: 85, outbound: 65 },
  { time: "16:00", inbound: 80, outbound: 60 },
  { time: "17:00", inbound: 75, outbound: 55 },
  { time: "18:00", inbound: 70, outbound: 50 },
  { time: "19:00", inbound: 65, outbound: 45 },
  { time: "20:00", inbound: 60, outbound: 40 },
  { time: "21:00", inbound: 55, outbound: 35 },
  { time: "22:00", inbound: 50, outbound: 30 },
  { time: "23:00", inbound: 45, outbound: 25 },
];

const dailyData = [
  { day: "Mon", inbound: 65, outbound: 45, peak: 85 },
  { day: "Tue", inbound: 70, outbound: 50, peak: 90 },
  { day: "Wed", inbound: 75, outbound: 55, peak: 95 },
  { day: "Thu", inbound: 80, outbound: 60, peak: 100 },
  { day: "Fri", inbound: 75, outbound: 55, peak: 95 },
  { day: "Sat", inbound: 60, outbound: 40, peak: 80 },
  { day: "Sun", inbound: 55, outbound: 35, peak: 75 },
];
//
// const protocolData = [
//   { name: "HTTP/HTTPS", value: 65 },
//   { name: "SSH/SFTP", value: 15 },
//   { name: "FTP", value: 5 },
//   { name: "SMTP/POP3", value: 8 },
//   { name: "Other", value: 7 },
// ];

export function NetworkTraffic({ protocolData }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="hourly" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>
        <TabsContent value="hourly" className="space-y-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient
                    id="inboundGradient"
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
                  <linearGradient
                    id="outboundGradient"
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
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="inbound"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#inboundGradient)"
                  name="Inbound (Mbps)"
                />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  stroke="hsl(var(--secondary))"
                  fillOpacity={1}
                  fill="url(#outboundGradient)"
                  name="Outbound (Mbps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {/* <Card> */}
            {/*   <CardHeader className="pb-2"> */}
            {/*     <CardTitle>Current Bandwidth</CardTitle> */}
            {/*   </CardHeader> */}
            {/*   <CardContent> */}
            {/*     <div className="text-2xl font-bold">45.8 Mbps</div> */}
            {/*     <p className="text-xs text-muted-foreground"> */}
            {/*       Total network throughput */}
            {/*     </p> */}
            {/*   </CardContent> */}
            {/* </Card> */}
            {/* <Card> */}
            {/*   <CardHeader className="pb-2"> */}
            {/*     <CardTitle>Peak Today</CardTitle> */}
            {/*   </CardHeader> */}
            {/*   <CardContent> */}
            {/*     <div className="text-2xl font-bold">85.2 Mbps</div> */}
            {/*     <p className="text-xs text-muted-foreground">At 10:15 AM</p> */}
            {/*   </CardContent> */}
            {/* </Card> */}
            {/* <Card> */}
            {/*   <CardHeader className="pb-2"> */}
            {/*     <CardTitle>Total Transferred</CardTitle> */}
            {/*   </CardHeader> */}
            {/*   <CardContent> */}
            {/*     <div className="text-2xl font-bold">1.45 TB</div> */}
            {/*     <p className="text-xs text-muted-foreground"> */}
            {/*       In the last 24 hours */}
            {/*     </p> */}
            {/*   </CardContent> */}
            {/* </Card> */}
          </div>
        </TabsContent>
        <TabsContent value="daily" className="space-y-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="inbound"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Avg Inbound (Mbps)"
                />
                <Line
                  type="monotone"
                  dataKey="outbound"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="Avg Outbound (Mbps)"
                />
                <Line
                  type="monotone"
                  dataKey="peak"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="Peak (Mbps)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Weekly Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.5 Mbps</div>
                <p className="text-xs text-muted-foreground">
                  Average bandwidth usage
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Weekly Peak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100 Mbps</div>
                <p className="text-xs text-muted-foreground">
                  Thursday at 2:30 PM
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Transferred</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.72 TB</div>
                <p className="text-xs text-muted-foreground">
                  In the last 7 days
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Traffic by Protocol</CardTitle>
          <CardDescription>
            Distribution of network traffic by protocol
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {protocolData?.map((item) => (
              <div key={item.protocol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.protocol}</p>
                  <p className="text-sm font-medium">
                    {item.percentage ?? 0}% ({item.count})
                  </p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.percentage ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
