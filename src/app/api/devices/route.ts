import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Device } from "@/types";

export async function GET(request: Request) {
  try {
    // Parse query parameters for filtering
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");
    const userId = url.searchParams.get("userId");
    const search = url.searchParams.get("search")?.toLowerCase();

    // Build the filter object for Prisma
    const filter: any = {};

    if (type) {
      filter.type = type;
    }

    if (status) {
      filter.status = status;
    }

    if (userId) {
      filter.userId = userId;
    }

    if (search) {
      filter.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { ipAddress: { contains: search } },
        { macAddress: { contains: search } },
        { type: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch devices with filters
    const devices = await prisma.device.findMany({
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
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
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const deviceData = (await request.json()) as Device;

    // Validate required fields
    if (!deviceData.name || !deviceData.type || !deviceData.ip) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, type, and ipAddress are required",
        },
        { status: 400 },
      );
    }

    const device = await prisma.device.findFirst(deviceData.mac);
    if (device) {
      return NextResponse.json({
        success: true,
        message: "Device Retrieved successfully",
        device: device,
      });
    }

    const newDevice = await prisma.device.create({
      data: {
        name: deviceData.name,
        type: deviceData.type,
        ip: deviceData.ip,
        mac: deviceData.mac,
        os: deviceData.os,
        manufacturer: deviceData.manufacturer,
        // model: deviceData.model,
        // installedDate: deviceData.installedDate
        // 	? new Date(deviceData.installedDate)
        // 	: null,
        // userId: deviceData.userId || null,
        // metrics: metrics,
      },
    });

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
