"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useApi from "@/hooks/useApi";
import { Device, DeviceStats } from "@/types";
import {
	AlertTriangle,
	ArrowUpDown,
	Eye,
	Laptop,
	MoreHorizontal,
	RefreshCw,
	Server,
	Smartphone,
	Wifi,
	WifiOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// interface Devicer {
// 	id: string;
// 	name: string;
// 	type: string;
// 	ipAddress: string;
// 	macAddress: string;
// 	status: string;
// 	lastSeen: string;
// 	metrics: {
// 		cpu: number;
// 		memory: number;
// 		disk: number;
// 	};
// 	user?: {
// 		id: string;
// 		name: string;
// 		email: string;
// 	};
// }

// interface DeviceResponse {
// 	devices: Device[];
// 	stats: DeviceStats;
// }

interface Props {
	devices: Array<Device>;
}
export function DeviceList(props: Props) {
	const [devices, setDevices] = useState<Device[]>([]);
	const [remoteDevices, setRemoteDevices] = useState<Device[]>([]);
	const [stats, setStats] = useState<DeviceStats | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const api = useApi();

	useEffect(() => {
		if (props.devices.length == 0) {
			setDevices((devices) => devices.map((d) => ({ ...d, online: false })));
		}
		if (remoteDevices.length == 0) {
			setDevices((devices) =>
				devices.length
					? devices
					: props.devices.map((d) => ({ ...d, online: true })),
			);
			return;
		}

		setDevices((devices) => {
			devices = remoteDevices.map((d) => ({ ...d, online: false }));

			for (const node of props.devices) {
				const index = devices.findIndex((d) => d.mac === node.mac);

				if (index >= 0) {
					devices[index].online = true;
				} else {
					const newDevice = { ...node, id: node.socketId };

					// TODO: Remove ID from new device before adding
					api.addDevice(newDevice);

					devices.push(node);
				}
			}

			return devices;
		});
	}, [remoteDevices, props.devices]);

	const fetchDevices = async () => {
		setLoading(true);
		setError(null);
		const response = await api.getDevices(searchTerm);
		setLoading(false);

		setRemoteDevices(response.devices ?? []);
		setStats(response.stats ?? {});
	};

	useEffect(() => {
		fetchDevices();
	}, []);

	const handleSearch = () => {
		fetchDevices();
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			dateStyle: "short",
			timeStyle: "short",
		}).format(date);
	};

	const getDeviceIcon = (type: string) => {
		switch (type) {
			case "server":
				return <Server className="h-4 w-4" />;
			case "mobile":
				return <Smartphone className="h-4 w-4" />;
			default:
				return <Laptop className="h-4 w-4" />;
		}
	};

	const handleViewDevice = (deviceId: string) => {
		router.push(`/dashboard/devices/${deviceId}`);
	};

	if (loading) {
		return <div className="flex justify-center p-8">Loading devices...</div>;
	}

	if (error) {
		return (
			<div className="flex flex-col items-center p-8">
				<p className="text-red-500 mb-4">{error}</p>
				<Button onClick={fetchDevices}>Retry</Button>
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between py-4">
				<div className="flex gap-2">
					<Input
						placeholder="Search devices..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="max-w-sm"
						onKeyDown={(e) => e.key === "Enter" && handleSearch()}
					/>
					<Button variant="outline" onClick={handleSearch}>
						Search
					</Button>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="ml-auto"
					onClick={fetchDevices}
				>
					<RefreshCw className="mr-2 h-4 w-4" />
					Refresh
				</Button>
			</div>

			{stats && (
				<div className="grid grid-cols-4 gap-4 mb-6">
					<div className="bg-card rounded-lg p-4 shadow">
						<p className="text-sm text-muted-foreground truncate">
							Total Devices
						</p>
						<p className="text-2xl font-bold">{devices.length}</p>
					</div>
					<div className="bg-card rounded-lg p-4 shadow">
						<p className="text-sm text-muted-foreground truncate">Online</p>
						<p className="text-2xl font-bold text-green-500">
							{props.devices.length}
						</p>
					</div>
					<div className="bg-card rounded-lg p-4 shadow">
						<p className="text-sm text-muted-foreground truncate">Offline</p>
						<p className="text-2xl font-bold text-gray-500">
							{devices.length - props.devices.length}
						</p>
					</div>
					<div className="bg-card rounded-lg p-4 shadow">
						<p className="text-sm text-muted-foreground truncate">
							Device Types
						</p>
						<p className="text-2xl font-bold">
							{Object.keys(stats.byType ?? {}).length ?? 0}
						</p>
					</div>
				</div>
			)}

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<div className="flex items-center space-x-1">
									<span>Name</span>
									<ArrowUpDown className="h-3 w-3" />
								</div>
							</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>IP Address</TableHead>
							<TableHead>Status</TableHead>
							{/* <TableHead>Last Seen</TableHead> */}
							<TableHead className="w-[80px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{devices?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="text-center py-8">
									No devices found
								</TableCell>
							</TableRow>
						) : (
							devices.map((device) => (
								<TableRow
									key={device.id}
									className="cursor-pointer hover:bg-muted/50"
									onClick={() => handleViewDevice(device.id)}
								>
									<TableCell className="font-medium">
										<div className="flex items-center space-x-2">
											{getDeviceIcon(device.type)}
											<span>{device.name}</span>
											{device.metrics && device.metrics.cpu > 80 && (
												<AlertTriangle className="h-4 w-4 text-destructive" />
											)}
										</div>
									</TableCell>
									<TableCell className="capitalize">{device.type}</TableCell>
									<TableCell>{device.ip}</TableCell>
									<TableCell>
										{device?.online ? (
											<Badge className="bg-green-500 hover:bg-green-600">
												<Wifi className="mr-1 h-3 w-3" />
												Online
											</Badge>
										) : (
											<Badge variant="outline">
												<WifiOff className="mr-1 h-3 w-3" />
												Offline
											</Badge>
										)}
									</TableCell>
									{/* <TableCell>{formatDate(device?.lastSeen ?? "")}</TableCell> */}
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger
												asChild
												onClick={(e) => e.stopPropagation()}
											>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">Open menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem
													onClick={(e) => {
														e.stopPropagation();
														handleViewDevice(device.id);
													}}
												>
													<Eye className="mr-2 h-4 w-4" />
													<span>View Details</span>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={(e) => e.stopPropagation()}>
													<span>Configure</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
