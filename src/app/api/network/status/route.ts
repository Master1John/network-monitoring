import { NextResponse } from "next/server";

// In a real application, this would be fetched from a monitoring system
const networkStatus = {
  devices: [
    {
      id: "device-001",
      name: "Router-Main",
      type: "router",
      status: "online",
      ipAddress: "192.168.1.1",
      lastSeen: "2023-04-06T10:45:00",
      metrics: {
        cpu: 15,
        memory: 30,
        bandwidth: {
          in: 25,
          out: 10,
        },
      },
    },
    {
      id: "device-002",
      name: "Switch-Floor1",
      type: "switch",
      status: "online",
      ipAddress: "192.168.1.2",
      lastSeen: "2023-04-06T10:44:00",
      metrics: {
        cpu: 5,
        memory: 20,
        bandwidth: {
          in: 45,
          out: 40,
        },
      },
    },
    {
      id: "device-003",
      name: "Workstation-001",
      type: "workstation",
      status: "online",
      ipAddress: "192.168.1.101",
      lastSeen: "2023-04-06T10:43:00",
      metrics: {
        cpu: 65,
        memory: 45,
        disk: 78,
      },
    },
    {
      id: "device-004",
      name: "Laptop-003",
      type: "laptop",
      status: "offline",
      ipAddress: "192.168.1.103",
      lastSeen: "2023-04-06T09:15:00",
      metrics: {
        cpu: 0,
        memory: 0,
        disk: 65,
      },
    },
  ],
  connections: [
    {
      source: "device-001",
      target: "device-002",
      status: "active",
      bandwidth: 75,
    },
    {
      source: "device-002",
      target: "device-003",
      status: "active",
      bandwidth: 45,
    },
    {
      source: "device-002",
      target: "device-004",
      status: "inactive",
      bandwidth: 0,
    },
  ],
  overall: {
    status: "healthy",
    uptime: 99.8,
    devices: {
      total: 24,
      online: 18,
      offline: 6,
    },
    alerts: {
      critical: 0,
      warning: 2,
      info: 1,
    },
  },
};

export async function GET() {
  try {
    // In a real application, you would fetch real-time network status
    return NextResponse.json(networkStatus);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch network status" },
      { status: 500 },
    );
  }
}
