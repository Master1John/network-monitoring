"use client";
import { Suspense, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkStatus } from "@/components/dashboard/network-status";
import { NetworkDevices } from "@/components/network/network-devices";
import { NetworkTopology } from "@/components/network/network-topology";
import { NetworkTraffic } from "@/components/network/network-traffic";
import useSocketIO from "@/hooks/useSocketIO";

export default function NetworkPage() {
	useEffect(() => {
		const socket = useSocketIO();

		socket.join("Admin").listen("NewPackets", (packets: Array<any>) => {
			console.log(packets);
		});

		socket.emit("hello", "world");

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
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="topology">Topology</TabsTrigger>
					<TabsTrigger value="devices">Devices</TabsTrigger>
					<TabsTrigger value="traffic">Traffic</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Network Status</CardTitle>
							<CardDescription>
								Current network topology and status
							</CardDescription>
						</CardHeader>
						<CardContent className="pl-2">
							<Suspense fallback={<div>Loading network status...</div>}>
								<NetworkStatus />
							</Suspense>
						</CardContent>
					</Card>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Network Health</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">98.5%</div>
								<p className="text-xs text-muted-foreground">
									Uptime in the last 30 days
								</p>
								<div className="mt-4 h-4 w-full rounded-full bg-muted">
									<div className="h-full w-[98.5%] rounded-full bg-green-500" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Bandwidth Usage</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">45.8 Mbps</div>
								<p className="text-xs text-muted-foreground">
									Current network throughput
								</p>
								<div className="mt-4 h-4 w-full rounded-full bg-muted">
									<div className="h-full w-[45%] rounded-full bg-blue-500" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Active Connections</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">124</div>
								<p className="text-xs text-muted-foreground">
									Across 18 devices
								</p>
								<div className="mt-4 space-y-2">
									<div className="flex items-center">
										<span className="text-xs text-muted-foreground w-24">
											HTTP/HTTPS
										</span>
										<div className="h-2 flex-1 rounded-full bg-muted">
											<div className="h-full w-[65%] rounded-full bg-primary" />
										</div>
										<span className="text-xs font-medium ml-2">65%</span>
									</div>
									<div className="flex items-center">
										<span className="text-xs text-muted-foreground w-24">
											SSH/SFTP
										</span>
										<div className="h-2 flex-1 rounded-full bg-muted">
											<div className="h-full w-[15%] rounded-full bg-primary" />
										</div>
										<span className="text-xs font-medium ml-2">15%</span>
									</div>
									<div className="flex items-center">
										<span className="text-xs text-muted-foreground w-24">
											Other
										</span>
										<div className="h-2 flex-1 rounded-full bg-muted">
											<div className="h-full w-[20%] rounded-full bg-primary" />
										</div>
										<span className="text-xs font-medium ml-2">20%</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value="topology" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Network Topology</CardTitle>
							<CardDescription>
								Visual representation of your network
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense fallback={<div>Loading network topology...</div>}>
								<NetworkTopology />
							</Suspense>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="devices" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Network Devices</CardTitle>
							<CardDescription>All devices on your network</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense fallback={<div>Loading devices...</div>}>
								<NetworkDevices />
							</Suspense>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="traffic" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Network Traffic</CardTitle>
							<CardDescription>
								Bandwidth usage and traffic patterns
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense fallback={<div>Loading traffic data...</div>}>
								<NetworkTraffic />
							</Suspense>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
