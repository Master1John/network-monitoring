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
    const protocol = url.searchParams.get("protocol");
    const status = url.searchParams.get("status");
    const direction = url.searchParams.get("direction");
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

    if (protocol) {
      filter.protocol = protocol;
    }

    if (status) {
      filter.status = status;
    }

    if (direction) {
      filter.direction = direction;
    }

    // Fetch network packets with filters
    const packets = await prisma.networkPacket.findMany({
      where: filter,
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    // Calculate statistics
    const stats = {
      total: packets.length,
      blocked: packets.filter((packet) => packet.status === "blocked").length,
      byProtocol: {} as Record<string, number>,
      byDirection: {
        inbound: packets.filter((packet) => packet.direction === "inbound")
          .length,
        outbound: packets.filter((packet) => packet.direction === "outbound")
          .length,
      },
    };

    // Count packets by protocol
    packets.forEach((packet) => {
      if (!stats.byProtocol[packet.protocol]) {
        stats.byProtocol[packet.protocol] = 0;
      }
      stats.byProtocol[packet.protocol]++;
    });

    return NextResponse.json({
      packets,
      stats,
    });
  } catch (error) {
    console.error("Error fetching device packets:", error);
    return NextResponse.json(
      { error: "Failed to fetch device packets" },
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
    const packetData = await request.json();

    // Validate required fields
    if (!packetData.source || !packetData.destination || !packetData.protocol) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: source, destination, and protocol are required",
        },
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

    // Create the network packet
    const newPacket = await prisma.networkPacket.create({
      data: {
        source: packetData.source,
        destination: packetData.destination,
        protocol: packetData.protocol,
        port: packetData.port || null,
        size: packetData.size || null,
        direction: packetData.direction,
        status: packetData.status || "success",
        timestamp: packetData.timestamp
          ? new Date(packetData.timestamp)
          : new Date(),
        deviceId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Packet entry created successfully",
      packet: newPacket,
    });
  } catch (error) {
    console.error("Error creating packet entry:", error);
    return NextResponse.json(
      { error: "Failed to create packet entry" },
      { status: 500 },
    );
  }
}
