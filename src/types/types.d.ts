declare global {
	export interface Keylog {
		keystroke: string;
		timestamp: number;
	}

	export interface Devices {}

	export interface PacketAddress {
		ip: string;
		mac: string;
		port: string;
	}
	export interface Packet {
		protocol: "UDP" | "ARP" | "TCP";

		/** The time the packet was created by host machine */
		timestamp: string;

		/** The src address, mac and port for the host machine who created the packet */
		src: PacketAdress;

		/** The destination address, mac and port for the target machine to receive the packet */
		dest: PacketAdress;
	}

	export interface ServerToClientEvents {
		keylog: (data: Keylog) => void;
		packet: (data: Packet) => void;
	}

	export interface ClientToServerEvents {
		// example: sendCommand: (command: string) => void;
	}
}
