import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeviceList } from "@/components/devices/device-list";
import { DeviceStats } from "@/components/devices/device-stats";

export default async function DevicesPage() {
  try {
    const response = await fetch("/api/devices", {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Devices</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle>Device List</CardTitle>
            <CardDescription>
              All monitored devices on the network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading devices...</div>}>
              <DeviceList />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Device Statistics</CardTitle>
            <CardDescription>Resource usage across all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading statistics...</div>}>
              <DeviceStats />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
