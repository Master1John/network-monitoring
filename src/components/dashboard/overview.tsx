"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
    name: "Mon",
    "Network Traffic": 4000,
    "Keylog Events": 2400,
  },
  {
    name: "Tue",
    "Network Traffic": 3000,
    "Keylog Events": 1398,
  },
  {
    name: "Wed",
    "Network Traffic": 2000,
    "Keylog Events": 9800,
  },
  {
    name: "Thu",
    "Network Traffic": 2780,
    "Keylog Events": 3908,
  },
  {
    name: "Fri",
    "Network Traffic": 1890,
    "Keylog Events": 4800,
  },
  {
    name: "Sat",
    "Network Traffic": 2390,
    "Keylog Events": 3800,
  },
  {
    name: "Sun",
    "Network Traffic": 3490,
    "Keylog Events": 4300,
  },
];

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          Network traffic and keylog events for the past week
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <Bar
              dataKey="Network Traffic"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
            <Bar
              dataKey="Keylog Events"
              fill="hsl(var(--secondary))"
              radius={[4, 4, 0, 0]}
              className="fill-secondary"
            />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
