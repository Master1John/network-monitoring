"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  Laptop,
  MoreHorizontal,
  Server,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample user devices data
const userDevicesData = {
  "user-001": [
    {
      id: "device-003",
      name: "Workstation-001",
      type: "workstation",
      ipAddress: "192.168.1.101",
      status: "online",
      lastSeen: "2023-04-06T10:43:00",
    },
    {
      id: "device-006",
      name: "Server-Main",
      type: "server",
      ipAddress: "192.168.1.10",
      status: "online",
      lastSeen: "2023-04-06T10:42:00",
    },
  ],
  "user-002": [
    {
      id: "device-007",
      name: "Mobile-CEO",
      type: "mobile",
      ipAddress: "192.168.1.150",
      status: "online",
      lastSeen: "2023-04-06T10:30:00",
    },
  ],
  "user-003": [
    {
      id: "device-001",
      name: "Router-Main",
      type: "router",
      ipAddress: "192.168.1.1",
      status: "online",
      lastSeen: "2023-04-06T10:45:00",
    },
    {
      id: "device-002",
      name: "Switch-Floor1",
      type: "switch",
      ipAddress: "192.168.1.2",
      status: "online",
      lastSeen: "2023-04-06T10:44:00",
    },
    {
      id: "device-005",
      name: "Printer-Office",
      type: "printer",
      ipAddress: "192.168.1.201",
      status: "online",
      lastSeen: "2023-04-06T10:40:00",
    },
  ],
  "user-008": [
    {
      id: "device-004",
      name: "Laptop-003",
      type: "laptop",
      ipAddress: "192.168.1.103",
      status: "offline",
      lastSeen: "2023-04-06T09:15:00",
    },
  ],
  "user-012": [
    {
      id: "device-008",
      name: "Security-Laptop",
      type: "laptop",
      ipAddress: "192.168.1.155",
      status: "online",
      lastSeen: "2023-04-06T10:35:00",
    },
    {
      id: "device-009",
      name: "Security-Mobile",
      type: "mobile",
      ipAddress: "192.168.1.156",
      status: "online",
      lastSeen: "2023-04-06T10:25:00",
    },
  ],
};

export function UserDevices({
  userId,
  limit,
}: {
  userId: string;
  limit?: number;
}) {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const userDevices =
        userDevicesData[userId as keyof typeof userDevicesData] || [];
      setDevices(limit ? userDevices.slice(0, limit) : userDevices);
      setLoading(false);
    }, 500);
  }, [userId, limit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "server":
        return <Server className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Laptop className="h-4 w-4" />;
    }
  };

  const handleViewDevice = (deviceId: string) => {
    router.push(`/dashboard/devices/${deviceId}`);
  };

  if (loading) {
    return <div>Loading devices...</div>;
  }

  if (devices.length === 0) {
    return <div>No devices associated with this user.</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center space-x-1">
                <span>Device</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getDeviceIcon(device.type)}
                  <span>{device.name}</span>
                </div>
              </TableCell>
              <TableCell className="capitalize">{device.type}</TableCell>
              <TableCell>{device.ipAddress}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>{formatDate(device.lastSeen)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => handleViewDevice(device.id)}
                    >
                      View Device
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Unassign from User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
