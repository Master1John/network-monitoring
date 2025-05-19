import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Build the filter object for Prisma
    const filter: any = { userId };

    if (type) {
      filter.type = type;
    }

    if (status) {
      filter.status = status;
    }

    // Fetch devices with filters
    const devices = await prisma.device.findMany({
      where: filter,
      orderBy: { lastSeen: "desc" },
      take: limit,
    });

    // Calculate statistics
    const stats = {
      total: devices.length,
      online: devices.filter((device) => device.status === "online").length,
      offline: devices.filter((device) => device.status === "offline").length,
      byType: {} as Record<string, number>,
    };

    // Count devices by type
    devices.forEach((device) => {
      if (!stats.byType[device.type]) {
        stats.byType[device.type] = 0;
      }
      stats.byType[device.type]++;
    });

    return NextResponse.json({
      devices,
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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Format metrics as JSON if provided
    const metrics = deviceData.metrics
      ? deviceData.metrics
      : { cpu: 0, memory: 0, disk: 0 };

    // Create the device
    const newDevice = await prisma.device.create({
      data: {
        name: deviceData.name,
        type: deviceData.type,
        ipAddress: deviceData.ipAddress,
        macAddress: deviceData.macAddress,
        status: deviceData.status || "online",
        lastSeen: deviceData.lastSeen
          ? new Date(deviceData.lastSeen)
          : new Date(),
        os: deviceData.os,
        manufacturer: deviceData.manufacturer,
        model: deviceData.model,
        installedDate: deviceData.installedDate
          ? new Date(deviceData.installedDate)
          : null,
        userId,
        metrics: metrics,
      },
    });

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
