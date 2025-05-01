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

// Mock device data - in a real app, this would come from an API
const deviceData = {
  "device-001": {
    id: "device-001",
    name: "Router-Main",
    type: "router",
    ipAddress: "192.168.1.1",
    macAddress: "00:1A:2B:3C:4D:5E",
    status: "online",
    lastSeen: "2023-04-06T10:45:00",
    os: "RouterOS 6.48.3",
    manufacturer: "MikroTik",
    model: "RB4011iGS+",
    installedDate: "2022-01-15",
    metrics: {
      cpu: 15,
      memory: 30,
      disk: 45,
    },
  },
  "device-003": {
    id: "device-003",
    name: "Workstation-001",
    type: "workstation",
    ipAddress: "192.168.1.101",
    macAddress: "00:3C:4D:5E:6F:7G",
    status: "online",
    lastSeen: "2023-04-06T10:43:00",
    os: "Windows 11 Pro",
    manufacturer: "Dell",
    model: "OptiPlex 7090",
    installedDate: "2022-03-10",
    metrics: {
      cpu: 42,
      memory: 65,
      disk: 58,
    },
  },
  "device-004": {
    id: "device-004",
    name: "Laptop-003",
    type: "laptop",
    ipAddress: "192.168.1.103",
    macAddress: "00:4D:5E:6F:7G:8H",
    status: "offline",
    lastSeen: "2023-04-06T09:15:00",
    os: "macOS Monterey",
    manufacturer: "Apple",
    model: "MacBook Pro 16-inch",
    installedDate: "2021-11-05",
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 72,
    },
  },
  "device-006": {
    id: "device-006",
    name: "Server-Main",
    type: "server",
    ipAddress: "192.168.1.10",
    macAddress: "00:6F:7G:8H:9I:0J",
    status: "online",
    lastSeen: "2023-04-06T10:42:00",
    os: "Ubuntu Server 22.04 LTS",
    manufacturer: "HP",
    model: "ProLiant DL380 Gen10",
    installedDate: "2022-02-20",
    metrics: {
      cpu: 78,
      memory: 85,
      disk: 62,
    },
    hasAlerts: true,
  },
  "device-007": {
    id: "device-007",
    name: "Mobile-CEO",
    type: "mobile",
    ipAddress: "192.168.1.150",
    macAddress: "00:7G:8H:9I:0J:1K",
    status: "online",
    lastSeen: "2023-04-06T10:30:00",
    os: "iOS 16.2",
    manufacturer: "Apple",
    model: "iPhone 14 Pro",
    installedDate: "2022-09-25",
    metrics: {
      cpu: 35,
      memory: 48,
      disk: 75,
    },
    hasAlerts: true,
  },
};

export function DeviceInfo({ deviceId }: { deviceId: string }) {
  const [device, setDevice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDevice(deviceData[deviceId as keyof typeof deviceData] || null);
      setLoading(false);
    }, 500);
  }, [deviceId]);

  if (loading) {
    return <div>Loading device information...</div>;
  }

  if (!device) {
    return <div>Device not found</div>;
  }

  const formatDate = (dateString: string) => {
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
                {device.hasAlerts && (
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
              <p className="font-medium">{device.os}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Manufacturer</p>
              <p className="font-medium">{device.manufacturer}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-medium">{device.model}</p>
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
                    className={`h-full rounded-full ${device.metrics.cpu > 80 ? "bg-destructive" : "bg-primary"}`}
                    style={{ width: `${device.metrics.cpu}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {device.metrics.cpu}%
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
                    className={`h-full rounded-full ${device.metrics.memory > 80 ? "bg-destructive" : "bg-secondary"}`}
                    style={{ width: `${device.metrics.memory}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {device.metrics.memory}%
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
                    className={`h-full rounded-full ${device.metrics.disk > 80 ? "bg-destructive" : "bg-accent"}`}
                    style={{ width: `${device.metrics.disk}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {device.metrics.disk}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
