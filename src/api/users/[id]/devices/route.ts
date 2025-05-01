import { NextResponse } from "next/server";

// Sample user devices data
const userDevicesData = {
  "user-001": [
    {
      id: "device-003",
      name: "Workstation-001",
      type: "workstation",
      ipAddress: "192.168.1.101",
      status: "online",
      lastSeen: "2023-04-06T10:43:00",
    },
    {
      id: "device-006",
      name: "Server-Main",
      type: "server",
      ipAddress: "192.168.1.10",
      status: "online",
      lastSeen: "2023-04-06T10:42:00",
    },
  ],
  "user-002": [
    {
      id: "device-007",
      name: "Mobile-CEO",
      type: "mobile",
      ipAddress: "192.168.1.150",
      status: "online",
      lastSeen: "2023-04-06T10:30:00",
    },
  ],
  "user-003": [
    {
      id: "device-001",
      name: "Router-Main",
      type: "router",
      ipAddress: "192.168.1.1",
      status: "online",
      lastSeen: "2023-04-06T10:45:00",
    },
    {
      id: "device-002",
      name: "Switch-Floor1",
      type: "switch",
      ipAddress: "192.168.1.2",
      status: "online",
      lastSeen: "2023-04-06T10:44:00",
    },
    {
      id: "device-005",
      name: "Printer-Office",
      type: "printer",
      ipAddress: "192.168.1.201",
      status: "online",
      lastSeen: "2023-04-06T10:40:00",
    },
  ],
  "user-008": [
    {
      id: "device-004",
      name: "Laptop-003",
      type: "laptop",
      ipAddress: "192.168.1.103",
      status: "offline",
      lastSeen: "2023-04-06T09:15:00",
    },
  ],
  "user-012": [
    {
      id: "device-008",
      name: "Security-Laptop",
      type: "laptop",
      ipAddress: "192.168.1.155",
      status: "online",
      lastSeen: "2023-04-06T10:35:00",
    },
    {
      id: "device-009",
      name: "Security-Mobile",
      type: "mobile",
      ipAddress: "192.168.1.156",
      status: "online",
      lastSeen: "2023-04-06T10:25:00",
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const url = new URL(request.url);

    // Parse query parameters
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");
    const limit = url.searchParams.get("limit")
      ? Number.parseInt(url.searchParams.get("limit")!)
      : undefined;

    // Get devices for the user
    const devices =
      userDevicesData[userId as keyof typeof userDevicesData] || [];

    // Apply filters
    let filteredDevices = [...devices];

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

    // Apply limit if specified
    if (limit && limit > 0) {
      filteredDevices = filteredDevices.slice(0, limit);
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
    console.error("Error fetching user devices:", error);
    return NextResponse.json(
      { error: "Failed to fetch user devices" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
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
      status: deviceData.status || "online",
      lastSeen: new Date().toISOString(),
      ...deviceData,
    };

    return NextResponse.json({
      success: true,
      message: "Device assigned to user successfully",
      device: newDevice,
    });
  } catch (error) {
    console.error("Error assigning device to user:", error);
    return NextResponse.json(
      { error: "Failed to assign device to user" },
      { status: 500 },
    );
  }
}
