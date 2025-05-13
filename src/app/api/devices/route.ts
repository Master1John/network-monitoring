import { NextResponse } from "next/server";

// In a real application, this would be fetched from a database
const devices = [
  {
    id: "device-001",
    name: "Router-Main",
    type: "router",
    ipAddress: "192.168.1.1",
    macAddress: "00:1A:2B:3C:4D:5E",
    status: "online",
    lastSeen: "2023-04-06T10:45:00",
    os: "RouterOS 6.48.3",
    manufacturer: "MikroTik",
    model: "RB4011iGS+",
    installedDate: "2022-01-15",
    userId: "user-003",
    metrics: {
      cpu: 15,
      memory: 30,
      disk: 45,
    },
  },
  {
    id: "device-002",
    name: "Switch-Floor1",
    type: "switch",
    ipAddress: "192.168.1.2",
    macAddress: "00:2B:3C:4D:5E:6F",
    status: "online",
    lastSeen: "2023-04-06T10:44:00",
    os: "Cisco IOS 15.2",
    manufacturer: "Cisco",
    model: "Catalyst 2960",
    installedDate: "2022-01-20",
    userId: "user-003",
    metrics: {
      cpu: 10,
      memory: 25,
      disk: 0,
    },
  },
  {
    id: "device-003",
    name: "Workstation-001",
    type: "workstation",
    ipAddress: "192.168.1.101",
    macAddress: "00:3C:4D:5E:6F:7G",
    status: "online",
    lastSeen: "2023-04-06T10:43:00",
    os: "Windows 11 Pro",
    manufacturer: "Dell",
    model: "OptiPlex 7090",
    installedDate: "2022-03-10",
    userId: "user-001",
    metrics: {
      cpu: 42,
      memory: 65,
      disk: 58,
    },
  },
  {
    id: "device-004",
    name: "Laptop-003",
    type: "laptop",
    ipAddress: "192.168.1.103",
    macAddress: "00:4D:5E:6F:7G:8H",
    status: "offline",
    lastSeen: "2023-04-06T09:15:00",
    os: "macOS Monterey",
    manufacturer: "Apple",
    model: "MacBook Pro 16-inch",
    installedDate: "2021-11-05",
    userId: "user-008",
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 72,
    },
  },
  {
    id: "device-005",
    name: "Printer-Office",
    type: "printer",
    ipAddress: "192.168.1.201",
    macAddress: "00:5E:6F:7G:8H:9I",
    status: "online",
    lastSeen: "2023-04-06T10:40:00",
    os: "HP Firmware 4.2.1",
    manufacturer: "HP",
    model: "LaserJet Pro MFP M428fdw",
    installedDate: "2022-02-15",
    userId: "user-003",
    metrics: {
      cpu: 5,
      memory: 15,
      disk: 30,
    },
  },
  {
    id: "device-006",
    name: "Server-Main",
    type: "server",
    ipAddress: "192.168.1.10",
    macAddress: "00:6F:7G:8H:9I:0J",
    status: "online",
    lastSeen: "2023-04-06T10:42:00",
    os: "Ubuntu Server 22.04 LTS",
    manufacturer: "HP",
    model: "ProLiant DL380 Gen10",
    installedDate: "2022-02-20",
    userId: "user-001",
    metrics: {
      cpu: 78,
      memory: 85,
      disk: 62,
    },
  },
  {
    id: "device-007",
    name: "Mobile-CEO",
    type: "mobile",
    ipAddress: "192.168.1.150",
    macAddress: "00:7G:8H:9I:0J:1K",
    status: "online",
    lastSeen: "2023-04-06T10:30:00",
    os: "iOS 16.2",
    manufacturer: "Apple",
    model: "iPhone 14 Pro",
    installedDate: "2022-09-25",
    userId: "user-002",
    metrics: {
      cpu: 35,
      memory: 48,
      disk: 75,
    },
  },
  {
    id: "device-008",
    name: "Security-Laptop",
    type: "laptop",
    ipAddress: "192.168.1.155",
    macAddress: "00:8H:9I:0J:1K:2L",
    status: "online",
    lastSeen: "2023-04-06T10:35:00",
    os: "Windows 11 Enterprise",
    manufacturer: "Lenovo",
    model: "ThinkPad X1 Carbon",
    installedDate: "2022-07-10",
    userId: "user-012",
    metrics: {
      cpu: 45,
      memory: 60,
      disk: 55,
    },
  },
  {
    id: "device-009",
    name: "Security-Mobile",
    type: "mobile",
    ipAddress: "192.168.1.156",
    macAddress: "00:9I:0J:1K:2L:3M",
    status: "online",
    lastSeen: "2023-04-06T10:25:00",
    os: "Android 13",
    manufacturer: "Samsung",
    model: "Galaxy S22 Ultra",
    installedDate: "2022-08-15",
    userId: "user-012",
    metrics: {
      cpu: 30,
      memory: 45,
      disk: 65,
    },
  },
];

export async function GET(request: Request) {
  try {
    // Parse query parameters for filtering
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");
    const userId = url.searchParams.get("userId");
    const search = url.searchParams.get("search")?.toLowerCase();

    let filteredDevices = [...devices];

    // Apply filters
    if (type) {
      filteredDevices = filteredDevices.filter(
        (device) => device.type === type,
      );
    }

    if (status) {
      filteredDevices = filteredDevices.filter(
        (device) => device.status === status,
      );
    }

    if (userId) {
      filteredDevices = filteredDevices.filter(
        (device) => device.userId === userId,
      );
    }

    if (search) {
      filteredDevices = filteredDevices.filter(
        (device) =>
          device.name.toLowerCase().includes(search) ||
          device.ipAddress.toLowerCase().includes(search) ||
          device.macAddress.toLowerCase().includes(search) ||
          device.type.toLowerCase().includes(search),
      );
    }

    // Calculate statistics
    const stats = {
      total: filteredDevices.length,
      online: filteredDevices.filter((device) => device.status === "online")
        .length,
      offline: filteredDevices.filter((device) => device.status === "offline")
        .length,
      byType: {} as Record<string, number>,
    };

    // Count devices by type
    filteredDevices.forEach((device) => {
      if (!stats.byType[device.type]) {
        stats.byType[device.type] = 0;
      }
      stats.byType[device.type]++;
    });

    return NextResponse.json({
      devices: filteredDevices,
      stats,
    });
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const deviceData = await request.json();

    // Validate required fields
    if (!deviceData.name || !deviceData.type || !deviceData.ipAddress) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, type, and ipAddress are required",
        },
        { status: 400 },
      );
    }

    // In a real application, you would save to a database
    // For this mock API, we'll just return success with the data
    const newDevice = {
      id: `device-${Math.floor(Math.random() * 1000)}`,
      ...deviceData,
      status: deviceData.status || "online",
      lastSeen: new Date().toISOString(),
      metrics: deviceData.metrics || {
        cpu: 0,
        memory: 0,
        disk: 0,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Device created successfully",
      device: newDevice,
    });
  } catch (error) {
    console.error("Error creating device:", error);
    return NextResponse.json(
      { error: "Failed to create device" },
      { status: 500 },
    );
  }
}
