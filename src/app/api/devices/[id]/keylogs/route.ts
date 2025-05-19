import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const url = new URL(request.url);

    // Parse query parameters
    const type = url.searchParams.get("type");
    const flagged = url.searchParams.get("flagged");
    const limit = url.searchParams.get("limit")
      ? Number.parseInt(url.searchParams.get("limit")!)
      : undefined;

    // Check if device exists
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Build the filter object for Prisma
    const filter: any = { deviceId };

    if (type) {
      filter.type = type;
    }

    if (flagged !== null) {
      filter.flagged = flagged === "true";
    }

    // Fetch keylogs with filters
    const keylogs = await prisma.keylog.findMany({
      where: filter,
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    // Calculate statistics
    const stats = {
      total: keylogs.length,
      flagged: keylogs.filter((keylog) => keylog.flagged).length,
      byType: {} as Record<string, number>,
    };

    // Count keylogs by type
    keylogs.forEach((keylog) => {
      if (!stats.byType[keylog.type]) {
        stats.byType[keylog.type] = 0;
      }
      stats.byType[keylog.type]++;
    });

    return NextResponse.json({
      keylogs,
      stats,
    });
  } catch (error) {
    console.error("Error fetching device keylogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch device keylogs" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const keylogData = await request.json();

    // Validate required fields
    if (!keylogData.type || !keylogData.content) {
      return NextResponse.json(
        { error: "Missing required fields: type and content are required" },
        { status: 400 },
      );
    }

    // Check if device exists
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
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
        deviceId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Keylog entry created successfully",
      keylog: newKeylog,
    });
  } catch (error) {
    console.error("Error creating keylog entry:", error);
    return NextResponse.json(
      { error: "Failed to create keylog entry" },
      { status: 500 },
    );
  }
}
