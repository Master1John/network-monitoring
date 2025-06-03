import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const ROLE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--secondary))",
];
const STATUS_COLORS = [
  "hsl(142, 76%, 36%)",
  "hsl(45, 93%, 47%)",
  "hsl(var(--destructive))",
];

export function UserStats({ stats }) {
  const roleData = [
    { name: "Admin", value: stats?.admin },
    { name: "Security", value: 1 },
    { name: "User", value: stats?.total },
  ];

  const statusData = [
    { name: "Active", value: stats?.active },
    { name: "Inactive", value: stats?.total - stats?.active },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-medium">User Roles</h4>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
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
                {roleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={ROLE_COLORS[index % ROLE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium">User Status</h4>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
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
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm">Average devices per user</p>
              <p className="text-sm font-medium">1.5</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Users with multiple devices</p>
              <p className="text-sm font-medium">4</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Users active today</p>
              <p className="text-sm font-medium">7</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">New users this month</p>
              <p className="text-sm font-medium">1</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
