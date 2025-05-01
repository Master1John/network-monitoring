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

// Sample keylog data by device
const deviceKeylogs = {
  "device-003": [
    {
      id: "KL001",
      timestamp: "2023-04-06T10:30:00",
      type: "Application",
      content: "Microsoft Word - Document1.docx",
      flagged: false,
    },
    {
      id: "KL005",
      timestamp: "2023-04-06T10:25:00",
      type: "Browser",
      content: "https://mail.google.com",
      flagged: false,
    },
    {
      id: "KL009",
      timestamp: "2023-04-06T10:20:00",
      type: "System",
      content: "Login",
      flagged: false,
    },
    {
      id: "KL013",
      timestamp: "2023-04-06T10:15:00",
      type: "Application",
      content: "Microsoft Excel - Budget2023.xlsx",
      flagged: false,
    },
    {
      id: "KL017",
      timestamp: "2023-04-06T10:10:00",
      type: "Browser",
      content: "https://internal.company.com/reports",
      flagged: false,
    },
    {
      id: "KL021",
      timestamp: "2023-04-06T10:05:00",
      type: "Application",
      content: "Password Manager",
      flagged: true,
    },
    {
      id: "KL025",
      timestamp: "2023-04-06T10:00:00",
      type: "System",
      content: "Startup",
      flagged: false,
    },
  ],
  "device-004": [
    {
      id: "KL002",
      timestamp: "2023-04-06T09:45:00",
      type: "Browser",
      content: "https://internal.company.com/sensitive",
      flagged: true,
    },
    {
      id: "KL006",
      timestamp: "2023-04-06T09:40:00",
      type: "Application",
      content: "Adobe Photoshop",
      flagged: false,
    },
    {
      id: "KL010",
      timestamp: "2023-04-06T09:35:00",
      type: "System",
      content: "Login",
      flagged: false,
    },
  ],
  "device-006": [
    {
      id: "KL003",
      timestamp: "2023-04-06T10:40:00",
      type: "System",
      content: "Database backup",
      flagged: false,
    },
    {
      id: "KL007",
      timestamp: "2023-04-06T10:35:00",
      type: "Application",
      content: "MySQL Workbench",
      flagged: false,
    },
    {
      id: "KL011",
      timestamp: "2023-04-06T10:30:00",
      type: "System",
      content: "Service restart: nginx",
      flagged: false,
    },
    {
      id: "KL015",
      timestamp: "2023-04-06T10:25:00",
      type: "System",
      content: "Failed login attempt: root",
      flagged: true,
    },
    {
      id: "KL019",
      timestamp: "2023-04-06T10:20:00",
      type: "System",
      content: "Failed login attempt: admin",
      flagged: true,
    },
    {
      id: "KL023",
      timestamp: "2023-04-06T10:15:00",
      type: "System",
      content: "Failed login attempt: administrator",
      flagged: true,
    },
  ],
  "device-007": [
    {
      id: "KL004",
      timestamp: "2023-04-06T10:20:00",
      type: "Application",
      content: "Email - Confidential Report",
      flagged: true,
    },
    {
      id: "KL008",
      timestamp: "2023-04-06T10:15:00",
      type: "Browser",
      content: "https://finance.company.com/reports",
      flagged: false,
    },
    {
      id: "KL012",
      timestamp: "2023-04-06T10:10:00",
      type: "Application",
      content: "Messages - SMS to +1234567890",
      flagged: false,
    },
  ],
};

export function DeviceKeylogs({
  deviceId,
  limit,
}: {
  deviceId: string;
  limit?: number;
}) {
  const [keylogs, setKeylogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeylog, setSelectedKeylog] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const logs = deviceKeylogs[deviceId as keyof typeof deviceKeylogs] || [];
      setKeylogs(limit ? logs.slice(0, limit) : logs);
      setLoading(false);
    }, 500);
  }, [deviceId, limit]);

  const filteredKeylogs = keylogs.filter(
    (keylog) =>
      keylog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      keylog.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const handleViewKeylog = (keylog: any) => {
    setSelectedKeylog(keylog);
    setDialogOpen(true);
  };

  if (loading) {
    return <div>Loading keylogs...</div>;
  }

  if (keylogs.length === 0) {
    return <div>No keylog data available for this device.</div>;
  }

  return (
    <div>
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
                        <DropdownMenuItem>
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
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ID
                  </p>
                  <p>{selectedKeylog.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Timestamp
                  </p>
                  <p>{formatDate(selectedKeylog.timestamp)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Type
                  </p>
                  <p>{selectedKeylog.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <p>{selectedKeylog.flagged ? "Flagged" : "Normal"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Content
                </p>
                <div className="mt-1 rounded-md border p-3">
                  <p className="break-all">{selectedKeylog.content}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  variant="destructive"
                  disabled={!selectedKeylog.flagged}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  {selectedKeylog.flagged ? "Unflag" : "Flag"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
