import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    title: "Critical: Unauthorized Access Attempt",
    description: "Multiple failed login attempts detected on Server-002",
    severity: "critical",
    time: "15 minutes ago",
  },
  {
    id: 2,
    title: "Warning: High CPU Usage",
    description: "PC-004 is experiencing sustained high CPU usage (95%)",
    severity: "warning",
    time: "32 minutes ago",
  },
  {
    id: 3,
    title: "Info: System Update Available",
    description: "Security updates are available for 3 devices",
    severity: "info",
    time: "2 hours ago",
  },
];

export function AlertsOverview() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={
            alert.severity === "critical"
              ? "destructive"
              : alert.severity === "warning"
                ? "default"
                : "outline"
          }
        >
          {alert.severity === "critical" ? (
            <AlertCircle className="h-4 w-4" />
          ) : alert.severity === "warning" ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <div className="flex w-full items-start justify-between">
            <div>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </div>
            <Badge variant="outline" className="ml-2 shrink-0">
              {alert.time}
            </Badge>
          </div>
        </Alert>
      ))}
    </div>
  );
}
