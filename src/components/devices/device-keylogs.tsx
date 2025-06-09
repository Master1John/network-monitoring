"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  Clock,
  Download,
  Eye,
  Flag,
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

interface Keylog {
  id: string;
  type: string;
  content: string;
  flagged: boolean;
  timestamp: string;
  deviceId: string;
}

interface KeylogStats {
  total: number;
  flagged: number;
  byType: Record<string, number>;
}

interface KeylogResponse {
  keylogs: Keylog[];
  stats: KeylogStats;
}

export function DeviceKeylogs({ device }: { device: Device }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeylog, setSelectedKeylog] = useState<Keylog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewKeylog = (keylog: Keylog) => {
    setSelectedKeylog(keylog);
    setDialogOpen(true);
  };

  return (
    <div>
      {!limit && stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground">Total Keylogs</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground">Flagged</p>
            <p className="text-2xl font-bold text-destructive">
              {stats.flagged}
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground">Application Logs</p>
            <p className="text-2xl font-bold">
              {stats.byType["Application"] || 0}
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground">System Logs</p>
            <p className="text-2xl font-bold">{stats.byType["System"] || 0}</p>
          </div>
        </div>
      )}

      {!limit && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search keylogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Flag className="h-3.5 w-3.5" />
              <span>Flag Selected</span>
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
              <TableHead>Type</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              {!limit && <TableHead className="w-[80px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKeylogs.map((keylog) => (
              <TableRow key={keylog.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(keylog.timestamp)}
                  </div>
                </TableCell>
                <TableCell>{keylog.type}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {keylog.content}
                </TableCell>
                <TableCell>
                  {keylog.flagged ? (
                    <Badge variant="destructive">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Flagged
                    </Badge>
                  ) : (
                    <Badge variant="outline">Normal</Badge>
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
                          onClick={() => handleViewKeylog(keylog)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleFlagKeylog(keylog)}
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          <span>{keylog.flagged ? "Unflag" : "Flag"}</span>
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
            <DialogTitle>Keylog Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected keylog entry
            </DialogDescription>
          </DialogHeader>
          {selectedKeylog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Additional details for the selected keylog can be added here */}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
