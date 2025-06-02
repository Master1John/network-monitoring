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

export function Overview({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          Network traffic and keylog for the past week
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
              dataKey="Packets"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
            <Bar
              dataKey="Keylog"
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
