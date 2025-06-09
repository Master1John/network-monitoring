"use client";
import { DeviceList } from "@/components/devices/device-list";
import { NetwokPackets } from "@/components/network/network-packet";
import { NetworkTraffic } from "@/components/network/network-traffic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSocketIO from "@/hooks/useSocketIO";
import { Device, Packet } from "@/types";
import { Suspense, useEffect, useState } from "react";

export default function NetworkPage() {
  const [nodes, setNodes] = useState<Array<Device>>([]);
  const [data, setData] = useState<any>(null);
  const [packets, setPackets] = useState<Array<Packet>>([]);
  const [remotePackets, setRemotePackets] = useState<Array<Packet>>([]);

  const fetchNetwork = async () => {
    const response = await fetch("/api/network");

    const data = (await response.json()) as { packets: Array<Packet> };

    setData(data);
    setPackets([...data.packets, ...packets]);
  };

  useEffect(() => {
    const socket = useSocketIO();
    fetchNetwork().finally(() => {
      socket.join("Admin").listen("NewPackets", (newPackets: Array<Packet>) => {
        const pcts = packets.concat(newPackets);
        setPackets(pcts);
      });

      // handle devices
      socket
        .join("Admin")
        .here(() => {})
        .listen("Node", (node: Node) => {
          setNodes((nodes) => [...nodes, { ...node, id: node.socketId }]);
        })
        .listen("Nodes", (nodes: Array<Node>) => {
          setNodes(nodes.map((n) => ({ ...n, id: n.socketId })));
        });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Network Monitoring
        </h2>
      </div>
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          {/* <TabsTrigger value="topology">Topology</TabsTrigger> */}
        </TabsList>
        {/* <TabsContent value="topology" className="space-y-4"> */}
        {/*   <Card> */}
        {/*     <CardHeader> */}
        {/*       <CardTitle>Network Topology</CardTitle> */}
        {/*       <CardDescription> */}
        {/*         Visual representation of your network */}
        {/*       </CardDescription> */}
        {/*     </CardHeader> */}
        {/*     <CardContent> */}
        {/*       <Suspense fallback={<div>Loading network topology...</div>}> */}
        {/*         <NetworkTopology /> */}
        {/*       </Suspense> */}
        {/*     </CardContent> */}
        {/*   </Card> */}
        {/* </TabsContent> */}
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Devices</CardTitle>
              <CardDescription>All devices on your network</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading devices...</div>}>
                <DeviceList devices={nodes} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Packets</CardTitle>
              <CardDescription>
                Detailed network packet analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NetwokPackets packets={packets} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Network Traffic</CardTitle>
              <CardDescription>
                Bandwidth usage and traffic patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading traffic data...</div>}>
                <NetworkTraffic protocolData={data?.percentageDistribution} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
