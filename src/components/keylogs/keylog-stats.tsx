"use client";

import {
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

const data = [
  {
    date: "Mon",
    System: 40,
    Browser: 24,
    Application: 35,
  },
  {
    date: "Tue",
    System: 30,
    Browser: 13,
    Application: 45,
  },
  {
    date: "Wed",
    System: 20,
    Browser: 98,
    Application: 35,
  },
  {
    date: "Thu",
    System: 27,
    Browser: 39,
    Application: 50,
  },
  {
    date: "Fri",
    System: 18,
    Browser: 48,
    Application: 30,
  },
  {
    date: "Sat",
    System: 23,
    Browser: 38,
    Application: 27,
  },
  {
    date: "Sun",
    System: 34,
    Browser: 43,
    Application: 15,
  },
];

export function KeylogStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Keylog Events by Type</CardTitle>
          <CardDescription>
            Distribution of keylog events by type over the past week
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="System"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Browser"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Application"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Keylog Activity Summary</CardTitle>
          <CardDescription>
            Summary of keylog activity across all monitored devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Events
                </p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Flagged Events
                </p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Devices
                </p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Users
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">System Events</p>
                <p className="text-sm font-medium">25%</p>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[25%] rounded-full bg-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Browser Events</p>
                <p className="text-sm font-medium">40%</p>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[40%] rounded-full bg-secondary" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Application Events</p>
                <p className="text-sm font-medium">35%</p>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[35%] rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
