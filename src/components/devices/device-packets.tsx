"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownUp,
  ArrowUpDown,
  Clock,
  Download,
  ExternalLink,
  Filter,
  MoreHorizontal,
  Search,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample network packet data by device
const devicePackets = {
  "device-003": [
    {
      id: "PKT001",
      timestamp: "2023-04-06T10:30:05",
      source: "192.168.1.101",
      destination: "172.217.20.142",
      protocol: "HTTPS",
      port: 443,
      size: 1240,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT005",
      timestamp: "2023-04-06T10:29:45",
      source: "172.217.20.142",
      destination: "192.168.1.101",
      protocol: "HTTPS",
      port: 443,
      size: 8750,
      direction: "inbound",
      status: "success",
    },
    {
      id: "PKT009",
      timestamp: "2023-04-06T10:28:30",
      source: "192.168.1.101",
      destination: "192.168.1.1",
      protocol: "DNS",
      port: 53,
      size: 120,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT013",
      timestamp: "2023-04-06T10:27:15",
      source: "192.168.1.101",
      destination: "104.18.23.210",
      protocol: "HTTPS",
      port: 443,
      size: 950,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT017",
      timestamp: "2023-04-06T10:26:00",
      source: "104.18.23.210",
      destination: "192.168.1.101",
      protocol: "HTTPS",
      port: 443,
      size: 12500,
      direction: "inbound",
      status: "success",
    },
    {
      id: "PKT021",
      timestamp: "2023-04-06T10:25:30",
      source: "192.168.1.101",
      destination: "198.51.100.25",
      protocol: "HTTPS",
      port: 443,
      size: 780,
      direction: "outbound",
      status: "blocked",
    },
  ],
  "device-004": [
    {
      id: "PKT002",
      timestamp: "2023-04-06T09:45:10",
      source: "192.168.1.103",
      destination: "198.51.100.25",
      protocol: "HTTPS",
      port: 443,
      size: 1450,
      direction: "outbound",
      status: "blocked",
    },
    {
      id: "PKT006",
      timestamp: "2023-04-06T09:44:30",
      source: "192.168.1.103",
      destination: "192.168.1.1",
      protocol: "DNS",
      port: 53,
      size: 110,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT010",
      timestamp: "2023-04-06T09:43:15",
      source: "192.168.1.103",
      destination: "203.0.113.10",
      protocol: "HTTPS",
      port: 443,
      size: 890,
      direction: "outbound",
      status: "success",
    },
  ],
  "device-006": [
    {
      id: "PKT003",
      timestamp: "2023-04-06T10:40:20",
      source: "192.168.1.10",
      destination: "192.168.1.101",
      protocol: "SSH",
      port: 22,
      size: 3200,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT007",
      timestamp: "2023-04-06T10:39:45",
      source: "192.168.1.10",
      destination: "192.168.1.1",
      protocol: "NTP",
      port: 123,
      size: 76,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT011",
      timestamp: "2023-04-06T10:38:30",
      source: "45.33.32.156",
      destination: "192.168.1.10",
      protocol: "SSH",
      port: 22,
      size: 1280,
      direction: "inbound",
      status: "blocked",
    },
    {
      id: "PKT015",
      timestamp: "2023-04-06T10:37:15",
      source: "192.168.1.10",
      destination: "192.168.1.201",
      protocol: "IPP",
      port: 631,
      size: 4500,
      direction: "outbound",
      status: "success",
    },
  ],
  "device-007": [
    {
      id: "PKT004",
      timestamp: "2023-04-06T10:20:35",
      source: "192.168.1.150",
      destination: "17.57.144.10",
      protocol: "HTTPS",
      port: 443,
      size: 2100,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT008",
      timestamp: "2023-04-06T10:19:50",
      source: "17.57.144.10",
      destination: "192.168.1.150",
      protocol: "HTTPS",
      port: 443,
      size: 15800,
      direction: "inbound",
      status: "success",
    },
    {
      id: "PKT012",
      timestamp: "2023-04-06T10:18:25",
      source: "192.168.1.150",
      destination: "192.168.1.1",
      protocol: "DNS",
      port: 53,
      size: 98,
      direction: "outbound",
      status: "success",
    },
  ],
};

export function DevicePackets({
  deviceId,
  limit,
}: {
  deviceId: string;
  limit?: number;
}) {
  const [packets, setPackets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPacket, setSelectedPacket] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const deviceData =
        devicePackets[deviceId as keyof typeof devicePackets] || [];
      setPackets(limit ? deviceData.slice(0, limit) : deviceData);
      setLoading(false);
    }, 500);
  }, [deviceId, limit]);

  const filteredPackets = packets.filter(
    (packet) =>
      packet.source.includes(searchTerm) ||
      packet.destination.includes(searchTerm) ||
      packet.protocol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleViewPacket = (packet: any) => {
    setSelectedPacket(packet);
    setDialogOpen(true);
  };

  if (loading) {
    return <div>Loading network packets...</div>;
  }

  if (packets.length === 0) {
    return <div>No packet data available for this device.</div>;
  }

  return (
    <div>
      {!limit && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search packets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Timestamp</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Status</TableHead>
              {!limit && <TableHead className="w-[80px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackets.map((packet) => (
              <TableRow key={packet.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(packet.timestamp)}
                  </div>
                </TableCell>
                <TableCell>{packet.source}</TableCell>
                <TableCell>{packet.destination}</TableCell>
                <TableCell>
                  <Badge variant="outline">{packet.protocol}</Badge>
                </TableCell>
                <TableCell>{formatSize(packet.size)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      packet.direction === "inbound"
                        ? "border-green-500 text-green-500"
                        : "border-blue-500 text-blue-500"
                    }
                  >
                    <ArrowDownUp className="mr-1 h-3 w-3" />
                    {packet.direction === "inbound" ? "In" : "Out"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {packet.status === "blocked" ? (
                    <Badge variant="destructive">Blocked</Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-500"
                    >
                      Success
                    </Badge>
                  )}
                </TableCell>
                {!limit && (
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
                          onClick={() => handleViewPacket(packet)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Export</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Packet Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected network packet
            </DialogDescription>
          </DialogHeader>
          {selectedPacket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ID
                  </p>
                  <p>{selectedPacket.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Timestamp
                  </p>
                  <p>{formatDate(selectedPacket.timestamp)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Protocol
                  </p>
                  <p>{selectedPacket.protocol}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Port
                  </p>
                  <p>{selectedPacket.port}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Size
                  </p>
                  <p>{formatSize(selectedPacket.size)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <p className="capitalize">{selectedPacket.status}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Connection
                </p>
                <div className="mt-1 flex items-center justify-between rounded-md border p-3">
                  <div className="text-center">
                    <p className="font-medium">{selectedPacket.source}</p>
                    <p className="text-xs text-muted-foreground">Source</p>
                  </div>
                  <ArrowDownUp
                    className={`h-5 w-5 ${selectedPacket.direction === "inbound" ? "rotate-180" : ""}`}
                  />
                  <div className="text-center">
                    <p className="font-medium">{selectedPacket.destination}</p>
                    <p className="text-xs text-muted-foreground">Destination</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
