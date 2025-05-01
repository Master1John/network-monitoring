"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  RefreshCw,
  Settings,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Sample data
const devices = [
  {
    id: "device-001",
    name: "Router-Main",
    type: "Router",
    ipAddress: "192.168.1.1",
    macAddress: "00:1A:2B:3C:4D:5E",
    status: "online",
    lastSeen: "2023-04-06T10:45:00",
  },
  {
    id: "device-002",
    name: "Switch-Floor1",
    type: "Switch",
    ipAddress: "192.168.1.2",
    macAddress: "00:2B:3C:4D:5E:6F",
    status: "online",
    lastSeen: "2023-04-06T10:44:00",
  },
  {
    id: "device-003",
    name: "Workstation-001",
    type: "Workstation",
    ipAddress: "192.168.1.101",
    macAddress: "00:3C:4D:5E:6F:7G",
    status: "online",
    lastSeen: "2023-04-06T10:43:00",
  },
  {
    id: "device-004",
    name: "Laptop-003",
    type: "Laptop",
    ipAddress: "192.168.1.103",
    macAddress: "00:4D:5E:6F:7G:8H",
    status: "offline",
    lastSeen: "2023-04-06T09:15:00",
  },
  {
    id: "device-005",
    name: "Printer-Office",
    type: "Printer",
    ipAddress: "192.168.1.201",
    macAddress: "00:5E:6F:7G:8H:9I",
    status: "online",
    lastSeen: "2023-04-06T10:40:00",
  },
];

export function NetworkDevices() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress.includes(searchTerm) ||
      device.macAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
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
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">{device.name}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell>{device.ipAddress}</TableCell>
                <TableCell>{device.macAddress}</TableCell>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Monitor Device</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
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
