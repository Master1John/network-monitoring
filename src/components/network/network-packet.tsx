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
import { Packet } from "@/types";

interface Props {
  packets: Packet[];
  limit?: number;
}

export function NetwokPackets(props: Props) {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredPackets = packets?.filter((packet) =>
    (packet.protocol ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  useEffect(() => {
    setPackets((pkts) => pkts.concat(props.packets));
  }, [props.packets]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleViewPacket = (packet: Packet) => {
    setSelectedPacket(packet);
    setDialogOpen(true);
  };

  if (packets.length === 0) {
    return <div>No packet data available for this device.</div>;
  }

  return (
    <div>
      {!props.limit && (
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
              {!props.limit && <TableHead className="w-[80px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackets.map((packet, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(packet.timestamp)}
                  </div>
                </TableCell>
                <TableCell>{packet.src.ip}</TableCell>
                <TableCell>{packet.src.ip}</TableCell>
                <TableCell>
                  <Badge variant="outline">{packet.protocol}</Badge>
                </TableCell>
                <TableCell>{formatSize(packet.data?.length ?? 0)}</TableCell>
                {/* <TableCell> */}
                {/*   <Badge */}
                {/*     variant="outline" */}
                {/*     className={ */}
                {/*       packet.direction === "inbound" */}
                {/*         ? "border-green-500 text-green-500" */}
                {/*         : "border-blue-500 text-blue-500" */}
                {/*     } */}
                {/*   > */}
                {/*     <ArrowDownUp className="mr-1 h-3 w-3" /> */}
                {/*     {packet.direction === "inbound" ? "In" : "Out"} */}
                {/*   </Badge> */}
                {/* </TableCell> */}
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
                {!props.limit && (
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
                  <p>{selectedPacket.src.port}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Size
                  </p>
                  <p>{formatSize(selectedPacket.data?.length ?? 0)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  {/* <p className="capitalize">{selectedPacket.status}</p> */}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Connection
                </p>
                <div className="mt-1 flex items-center justify-between rounded-md border p-3">
                  <div className="text-center">
                    <p className="font-medium">{selectedPacket.src.ip}</p>
                    <p className="text-xs text-muted-foreground">Source</p>
                  </div>
                  {/* <ArrowDownUp */}
                  {/*   className={`h-5 w-5 ${selectedPacket.direction === "inbound" ? "rotate-180" : ""}`} */}
                  {/* /> */}
                  <div className="text-center">
                    <p className="font-medium">{selectedPacket.dest.ip}</p>
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
