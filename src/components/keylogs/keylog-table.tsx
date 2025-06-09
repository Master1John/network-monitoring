"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  Flag,
  Download,
  Eye,
  RefreshCcw,
} from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Keylog } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type PaginationInfo = {
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
};

export function KeylogTable() {
  const [keylogs, setKeylogs] = useState<Keylog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedKeylog, setSelectedKeylog] = useState<Keylog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    limit: 100,
    skip: 0,
    hasMore: false,
  });

  const handleviewNKeylog = (keylog: Keylog) => {
    setSelectedKeylog(keylog);
    setDialogOpen(true);
  };

  const fetchKeylogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/keylogs?limit=${pagination.limit}&skip=${pagination.skip}`,
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.keylogs) {
        setKeylogs(data.keylogs);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Failed to fetch keylogs:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch keylogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeylogs();
  }, [pagination.skip, pagination.limit]);

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

  const loadMore = () => {
    if (pagination.hasMore) {
      setPagination((prev) => ({
        ...prev,
        skip: prev.skip + prev.limit,
      }));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            disabled={selectedRows.length === 0 || loading}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={fetchKeylogs}
            disabled={loading}
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSort}
            className="h-8 gap-1"
            disabled={loading}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Sort {sorting === "asc" ? "Newest" : "Oldest"}</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
          <p className="font-medium">Error loading keylogs</p>
          <p>{error}</p>
        </div>
      )}

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
                  disabled={loading || keylogs.length === 0}
                />
              </TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>MAC</TableHead>
              <TableHead>Keys</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : keylogs.length > 0 ? (
              keylogs.map((keylog) => (
                <TableRow key={keylog.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(keylog.id)}
                      onCheckedChange={() => toggleSelectRow(keylog.id)}
                      aria-label={`Select ${keylog.id}`}
                    />
                  </TableCell>
                  <TableCell>{keylog.device}</TableCell>
                  <TableCell>{formatDate(keylog.timestamp)}</TableCell>
                  <TableCell>{keylog.mac}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {keylog.keys.map((value, index) => (
                      <span key={index}>{value.key}</span>
                    ))}
                  </TableCell>
                  {/* <TableCell> */}
                  {/*   {keylog.flagged ? ( */}
                  {/*     <Badge variant="destructive">Flagged</Badge> */}
                  {/*   ) : ( */}
                  {/*     <Badge variant="outline">Normal</Badge> */}
                  {/*   )} */}
                  {/* </TableCell> */}
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
                          onClick={() => handleviewNKeylog(keylog)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem> */}
                        {/*   <Flag className="mr-2 h-4 w-4" /> */}
                        {/*   <span>{keylog.flagged ? "Unflag" : "Flag"}</span> */}
                        {/* </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Export</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No keylog data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>keystroke Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected network packet
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-scroll">
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        keystroke
                      </p>
                      {selectedKeylog.keys.map((value, index: number) => (
                        <Badge key={index}>
                          {value.key + ": " + formatDate(value.timestamp)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {pagination.hasMore && !loading && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}

      {pagination.total > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          Showing {Math.min(keylogs.length, pagination.limit)} of{" "}
          {pagination.total} keylogs
        </div>
      )}
    </div>
  );
}
