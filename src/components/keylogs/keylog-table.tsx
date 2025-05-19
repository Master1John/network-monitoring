"use client";

import { useState, useEffect } from "react";
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

type Keylog = {
  id: string;
  device: string;
  user: string;
  timestamp: string;
  type: string;
  content: string;
  flagged: boolean;
};

export function KeylogTable() {
  const [keylogs, setKeylogs] = useState<Keylog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    async function fetchKeylogs() {
      try {
        const response = await fetch("/api/keylogs");
        const data = await response.json();

        if (data.keylogs) {
          setKeylogs(data.keylogs);
        }
      } catch (error) {
        console.error("Failed to fetch keylogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchKeylogs();
  }, []);

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

  const handleSort = () => {
    const newSorting = sorting === "asc" ? "desc" : "asc";
    setSorting(newSorting);

    // Sort the keylogs based on timestamp
    const sortedKeylogs = [...keylogs].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return newSorting === "asc" ? dateA - dateB : dateB - dateA;
    });

    setKeylogs(sortedKeylogs);
  };

  const handleFlagSelected = async () => {
    // In a real application, you would update the flagged status in the database
    try {
      // Update the UI optimistically
      const updatedKeylogs = keylogs.map((keylog) =>
        selectedRows.includes(keylog.id)
          ? { ...keylog, flagged: true }
          : keylog,
      );
      setKeylogs(updatedKeylogs);

      // Reset selection
      setSelectedRows([]);

      // Here you would make API calls to update the flagged status in the database
      // for each selected keylog
    } catch (error) {
      console.error("Failed to flag keylogs:", error);
    }
  };

  if (loading) {
    return <div>Loading keylog data...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            disabled={selectedRows.length === 0}
            onClick={handleFlagSelected}
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
            onClick={handleSort}
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
            {keylogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No keylog data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
