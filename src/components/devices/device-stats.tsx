"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const deviceTypeData = [
  { name: "Workstations", value: 10 },
  { name: "Laptops", value: 6 },
  { name: "Servers", value: 3 },
  { name: "Mobile", value: 2 },
  { name: "Other", value: 3 },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
  "#9CA3AF",
];

export function DeviceStats() {
  return (
    <div className="space-y-6">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deviceTypeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {deviceTypeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Resource Usage (Average)</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm">CPU</p>
            <p className="text-sm font-medium">42%</p>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-full w-[42%] rounded-full bg-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm">Memory</p>
            <p className="text-sm font-medium">65%</p>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-full w-[65%] rounded-full bg-secondary" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm">Disk</p>
            <p className="text-sm font-medium">58%</p>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-full w-[58%] rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
