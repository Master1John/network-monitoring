"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Cpu,
  HardDrive,
  Laptop,
  MemoryStickIcon as Memory,
  Server,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface DeviceMetrics {
  cpu: number;
  memory: number;
  disk: number;
  battery?: number;
}

interface Device {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  lastSeen: string;
  os: string | null;
  manufacturer: string | null;
  model: string | null;
  installedDate: string | null;
  metrics: DeviceMetrics;
  userId: string | null;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export function DeviceInfo({ deviceId }: { deviceId: string }) {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/devices/${deviceId}`);
        if (!response.ok) {
          throw new Error(`Error fetching device: ${response.statusText}`);
        }
        const data = await response.json();
        setDevice(data.device);
      } catch (err) {
        console.error("Failed to fetch device:", err);
        setError("Failed to load device information. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [deviceId]);

  if (loading) {
    return <div>Loading device information...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!device) {
    return <div>Device not found</div>;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "server":
        return <Server className="h-5 w-5" />;
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "laptop":
        return <Laptop className="h-5 w-5" />;
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-muted p-3">
              {getDeviceIcon(device.type)}
            </div>
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                {device.name}
                {device.metrics && device.metrics.cpu > 80 && (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                )}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="capitalize">{device.type}</span>
                {device.status === "online" ? (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Wifi className="mr-1 h-3 w-3" />
                    Online
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <WifiOff className="mr-1 h-3 w-3" />
                    Offline
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">IP Address</p>
              <p className="font-medium">{device.ipAddress}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">MAC Address</p>
              <p className="font-medium">{device.macAddress}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last Seen</p>
              <p className="font-medium">{formatDate(device.lastSeen)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Operating System</p>
              <p className="font-medium">{device.os || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Manufacturer</p>
              <p className="font-medium">{device.manufacturer || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-medium">{device.model || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-muted p-2">
              <Cpu className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">CPU Usage</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      device.metrics && device.metrics.cpu > 80
                        ? "bg-destructive"
                        : "bg-primary"
                    }`}
                    style={{
                      width: `${device.metrics ? device.metrics.cpu : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {device.metrics ? device.metrics.cpu : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-full bg-muted p-2">
              <Memory className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Memory Usage</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      device.metrics && device.metrics.memory > 80
                        ? "bg-destructive"
                        : "bg-secondary"
                    }`}
                    style={{
                      width: `${device.metrics ? device.metrics.memory : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {device.metrics ? device.metrics.memory : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-full bg-muted p-2">
              <HardDrive className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Disk Usage</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      device.metrics && device.metrics.disk > 80
                        ? "bg-destructive"
                        : "bg-accent"
                    }`}
                    style={{
                      width: `${device.metrics ? device.metrics.disk : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {device.metrics ? device.metrics.disk : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
