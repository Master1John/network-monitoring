"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowUpDown,
  Eye,
  Laptop,
  MoreHorizontal,
  RefreshCw,
  Server,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Sample data
const devices = [
  {
    id: "device-001",
    name: "Router-Main",
    type: "router",
    ipAddress: "192.168.1.1",
    macAddress: "00:1A:2B:3C:4D:5E",
    status: "online",
    lastSeen: "2023-04-06T10:45:00",
    hasAlerts: false,
  },
  {
    id: "device-002",
    name: "Switch-Floor1",
    type: "switch",
    ipAddress: "192.168.1.2",
    macAddress: "00:2B:3C:4D:5E:6F",
    status: "online",
    lastSeen: "2023-04-06T10:44:00",
    hasAlerts: false,
  },
  {
    id: "device-003",
    name: "Workstation-001",
    type: "workstation",
    ipAddress: "192.168.1.101",
    macAddress: "00:3C:4D:5E:6F:7G",
    status: "online",
    lastSeen: "2023-04-06T10:43:00",
    hasAlerts: false,
  },
  {
    id: "device-004",
    name: "Laptop-003",
    type: "laptop",
    ipAddress: "192.168.1.103",
    macAddress: "00:4D:5E:6F:7G:8H",
    status: "offline",
    lastSeen: "2023-04-06T09:15:00",
    hasAlerts: false,
  },
  {
    id: "device-005",
    name: "Printer-Office",
    type: "printer",
    ipAddress: "192.168.1.201",
    macAddress: "00:5E:6F:7G:8H:9I",
    status: "online",
    lastSeen: "2023-04-06T10:40:00",
    hasAlerts: false,
  },
  {
    id: "device-006",
    name: "Server-Main",
    type: "server",
    ipAddress: "192.168.1.10",
    macAddress: "00:6F:7G:8H:9I:0J",
    status: "online",
    lastSeen: "2023-04-06T10:42:00",
    hasAlerts: true,
  },
  {
    id: "device-007",
    name: "Mobile-CEO",
    type: "mobile",
    ipAddress: "192.168.1.150",
    macAddress: "00:7G:8H:9I:0J:1K",
    status: "online",
    lastSeen: "2023-04-06T10:30:00",
    hasAlerts: true,
  },
];

export function DeviceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress.includes(searchTerm) ||
      device.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search devices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="sm" className="ml-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Name</span>
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
            {filteredDevices.map((device) => (
              <TableRow
                key={device.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewDevice(device.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    {getDeviceIcon(device.type)}
                    <span>{device.name}</span>
                    {device.hasAlerts && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
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
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDevice(device.id);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <span>Configure</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
