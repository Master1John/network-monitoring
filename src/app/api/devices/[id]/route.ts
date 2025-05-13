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
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const device = devices.find((d) => d.id === deviceId);

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json({ device });
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json(
      { error: "Failed to fetch device" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const deviceIndex = devices.findIndex((d) => d.id === deviceId);

    if (deviceIndex === -1) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    const updateData = await request.json();

    // In a real application, you would update the database
    // For this mock API, we'll just return success with the updated data
    const updatedDevice = {
      ...devices[deviceIndex],
      ...updateData,
      id: deviceId, // Ensure ID doesn't change
    };

    return NextResponse.json({
      success: true,
      message: "Device updated successfully",
      device: updatedDevice,
    });
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json(
      { error: "Failed to update device" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const deviceIndex = devices.findIndex((d) => d.id === deviceId);

    if (deviceIndex === -1) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // In a real application, you would delete from the database
    // For this mock API, we'll just return success
    return NextResponse.json({
      success: true,
      message: "Device deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { error: "Failed to delete device" },
      { status: 500 },
    );
  }
}
