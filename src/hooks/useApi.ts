import { Device, DeviceStats, Packet } from "@/types";

//actions
interface AppApi {
	getDevices: (
		searchTerm: string,
	) => Promise<{ devices: Device[]; stats: DeviceStats }>;
	addDevice: (device: Device) => Promise<Device | null>;
	savePacket: (
		deviceId: string,
		packet: Packet,
	) => Promise<{ success: string; message: string; packet: Packet }>;
}
export default function useApi(): AppApi {
	async function getDevices(searchTerm: string) {
		try {
			const response = await fetch(
				`/api/devices${searchTerm ? `?search=${searchTerm}` : ""}`,
			);
			if (!response.ok) {
				throw new Error(`Error fetching devices: ${response.statusText}`);
			}
			return await response.json();
		} catch (err) {
			return { devices: [], stats: {} };
		}
	}
	async function addDevice(device: Device) {
		const response = await fetch("/api/devices", {
			method: "POST",
			body: JSON.stringify(device),
		});
		return await response.json();
	}

	async function savePacket(deviceId: string, packet: Packet) {
		const response = await fetch(`/api/devices/${deviceId}/packets`, {
			method: "POST",
			body: JSON.stringify(packet),
		});
		return await response.json();
	}
	return {
		getDevices,
		addDevice,
		savePacket,
	};
}
