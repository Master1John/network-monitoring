import { Activity, AlertTriangle, Clock, Laptop } from "lucide-react";

export function RecentActivity({ activities }) {
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
