import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeylogTable } from "@/components/keylogs/keylog-table";
import { KeylogStats } from "@/components/keylogs/keylog-stats";

export default function KeylogsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Keylogs</h2>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Devices</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keylog Data</CardTitle>
              <CardDescription>
                Keylog data collected from monitored devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading keylog data...</div>}>
                <KeylogTable />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keylog Analytics</CardTitle>
              <CardDescription>
                Analytics and insights from keylog data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading analytics...</div>}>
                <KeylogStats />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
