import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const devices = await prisma.device.findMany();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    function getDayOfWeek(date: Date): string {
      return days[date.getDay()];
    }

    const userActivities = await prisma.userActivity.findMany();
    const keylogs = await prisma.keylog.findMany({
      select: { id: true, timestamp: true },
    });
    const packets = await prisma.networkPacket.findMany({
      select: { id: true, timestamp: true },
    });

    const weeklyStats: Record<
      string,
      { packetCount: number; keylogCount: number }
    > = {};

    for (const day of days) {
      weeklyStats[day] = { packetCount: 0, keylogCount: 0 };
    }

    for (const packet of packets) {
      const day = days[new Date(packet.timestamp).getDay()];
      weeklyStats[day].packetCount++;
    }

    for (const keylog of keylogs) {
      const day = days[new Date(keylog.timestamp).getDay()];
      weeklyStats[day].keylogCount++;
    }

    const chatData = days.map((day) => ({
      day,
      ...weeklyStats[day],
    }));

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

    return NextResponse.json({ stats, chatData, userActivities });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch device:" + error },
      { status: 500 },
    );
  }
}
