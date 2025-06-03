import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Packet } from "@/types";
const protocolCat = {
  UDP: ["UDP"],
  ARP: ["ARP"],
  TCP: ["TCP"],
};
export async function GET(request: Request) {
  try {
    const packets = await prisma.networkPacket.findMany({});

    const distribution: { [key: string]: number } = {
      UDP: 0,
      ARP: 0,
      TCP: 0,
    };

    for (const packet of packets) {
      let found = false;
      for (const [category, protocols] of Object.entries(protocolCat)) {
        if (protocols.includes(packet.protocol)) {
          distribution[category]++;
          found = true;
          break;
        }
      }
      if (!found) distribution["Other"]++;
    }

    const total = Object.values(distribution).reduce(
      (acc, val) => acc + val,
      0,
    );

    const percentageDistribution = Object.entries(distribution).map(
      ([protocol, count]) => ({
        protocol,
        count,
        percentage: (count / total) * 100,
      }),
    );

    return NextResponse.json({
      packets,
      percentageDistribution,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load packets" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const packetData = (await request.json()) as Packet;

    const packet = await prisma.networkPacket.create({
      data: {
        protocol: packetData.protocol,
        timestamp: packetData.timestamp,
        src: packetData.src,
        dest: packetData.dest,
      },
    });
    if (packet) {
      return NextResponse.json({
        success: true,
        message: "packet saved successfully",
        device: packet,
      });
    }
  } catch (error) {
    console.error("Error creating device:", error);
    return NextResponse.json(
      { error: "Failed to create device" },
      { status: 500 },
    );
  }
}
