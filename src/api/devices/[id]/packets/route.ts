import { NextResponse } from "next/server";

// Sample network packet data by device
const devicePackets = {
  "device-003": [
    {
      id: "PKT001",
      timestamp: "2023-04-06T10:30:05",
      source: "192.168.1.101",
      destination: "172.217.20.142",
      protocol: "HTTPS",
      port: 443,
      size: 1240,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT005",
      timestamp: "2023-04-06T10:29:45",
      source: "172.217.20.142",
      destination: "192.168.1.101",
      protocol: "HTTPS",
      port: 443,
      size: 8750,
      direction: "inbound",
      status: "success",
    },
    {
      id: "PKT009",
      timestamp: "2023-04-06T10:28:30",
      source: "192.168.1.101",
      destination: "192.168.1.1",
      protocol: "DNS",
      port: 53,
      size: 120,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT013",
      timestamp: "2023-04-06T10:27:15",
      source: "192.168.1.101",
      destination: "104.18.23.210",
      protocol: "HTTPS",
      port: 443,
      size: 950,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT017",
      timestamp: "2023-04-06T10:26:00",
      source: "104.18.23.210",
      destination: "192.168.1.101",
      protocol: "HTTPS",
      port: 443,
      size: 12500,
      direction: "inbound",
      status: "success",
    },
    {
      id: "PKT021",
      timestamp: "2023-04-06T10:25:30",
      source: "192.168.1.101",
      destination: "198.51.100.25",
      protocol: "HTTPS",
      port: 443,
      size: 780,
      direction: "outbound",
      status: "blocked",
    },
  ],
  "device-004": [
    {
      id: "PKT002",
      timestamp: "2023-04-06T09:45:10",
      source: "192.168.1.103",
      destination: "198.51.100.25",
      protocol: "HTTPS",
      port: 443,
      size: 1450,
      direction: "outbound",
      status: "blocked",
    },
    {
      id: "PKT006",
      timestamp: "2023-04-06T09:44:30",
      source: "192.168.1.103",
      destination: "192.168.1.1",
      protocol: "DNS",
      port: 53,
      size: 110,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT010",
      timestamp: "2023-04-06T09:43:15",
      source: "192.168.1.103",
      destination: "203.0.113.10",
      protocol: "HTTPS",
      port: 443,
      size: 890,
      direction: "outbound",
      status: "success",
    },
  ],
  "device-006": [
    {
      id: "PKT003",
      timestamp: "2023-04-06T10:40:20",
      source: "192.168.1.10",
      destination: "192.168.1.101",
      protocol: "SSH",
      port: 22,
      size: 3200,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT007",
      timestamp: "2023-04-06T10:39:45",
      source: "192.168.1.10",
      destination: "192.168.1.1",
      protocol: "NTP",
      port: 123,
      size: 76,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT011",
      timestamp: "2023-04-06T10:38:30",
      source: "45.33.32.156",
      destination: "192.168.1.10",
      protocol: "SSH",
      port: 22,
      size: 1280,
      direction: "inbound",
      status: "blocked",
    },
    {
      id: "PKT015",
      timestamp: "2023-04-06T10:37:15",
      source: "192.168.1.10",
      destination: "192.168.1.201",
      protocol: "IPP",
      port: 631,
      size: 4500,
      direction: "outbound",
      status: "success",
    },
  ],
  "device-007": [
    {
      id: "PKT004",
      timestamp: "2023-04-06T10:20:35",
      source: "192.168.1.150",
      destination: "17.57.144.10",
      protocol: "HTTPS",
      port: 443,
      size: 2100,
      direction: "outbound",
      status: "success",
    },
    {
      id: "PKT008",
      timestamp: "2023-04-06T10:19:50",
      source: "17.57.144.10",
      destination: "192.168.1.150",
      protocol: "HTTPS",
      port: 443,
      size: 15800,
      direction: "inbound",
      status: "success",
    },
    {
      id: "PKT012",
      timestamp: "2023-04-06T10:18:25",
      source: "192.168.1.150",
      destination: "192.168.1.1",
      protocol: "DNS",
      port: 53,
      size: 98,
      direction: "outbound",
      status: "success",
    },
  ],
};

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
      ? parseInt(url.searchParams.get("limit")!)
      : undefined;

    // Get packets for the device
    const packets = devicePackets[deviceId as keyof typeof devicePackets] || [];

    // Apply filters
    let filteredPackets = [...packets];

    if (protocol) {
      filteredPackets = filteredPackets.filter(
        (packet) => packet.protocol.toLowerCase() === protocol.toLowerCase(),
      );
    }

    if (status) {
      filteredPackets = filteredPackets.filter(
        (packet) => packet.status === status,
      );
    }

    if (direction) {
      filteredPackets = filteredPackets.filter(
        (packet) => packet.direction === direction,
      );
    }
    {
      filteredPackets = filteredPackets.filter(
        (packet) => packet.direction === direction,
      );
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      filteredPackets = filteredPackets.slice(0, limit);
    }

    // Calculate statistics
    const stats = {
      total: filteredPackets.length,
      blocked: filteredPackets.filter((packet) => packet.status === "blocked")
        .length,
      byProtocol: {} as Record<string, number>,
      byDirection: {
        inbound: filteredPackets.filter(
          (packet) => packet.direction === "inbound",
        ).length,
        outbound: filteredPackets.filter(
          (packet) => packet.direction === "outbound",
        ).length,
      },
    };

    // Count packets by protocol
    filteredPackets.forEach((packet) => {
      if (!stats.byProtocol[packet.protocol]) {
        stats.byProtocol[packet.protocol] = 0;
      }
      stats.byProtocol[packet.protocol]++;
    });

    return NextResponse.json({
      packets: filteredPackets,
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

    // In a real application, you would save to a database
    // For this mock API, we'll just return success with the data
    const newPacket = {
      id: `PKT${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      port: packetData.port || 0,
      size: packetData.size || 0,
      status: packetData.status || "success",
      ...packetData,
    };

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
