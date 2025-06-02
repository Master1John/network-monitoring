"use client";
import { DeviceList } from "@/components/devices/device-list";
import { DeviceStats } from "@/components/devices/device-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSocketIO from "@/hooks/useSocketIO";
import { Device, Node } from "@/types";
import { Suspense, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export default function DevicesPage() {
  const [nodes, setNodes] = useState<Array<Device>>([]);

  useEffect(() => {
    const socket = useSocketIO();

    socket
      .join("Admin")
      .here(() => {})
      .listen("Node", (node: Node) => {
        setNodes((nodes) => [...nodes, { ...node, id: node.socketId }]);
      })
      .listen("Nodes", (nodes: Array<Node>) => {
        setNodes(nodes.map((n) => ({ ...n, id: n.socketId })));
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Devices</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 ">
          <CardHeader>
            <CardTitle>Device List</CardTitle>
            <CardDescription>
              All monitored devices on the network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading devices...</div>}>
              <DeviceList devices={nodes} />
            </Suspense>
          </CardContent>
        </Card>
        {/* <Card className="col-span-7 md:col-span-3"> */}
        {/*   <CardHeader> */}
        {/*     <CardTitle>Device Statistics</CardTitle> */}
        {/*     <CardDescription>Resource usage across all devices</CardDescription> */}
        {/*   </CardHeader> */}
        {/*   <CardContent> */}
        {/*     <Suspense fallback={<div>Loading statistics...</div>}> */}
        {/*       <DeviceStats /> */}
        {/*     </Suspense> */}
        {/*   </CardContent> */}
        {/* </Card> */}
      </div>
    </div>
  );
}
