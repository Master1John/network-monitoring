import { Activity, AlertTriangle, Clock, Laptop } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "keylog",
    device: "Workstation-001",
    timestamp: "2 minutes ago",
    description: "Keylog data received",
    icon: Activity,
  },
  {
    id: 2,
    type: "alert",
    device: "Laptop-003",
    timestamp: "15 minutes ago",
    description: "Unusual network activity detected",
    icon: AlertTriangle,
    severity: "critical",
  },
  {
    id: 3,
    type: "device",
    device: "Desktop-007",
    timestamp: "32 minutes ago",
    description: "Device went offline",
    icon: Laptop,
  },
  {
    id: 4,
    type: "alert",
    device: "Server-002",
    timestamp: "1 hour ago",
    description: "High CPU usage",
    icon: AlertTriangle,
    severity: "warning",
  },
  {
    id: 5,
    type: "keylog",
    device: "Laptop-005",
    timestamp: "1 hour ago",
    description: "Keylog data received",
    icon: Activity,
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="mr-4 mt-0.5">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                activity.type === "alert" && activity.severity === "critical"
                  ? "bg-destructive/20 text-destructive"
                  : activity.type === "alert" && activity.severity === "warning"
                    ? "bg-warning/20 text-warning"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              <activity.icon className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.device}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <p className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
