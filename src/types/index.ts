export interface Keylog {
  id: string;
  keys: {
    key: string;
    timestamp: string;
  };
  timestamp: string;
}

export interface Node {
  socketId: string;
  name: string;
  ip: string;
  mac: string;
  os: string;
  manufacturer: string;
  model: string;
  type: string;
}

export interface Device extends Node {
  id: string;
  online?: boolean;
}

export interface DeviceStats {
  total: number;
  online: number;
  offline: number;
  byType: Record<string, number>;
}

export interface PacketAddress {
  ip: string;
  mac: string;
  port: string;
}
export interface Packet {
  interface: "IPv4" | "IPv6";

  protocol: "UDP" | "ARP" | "TCP";

  data: string;

  /** The time the packet was created by host machine */
  timestamp: string;

  /** The src address, mac and port for the host machine who created the packet */
  src: PacketAddress;

  /** The destination address, mac and port for the target machine to receive the packet */
  dest: PacketAddress;
}

export interface ServerToClientEvents {
  keylog: (data: Keylog) => void;
  packet: (data: Packet) => void;
}

export interface ClientToServerEvents {
  // example: sendCommand: (command: string) => void;
}
