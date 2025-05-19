import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const devices = await prisma.device.findMany();

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

    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch device:" + error },
      { status: 500 },
    );
  }
}
