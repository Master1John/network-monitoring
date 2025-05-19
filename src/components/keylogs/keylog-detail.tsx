"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Tag,
  FileText,
  Eye,
  RefreshCw,
} from "lucide-react";

interface Keylog {
  id: string;
  device: string;
  deviceId: string;
  timestamp: string;
  type: string;
  content: string;
  flagged: boolean;
}

export function KeylogTable() {
  const router = useRouter();
  const [keylogs, setKeylogs] = useState<Keylog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 10;

  const fetchKeylogs = async (pageNum: number, replace = false) => {
    try {
      setLoading(pageNum === 1);
      setRefreshing(pageNum === 1 && !replace);
      setError(null);

      const response = await fetch(
        `/api/keylogs?page=${pageNum}&limit=${limit}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch keylogs");
      }

      if (replace || pageNum === 1) {
        setKeylogs(data.keylogs);
      } else {
        setKeylogs((prev) => [...prev, ...data.keylogs]);
      }

      setHasMore(data.keylogs.length === limit);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchKeylogs(1, true);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchKeylogs(nextPage);
  };

  const handleRefresh = () => {
    setPage(1);
    fetchKeylogs(1, true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const truncateContent = (content: string, maxLength = 50) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "application":
        return <Tag className="h-4 w-4" />;
      case "browser":
        return <Monitor className="h-4 w-4" />;
      case "system":
        return <FileText className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "application":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "browser":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "system":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/keylogs/${id}`);
  };

  if (loading && page === 1) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <div className="flex items-center space-x-2 text-red-700 dark:text-red-300">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="font-medium">Error loading keylogs</h3>
        </div>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={handleRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Keylogs</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {keylogs.length === 0 ? (
        <div className="rounded-md border border-dashed p-8 text-center">
          <h3 className="font-medium">No keylogs found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            There are no keylogs recorded in the system yet.
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keylogs.map((keylog) => (
                <TableRow key={keylog.id}>
                  <TableCell className="font-medium">{keylog.device}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(keylog.type)}`}
                    >
                      {getTypeIcon(keylog.type)}
                      <span className="ml-1">{keylog.type}</span>
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {truncateContent(keylog.content)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      {formatDate(keylog.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {keylog.flagged ? (
                      <Badge
                        variant="destructive"
                        className="flex items-center w-fit"
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Flagged
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="flex items-center w-fit"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Normal
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(keylog.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
