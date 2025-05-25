import { Device, DeviceStats, Packet } from "@/types";

//actions
export default function useApi() {
	async function getDevices(searchTerm: string) {
		try {
			const response = await fetch(
				`/api/devices${searchTerm ? `?search=${searchTerm}` : ""}`,
			);
			if (!response.ok) {
				throw new Error(`Error fetching devices: ${response.statusText}`);
			}
			return (await response.json()) as {
				devices: Array<Device>;
				stats: DeviceStats;
			};
		} catch (err) {
			return new Promise(() => {}).then(() => ({
				devices: [] as Array<Device>,
				stats: { total: 0, offline: 0, online: 0, byType: {} } as DeviceStats,
			}));
		}
	}
	async function addDevice(device: Omit<Device | Node, "id" | "socketId">) {
		const response = await fetch("/api/devices", {
			method: "POST",
			body: JSON.stringify(device),
		});
		return (await response.json()) as Device | null;
	}

	async function savePacket(deviceId: string, packet: Packet) {
		const response = await fetch(`/api/devices/${deviceId}/packets`, {
			method: "POST",
			body: JSON.stringify(packet),
		});
		return (await response.json()) as {
			success: string;
			message: string;
			packet: Packet;
		};
	}
	return {
		getDevices,
		addDevice,
		savePacket,
	};
}
