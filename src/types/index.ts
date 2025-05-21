export interface Keylog {
	keystroke: string;
	timestamp: number;
}

export interface Devices {}

export interface Packet {
	source: string;
	destination: string;
	timestamp: number;
}

export interface ServerToClientEvents {
	keylog: (data: Keylog) => void;
	packet: (data: Packet) => void;
}

export interface ClientToServerEvents {
	// example: sendCommand: (command: string) => void;
}
