"use client";

import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, Flag, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Badge } from "@/components/ui/badge";

// Sample data
const keylogs = [
  {
    id: "KL001",
    device: "Workstation-001",
    user: "john.doe",
    timestamp: "2023-04-06T10:30:00",
    type: "Application",
    content: "Microsoft Word - Document1.docx",
    flagged: false,
  },
  {
    id: "KL002",
    device: "Laptop-003",
    user: "jane.smith",
    timestamp: "2023-04-06T10:15:00",
    type: "Browser",
    content: "https://mail.google.com",
    flagged: false,
  },
  {
    id: "KL003",
    device: "Desktop-007",
    user: "robert.johnson",
    timestamp: "2023-04-06T10:00:00",
    type: "System",
    content: "Login",
    flagged: false,
  },
  {
    id: "KL004",
    device: "Laptop-005",
    user: "sarah.williams",
    timestamp: "2023-04-06T09:45:00",
    type: "Browser",
    content: "https://internal.company.com/sensitive",
    flagged: true,
  },
  {
    id: "KL005",
    device: "Workstation-002",
    user: "michael.brown",
    timestamp: "2023-04-06T09:30:00",
    type: "Application",
    content: "Password Manager",
    flagged: true,
  },
];

export function KeylogTable() {
  const [sorting, setSorting] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === keylogs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(keylogs.map((keylog) => keylog.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            disabled={selectedRows.length === 0}
          >
            <Flag className="h-3.5 w-3.5" />
            <span>Flag Selected</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            disabled={selectedRows.length === 0}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSorting(sorting === "asc" ? "desc" : "asc")}
            className="h-8 gap-1"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Sort {sorting === "asc" ? "Newest" : "Oldest"}</span>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRows.length === keylogs.length && keylogs.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Device</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keylogs.map((keylog) => (
              <TableRow key={keylog.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(keylog.id)}
                    onCheckedChange={() => toggleSelectRow(keylog.id)}
                    aria-label={`Select ${keylog.id}`}
                  />
                </TableCell>
                <TableCell>{keylog.device}</TableCell>
                <TableCell>{keylog.user}</TableCell>
                <TableCell>{formatDate(keylog.timestamp)}</TableCell>
                <TableCell>{keylog.type}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {keylog.content}
                </TableCell>
                <TableCell>
                  {keylog.flagged ? (
                    <Badge variant="destructive">Flagged</Badge>
                  ) : (
                    <Badge variant="outline">Normal</Badge>
                  )}
                </TableCell>
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
                      <DropdownMenuItem>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
